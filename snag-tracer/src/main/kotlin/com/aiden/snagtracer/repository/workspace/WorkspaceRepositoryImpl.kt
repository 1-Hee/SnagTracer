package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.*
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.UUID

@Repository
class WorkspaceRepositoryImpl(
    private val jdbcTemplate: JdbcTemplate,
    private val workSpaceRowMapper: WorkSpaceRowMapper,
    private val workMemberRowMapper:WorkMemberRowMapper
): WorkspaceRepository {


    // * ------------------------------------------------
    // *   for Workspace
    // * ------------------------------------------------
    override fun insertWorkSpace(workSpace: AddWorkSpace): Int {
        val sql = """
            INSERT INTO work_space
            (code, space_name, space_domain, fk_created_by, created_at)
            VALUES
            (?, ?, ?, ?, ?)
        """.trimIndent()
        val mCodeName:String = workSpace.code
        val mSpaceName:String = workSpace.spaceName
        val mSpaceDomain:String = workSpace.spaceDomain
        val mCreatedBy:UUID? = workSpace.fkCreatedBy
        val mCreatedAt:LocalDateTime? = LocalDateTime.now()
        return jdbcTemplate.update(
            sql,
            mCodeName, mSpaceName, mSpaceDomain, mCreatedBy, mCreatedAt
        )
    }

    override fun findAllWorkSpace(): List<WorkSpace> {
        val sql = "SELECT * FROM work_space"
        return jdbcTemplate.query(sql, workSpaceRowMapper)
    }

    override fun findAllWorkSpaceByPage(page: Int, size: Int): List<WorkSpace> {
        val offset:Int = (page-1) * size
        val sql = """
            SELECT * FROM work_space
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workSpaceRowMapper, size, offset)
    }

    override fun findWorkSpaceById(orderIndex: Long, code: String): WorkSpace? {
        val sql = """
            SELECT * FROM work_space 
            WHERE order_index = ? AND code = ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workSpaceRowMapper, orderIndex, code).firstOrNull()
    }

    override fun updateWorkSpaceById(editWorkSpace: EditWorkSpace, fkCreatedBy: UUID) {
        val sql  = """
            UPDATE work_space SET 
            code = ?,
            space_name = ?,
            space_domain = ?
            WHERE fk_created_by = ? and (order_index = ? and code = ?);
        """.trimIndent()

        jdbcTemplate.update(sql, workSpaceRowMapper,
            editWorkSpace.code, editWorkSpace.spaceName, editWorkSpace.spaceDomain,
            fkCreatedBy, editWorkSpace.orderIndex, editWorkSpace.code
        );
    }

    override fun deleteWorkSpaceById(orderIndex: Long, code: String, fkCreatedBy: UUID) {
        val sql = """
            DELETE FROM work_space 
            WHERE 
            fk_created_by = ? 
            and (order_index = ? and code = ?);
        """.trimIndent()
        jdbcTemplate.update(sql, workSpaceRowMapper, fkCreatedBy, orderIndex, code)
    }

    // * ------------------------------------------------
    // *   for Workspace Member
    // * ------------------------------------------------
    override fun insertWorkMember(addMember: BaseMember, fkUsrRoleId:Int?): Int {
        val sql = """
            INSERT INTO work_space_members
            (fk_order_index, fk_code, fk_user_uuid, fk_usr_role_id,  join_at)
            VALUES
            (?, ?, ?, ?, ?)
        """.trimIndent()
        val fkOrderIndex:Long = addMember.fkOrderIndex
        val fkCode:String = addMember.fkCode
        val fkUserUuid:UUID = addMember.fkUserUuid
        val joinAt:LocalDateTime = LocalDateTime.now()
        return jdbcTemplate.update(
            sql,
            fkOrderIndex, fkCode, fkUserUuid, fkUsrRoleId, joinAt
        )
    }

    override fun findAllWorkMember(): List<WorkMember> {
        val sql = "SELECT * FROM work_space_members"
        return jdbcTemplate.query(sql, workMemberRowMapper)
    }

    override fun findAllWorkMemberByPage(page: Int, size: Int): List<WorkMember> {
        val offset:Int = (page-1) * size
        val sql = """
            SELECT * FROM work_space_members
            ORDER BY join_at DESC
            LIMIT ? OFFSET ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workMemberRowMapper, size, offset)
    }

    override fun findSpaceMemberByPage(searchParam:Map<String, Any>) : List<WorkMember> {
        /*
        page: Int, size: Int
        orderIndex: Long, code:String
         */
        val page:Int = ( searchParam["page"] as? Int ) ?: 1
        val size:Int = ( searchParam["size"] as? Int ) ?: 10
        val orderIndex:Long = ( searchParam["orderIndex"] as? Long ) ?: return emptyList()
        val code:String = ( searchParam["code"] as? String ) ?: return emptyList()
        val offset:Int = (page-1) * size
        val sql = """
            SELECT 
            *
            FROM work_space_members
            WHERE fk_order_index = ? and fk_code = ?
            ORDER BY join_at DESC
            LIMIT ? OFFSET ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workMemberRowMapper, orderIndex, code,  size, offset)
    }

    override fun findWorkMemberById(baseMember: BaseMember): WorkMember? {
        val sql = """
            SELECT *
            FROM work_space_members
            WHERE fk_order_index = ? AND fk_code = ? AND fk_user_uuid = ?
            ORDER BY join_at;
        """.trimIndent()
        val orderIndex = baseMember.fkOrderIndex
        val code = baseMember.fkCode
        val fkUserUUID = baseMember.fkUserUuid
        return jdbcTemplate.query(sql, workMemberRowMapper, orderIndex, code, fkUserUUID).firstOrNull()
    }

    override fun countWorkMember(orderIndex: Long, code: String) : Int {
        val sql = """
            SELECT COUNT(*)
            FROM work_space_members
            WHERE fk_order_index = ? AND fk_code = ?
        """.trimIndent()
        return jdbcTemplate.queryForObject(sql, Int::class.java, orderIndex, code) ?: 0
    }

    override fun deleteWorkMember(baseMember : BaseMember): Boolean {
        return try {
            val sql = """
            DELETE FROM work_space_members
                WHERE fk_order_index = ? AND fk_code = ? AND fk_user_uuid = ?;
            """.trimIndent()
            val orderIndex = baseMember.fkOrderIndex
            val code = baseMember.fkCode
            val fkUserUUID = baseMember.fkUserUuid
            val line: Int = jdbcTemplate.update(sql, orderIndex, code, fkUserUUID)
            (line > 0)
        } catch (e:Exception){
            e.printStackTrace()
            return false
        }

    }
}

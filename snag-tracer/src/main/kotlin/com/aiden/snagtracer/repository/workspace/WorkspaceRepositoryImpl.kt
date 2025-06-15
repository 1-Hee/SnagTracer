package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.AddWorkSpace
import com.aiden.snagtracer.model.workspace.WorkSpace
import org.springframework.jdbc.core.JdbcTemplate
import org.springframework.stereotype.Repository
import java.time.LocalDateTime
import java.util.UUID

@Repository
class WorkspaceRepositoryImpl(
    private val jdbcTemplate: JdbcTemplate,
    private val workSpaceRowMapper: WorkSpaceRowMapper
): WorkspaceRepository {
    override fun findAll(): List<WorkSpace> {
        val sql = "SELECT * FROM work_space"
        return jdbcTemplate.query(sql, workSpaceRowMapper)
    }

    override fun findList(page: Int, size: Int): List<WorkSpace> {
        val offset:Int = (page-1) * size
        val sql = """
            SELECT * FROM work_space
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workSpaceRowMapper, size, offset)
    }

    override fun findById(orderIndex: Long, code: String): WorkSpace? {
        val sql = """
            SELECT * FROM work_space 
            WHERE order_index = ? AND code = ?
        """.trimIndent()
        return jdbcTemplate.query(sql, workSpaceRowMapper, orderIndex, code).firstOrNull()
    }

    override fun insert(workSpace: AddWorkSpace): Int {
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


}

package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.WorkMember
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import java.sql.ResultSet
import java.util.*

@Component
class WorkMemberRowMapper : RowMapper<WorkMember> {
    override fun mapRow(rs: ResultSet, rowNum: Int): WorkMember {
        return WorkMember(
            fkOrderIndex = rs.getLong("fk_order_index"),
            fkCode = rs.getString("fk_code"),
            fkUserUuid = rs.getObject("fk_user_uuid", UUID::class.java),
            fkUsrRoleId = rs.getInt("fk_usr_role_id"),
            joinAt = rs.getTimestamp("join_at").toLocalDateTime()
        )
    }
}
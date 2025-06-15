package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.WorkSpace
import org.springframework.jdbc.core.RowMapper
import org.springframework.stereotype.Component
import java.sql.ResultSet
import java.util.UUID

@Component
class WorkSpaceRowMapper : RowMapper<WorkSpace> {
    override fun mapRow(rs: ResultSet, rowNum: Int): WorkSpace {
        return WorkSpace(
            orderIndex = rs.getLong("order_index"),
            code = rs.getString("code"),
            spaceName = rs.getString("space_name"),
            spaceDomain = rs.getString("space_domain"),
            fkCreatedBy = rs.getObject("fk_created_by", UUID::class.java),
            createdAt = rs.getTimestamp("created_at").toLocalDateTime()
        )
    }
}

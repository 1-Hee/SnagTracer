package com.aiden.snagtracer.model.workspace

import java.time.LocalDateTime
import java.util.UUID

data class WorkMember (
    val fkOrderIndex:Long,
    val fkCode:String,
    val fkUserUuid:UUID,
    val fkUsrRoleId:Int?,
    val joinAt:LocalDateTime
)

/*
    fk_order_index INTEGER NOT NULL,
    fk_code VARCHAR(20) NOT NULL,
    fk_user_uuid UUID NOT NULL,
    fk_usr_role_id INTEGER NOT NULL,
    join_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 */
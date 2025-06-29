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
package com.aiden.snagtracer.model.workspace

import java.util.*

data class BaseMember(
    val fkOrderIndex:Long,
    val fkCode:String,
    val fkUserUuid: UUID,
)
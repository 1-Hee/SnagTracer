package com.aiden.snagtracer.model.users

import java.util.*

data class ResultJoinUser(
    val userUuid: UUID?,                     // 사용자 식별 번호 (PK)
    val userId: String?,                     // 로컬 ID (nullable)
    val userName: String,                   // 사용자 이름
 )
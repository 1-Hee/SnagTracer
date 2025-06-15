package com.aiden.snagtracer.model.users

import java.time.LocalDateTime
import java.util.*

data class UpdateUser(
    val userUuid: UUID? = null,                      // 사용자 식별 번호 (PK)
    val status: Int = 1,                         // 계정 상태 (정상, 잠금 등)
    val email: String,                       // 사용자 이메일
    var userId: String?,                     // 로컬 ID (nullable)
    val userPwd: String?,                    // 로컬 PWD (nullable)
    val userName: String,                    // 사용자 이름
    val fkDepartmentId: Int? = null,                 // 부서 ID (FK)
    val fkUsrRoleId: Int? = null,                    // 사용자 권한 ID (FK)
)
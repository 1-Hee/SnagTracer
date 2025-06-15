package com.aiden.snagtracer.model.users

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID

@Table("users")
data class User(
    @Id
    var userUuid: UUID? = null,                      // 사용자 식별 번호 (PK)
    var status: Int = 1,                         // 계정 상태 (정상, 잠금 등)
    var email: String,                       // 사용자 이메일
    var userId: String?,                     // 로컬 ID (nullable)
    var userPwd: String?,                    // 로컬 PWD (nullable)
    var userName: String,                    // 사용자 이름
    var fkDepartmentId: Int? = null,                 // 부서 ID (FK)
    var fkUsrRoleId: Int? = null,                    // 사용자 권한 ID (FK)
    val createdAt: LocalDateTime? = null,            // 생성 일자
    var updateAt: LocalDateTime? = null              // 수정 일자
) {
    fun setUserInfo(updateUser: UpdateUser){
        this.userUuid = updateUser.userUuid
        this.status = updateUser.status
        this.email = updateUser.email
        this.userId = updateUser.userId
        this.userPwd = updateUser.userPwd
        this.userName = updateUser.userName
        this.fkDepartmentId = updateUser.fkDepartmentId
        this.fkUsrRoleId = updateUser.fkUsrRoleId
    }
}

/*
"user_uuid"
"status"
"email"
"user_id"
"user_pwd"
"user_name"
"fk_department_id"
"fk_usr_role_id"
"created_at"
"update_at"
 */

/*
@Table("users")
data class User(
    @Id val id: Long? = null,                   // PK
    val userId: String,                     // 내부 시스템용 ID
    val userPwd: String?,                   // 일반 로그인용 (Google 로그인 시 null 가능)
    val name: String,
    val email: String,
    val fkDepartmentId: Int,                  // FK
    val status: Int,                        // 계정 상태 (정상, 잠금 등)
    val fkRoleId: Int,                        // FK
    val provider: String?,                  // "google" | "local" | null
    val providerId: String?,                // ex: 구글 sub
    val profileImageUrl: String? = null     // 프로필 이미지 (Google)
)*/
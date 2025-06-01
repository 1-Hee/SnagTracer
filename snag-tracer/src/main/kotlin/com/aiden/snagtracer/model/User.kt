package com.aiden.snagtracer.model

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table

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
)
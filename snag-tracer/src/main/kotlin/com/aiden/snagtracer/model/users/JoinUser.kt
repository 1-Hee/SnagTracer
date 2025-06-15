package com.aiden.snagtracer.model.users

// 사용자 로컬 계정 가입 시 사용할 최소한의 정보 데이터 클래스
data class JoinUser (
    val email: String,                       // 사용자 이메일
    val userId: String,                     // 로컬 ID (nullable)
    val userPwd: String,                    // 로컬 PWD (nullable)
    val userName: String,                    // 사용자 이름
)
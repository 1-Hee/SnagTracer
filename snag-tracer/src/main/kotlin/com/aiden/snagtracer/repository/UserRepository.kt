package com.aiden.snagtracer.repository

import com.aiden.snagtracer.model.User
import org.springframework.data.repository.CrudRepository

interface UserRepository : CrudRepository<User, Long> {
    fun findByUserId(userId: String): User?
}
package com.aiden.snagtracer.repository.users

import com.aiden.snagtracer.model.users.User
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface UserRepository : CrudRepository<User, UUID> {

    // fun findByUserId(userId: String): User?

    fun findByUserIdAndStatus(userId: String, status: Int): User?

    fun findAllByStatus(status: Int): List<User>
 }
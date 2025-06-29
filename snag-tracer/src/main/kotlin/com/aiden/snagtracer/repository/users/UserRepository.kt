package com.aiden.snagtracer.repository.users

import com.aiden.snagtracer.model.issue.Issue
import com.aiden.snagtracer.model.users.User
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import java.util.UUID

interface UserRepository : CrudRepository<User, UUID> {


    fun findByUserIdAndStatus(userId: String, status: Int): User?

    @Query("""
        SELECT * FROM users
        ORDER BY created_at DESC
        LIMIT :size OFFSET :offset
    """)
    fun findPageList(size: Int, offset: Long): List<User>

 }
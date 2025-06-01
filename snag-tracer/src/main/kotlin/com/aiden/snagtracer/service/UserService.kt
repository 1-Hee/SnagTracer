package com.aiden.snagtracer.service

import com.aiden.snagtracer.model.User
/*
import java.util.List;
import java.util.Map;
 */
interface UserService {

    // Create
    fun createUser(user: User): User

    // Read
    // 이쪽에 맵으로 받아서 비즈니스 로직 구현 고려..!
    fun getAllUserList(page: Int, size: Int): List<User>
    fun getUserById(userId: String): User?

    // Update
    fun editUser(userId: String, updatedUser: User): User?

    // Delete
    fun removeUser(userId: String): Boolean
}
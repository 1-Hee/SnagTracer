package com.aiden.snagtracer.service.users

import com.aiden.snagtracer.model.users.JoinUser
import com.aiden.snagtracer.model.users.ResultJoinUser
import com.aiden.snagtracer.model.users.UpdateUser
import com.aiden.snagtracer.model.users.User
import java.util.UUID

/*
import java.util.List;
import java.util.Map;
 */
interface UserService {

    // Create
    fun createUser(joinUser: JoinUser): ResultJoinUser?

    // Read
    // 이쪽에 맵으로 받아서 비즈니스 로직 구현 고려..!
    fun getAllUserList(page: Int, size: Int): List<User>
    fun getUserById(userId: String): User?
    fun getUserByUuid(uuid: UUID): User?

    // Update
    fun editUser(updatedUser: UpdateUser): Boolean

    // Delete
    fun removeUser(uuid: UUID): Boolean
}
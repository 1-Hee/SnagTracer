package com.aiden.snagtracer.service

import com.aiden.snagtracer.model.User
import com.aiden.snagtracer.repository.UserRepository
import org.springframework.stereotype.Service

@Service
class UserServiceImpl(
    private val userRepository: UserRepository
) : UserService {

    /*
    // temp list
    private val users = mutableListOf<User>()

    override fun createUser(user: User): User {
        users.add(user)
        return user
    }

    override fun getAllUserList(page: Int, size: Int): List<User> {
        // 페이지 번호는 1부터 시작한다고 가정
        val fromIndex = (page-1) * size
        val toIndex = (fromIndex + size).coerceAtMost(users.size)

        if (fromIndex >= users.size) {
            // 요청한 페이지가 데이터 범위를 벗어나면 빈 리스트 반환
            return emptyList()
        }
        return users.subList(fromIndex, toIndex)
    }

    override fun getUserById(userId: String): User? {
        return userRepository.findByUserId(userId)
            ?: throw IllegalArgumentException("User not found")
    }

    override fun editUser(userId: String, updatedUser: User): User? {
        val index = users.indexOfFirst { it.userId == userId }
        return if(index != -1) {
            users[index] = updatedUser
            updatedUser
        } else null
    }

    override fun removeUser(userId: String): Boolean {
        val removed:Boolean = users.removeIf { it.userId == userId }
        return removed
    }
     */

    override fun createUser(user: User): User {
        return userRepository.save(user)
    }

    override fun getAllUserList(page: Int, size: Int): List<User> {
        val allUsers = userRepository.findAll().toList()
        val fromIndex = (page - 1) * size
        val toIndex = (fromIndex + size).coerceAtMost(allUsers.size)
        return if (fromIndex >= allUsers.size) emptyList() else allUsers.subList(fromIndex, toIndex)
    }

    override fun getUserById(userId: String): User? {
        return userRepository.findByUserId(userId)
    }

    override fun editUser(userId: String, updatedUser: User): User? {
        val existingUser = userRepository.findByUserId(userId) ?: return null
        val userToSave = updatedUser.copy(id = existingUser.id)
        return userRepository.save(userToSave)
    }

    override fun removeUser(userId: String): Boolean {
        val user = userRepository.findByUserId(userId) ?: return false
        userRepository.deleteById(user.id!!)
        return true
    }
}
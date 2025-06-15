package com.aiden.snagtracer.service

import com.aiden.snagtracer.model.users.JoinUser
import com.aiden.snagtracer.model.users.ResultJoinUser
import com.aiden.snagtracer.model.users.UpdateUser
import com.aiden.snagtracer.model.users.User
import com.aiden.snagtracer.repository.UserRepository
import org.springframework.stereotype.Service
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.time.LocalDateTime
import java.util.UUID

@Service
class UserServiceImpl(
    private val userRepository: UserRepository
) : UserService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(UserServiceImpl::class.java)
    }

    override fun createUser(joinUser: JoinUser): ResultJoinUser? {
        return try {
            val createTime = LocalDateTime.now()
            val user = User(
                email = joinUser.email,
                userId = joinUser.userId,
                userPwd = joinUser.userPwd,
                userName = joinUser.userName,
                createdAt = createTime,
                updateAt = createTime
            )
            val newUser : User = userRepository.save(user)
            logger.info("Join Success : ${user.userId}")
            newUser.userUuid ?: throw Exception("Creation of UUID Fail...")
            newUser.userId ?: throw Exception("User Id is Empty")
            val resUser = ResultJoinUser(
                newUser.userUuid,
                newUser.userId,
                newUser.userName
            )
            resUser
        } catch (e: Exception) {
            logger.error("Fail to Join User", e)
            null
        }

    }

    override fun getAllUserList(page: Int, size: Int): List<User> {
        val allUsers = userRepository.findAllByStatus(1).toList()
        val fromIndex = (page - 1) * size
        val toIndex = (fromIndex + size).coerceAtMost(allUsers.size)
        return if (fromIndex >= allUsers.size) emptyList() else allUsers.subList(fromIndex, toIndex)
    }

    override fun getUserById(userId: String): User? {
        return userRepository.findByUserIdAndStatus(userId, 1)
    }

    override fun getUserByUuid(uuid: UUID): User? {
        return userRepository.findById(uuid).get()
    }

    override fun editUser(updatedUser: UpdateUser): Boolean {
        return try {
            val userUuid:UUID = updatedUser.userUuid?:return false
            val existingUser:User = userRepository.findById(userUuid).get()
            existingUser.setUserInfo(updatedUser)
            existingUser.updateAt = LocalDateTime.now() // 요청 시점으로 시간 설정
            val userToSave = existingUser.copy(userUuid = userUuid)
            userRepository.save(userToSave)
            true
        } catch (e:Exception) {
            logger.error("Edit User Info Fail...", e)
            false
        }
    }

    override fun removeUser(uuid: UUID): Boolean {
        return try {
            val existingUser = userRepository.findById(uuid).get()
            logger.info("remove user | id : ${existingUser.userId}")
            existingUser.status = 0
            val userToSave = existingUser.copy(userUuid = existingUser.userUuid)
            val saveUser: User = userRepository.save(userToSave)
            logger.info("saved user status : ${saveUser.status}")
            true
        } catch (e:Exception) {
            e.printStackTrace()
            false
        }
    }
}
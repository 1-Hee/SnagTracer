package com.aiden.snagtracer.service.issue

import com.aiden.snagtracer.model.issue.Issue
import com.aiden.snagtracer.model.issue.IssueResponse
import com.aiden.snagtracer.service.BaseService
import java.util.UUID

interface IssueService : BaseService {

    // READ
    fun getIssueResponseList(page: Int = 1, size: Int = 10) : List<IssueResponse>
    fun getIssueList(page: Int = 1, size: Int = 10) : List<Issue>
    fun getIssueListByTitle(title:String, page: Int = 1, size: Int = 10) : List<Issue>
    fun getIssueListByOwner(ownerId:UUID, page: Int = 1, size: Int = 10) : List<Issue>
    fun getIssueById(issueId:Long) : Issue?


    // Priority


    /*
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
     */


}
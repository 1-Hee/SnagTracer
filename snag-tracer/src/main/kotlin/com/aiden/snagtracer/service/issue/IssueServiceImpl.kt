package com.aiden.snagtracer.service.issue

import com.aiden.snagtracer.model.issue.Issue
import com.aiden.snagtracer.model.issue.IssueResponse
import com.aiden.snagtracer.repository.issue.IssueRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class IssueServiceImpl(
    private val issueRepository: IssueRepository
) : IssueService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(IssueServiceImpl::class.java)
    }

    override fun getIssueResponseList(page: Int, size: Int): List<IssueResponse> {
        val offset = getOffset(page, size)
        return issueRepository.findResponsePageList(size, offset)
    }

    override fun getIssueList(page: Int, size: Int): List<Issue> {
        val offset = getOffset(page, size)
        return issueRepository.findPageList(size, offset)
    }

    override fun getIssueListByTitle(title: String, page: Int, size: Int): List<Issue> {
        val offset = getOffset(page, size)
        return issueRepository.findTitleList(title, size, offset)
    }
    override fun getIssueListByOwner(ownerId: UUID, page: Int, size: Int): List<Issue> {
        val offset = getOffset(page, size)
        return issueRepository.findOwnerList(ownerId, size, offset)
    }

    override fun getIssueById(issueId: Long): Issue? {
        return issueRepository.findById(issueId).get()
    }



    /*
    fun getAllIssueList(page: Int, size: Int): Page<Issue> {
    val pageable = PageRequest.of(page - 1, size, Sort.by(Sort.Direction.DESC, "id"))
    return issueRepository.findAll(pageable)   // SQL: SELECT ... LIMIT size OFFSET (page-1)*size
}
     */
    /*
            val allUsers = userRepository.findAllByStatus(1).toList()
        val fromIndex = (page - 1) * size
        val toIndex = (fromIndex + size).coerceAtMost(allUsers.size)
        return if (fromIndex >= allUsers.size) emptyList() else allUsers.subList(fromIndex, toIndex)
     */

}
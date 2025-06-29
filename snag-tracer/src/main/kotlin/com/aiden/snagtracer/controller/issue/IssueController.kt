package com.aiden.snagtracer.controller.issue

import com.aiden.snagtracer.controller.BaseRestController
import com.aiden.snagtracer.model.issue.Issue
import com.aiden.snagtracer.model.issue.IssueResponse
import com.aiden.snagtracer.model.issue.OwnerParam
import com.aiden.snagtracer.service.issue.IssueService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.tags.Tag
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException
import java.util.UUID

@Tag(name = "Issue Info API", description = "이슈 정보 요청 API")
@RestController
@RequestMapping("/issues")
class IssueController(
    private val issueService: IssueService?

) : BaseRestController<IssueService> {

    private val logger: Logger = LoggerFactory.getLogger(IssueController::class.java)
    override fun getService(): IssueService {
        val service = this.issueService ?: throw ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Server Not Ready for RESPONSE"
        )
        return service
    }

    // READ
    @Operation(summary = "등록된 이슈 정보 요청", description = "현재 등록된 이슈 정보를 요청합니다.")
    @GetMapping("/list", params = ["page", "size"])
    fun getIssueResponseList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<IssueResponse> {
        return getService().getIssueResponseList(page, size)
    }

    @Operation(summary = "등록된 이슈 엔티티  정보 요청", description = "현재 등록된 이슈 엔티티 정보를 요청합니다.")
    @GetMapping("/info/list", params = ["page", "size"])
    fun getIssueInfoList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<Issue> {
        return getService().getIssueList(page, size)
    }

    @Operation(summary = "등록된 이슈 정보 요청 by 제목", description = "현재 등록된 이슈 정보를 제목을 기준으로 검색하여 불러옵니다.")
    @GetMapping("/search", params = ["title", "page", "size"])
    fun getIssueListByTitle(
        @RequestParam title:String,
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<Issue> {
        return getService().getIssueListByTitle(title, page, size)
    }

    @Operation(summary = "등록된 이슈 정보 요청 by 작성자", description = "현재 등록된 이슈 정보를 작성자를 기준으로 검색하여 불러옵니다.")
    @PostMapping("/owner")
    fun getIssueListByOwner(
        @RequestBody ownerParam: OwnerParam
    ) : List<Issue> {
        val ownerId:UUID = ownerParam.ownerId
        val page:Int = ownerParam.page
        val size:Int = ownerParam.size
        return getService().getIssueListByOwner(ownerId, page, size)
    }

    @Operation(summary = "등록된 이슈 정보 요청 by 이슈 id", description = "현재 등록된 이슈 ID를 기준으로 검색하여 불러옵니다.")
    @GetMapping("/info", params = ["issueId"])
    fun getIssueListById(
        @RequestParam issueId:Long,
    ) : Issue? {
        return try {
            getService().getIssueById(issueId)
        } catch (e:Exception){
            e.printStackTrace()
            null
        }
    }



}
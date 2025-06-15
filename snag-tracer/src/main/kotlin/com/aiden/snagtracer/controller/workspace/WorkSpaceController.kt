package com.aiden.snagtracer.controller.workspace

import com.aiden.snagtracer.controller.BaseRestController
import com.aiden.snagtracer.model.workspace.AddWorkSpace
import com.aiden.snagtracer.model.workspace.WorkSpace
import com.aiden.snagtracer.service.workspace.WorkSpaceService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException

@Tag(name = "Work Space Info API", description = "작업실 정보 요청 API")
@RestController
@RequestMapping("/work-space")
class WorkSpaceController(
    private val workSpaceService: WorkSpaceService?
) : BaseRestController<WorkSpaceService> {
    companion object {
        private val logger: Logger = LoggerFactory.getLogger(WorkSpaceController::class.java)
    }

    override fun getService(): WorkSpaceService {
        val service = this.workSpaceService ?: throw ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Server Not Ready for RESPONSE"
        )
        return service
    }

    // Create
    @PostMapping
    @Operation(summary = "작업실 생성 요청", description = "입력된 정보를 바탕으로 작업실(Work Space)를 생성합니다.")
    fun createWorkSpace(@RequestBody workSpace: AddWorkSpace) : Int {
        return getService().createWorkSpace(workSpace)
    }

    // Read
    @Operation(summary = "작업실 정보 요청", description = "현재 등록된 작업실 정보를 요청합니다.")
    @GetMapping("/list", params = ["page", "size"])
    fun getWorkSpaceList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<WorkSpace> {
        return getService().getWorkSpaceListByOffset(page, size)
    }

    @Operation(summary = "작업실 정보 요청", description = "작업실 식별자 정보를 바탕으로 정보를 요청합니다.")
    @Parameter(name = "order", description = "작업실 생성 번호")
    @Parameter(name = "code", description = "작업실 분류 코드")
    @GetMapping(params = ["order", "code"])
    fun getUserByUserId(
        @RequestParam order:Long,
        @RequestParam code:String,
    ) : WorkSpace? {
        return getService().getWorkSpaceById(order, code) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id '${"$code$order"}' not found"
        )
    }


}
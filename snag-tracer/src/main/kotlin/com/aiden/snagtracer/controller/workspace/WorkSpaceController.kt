package com.aiden.snagtracer.controller.workspace

import com.aiden.snagtracer.controller.BaseRestController
import com.aiden.snagtracer.model.users.UpdateUser
import com.aiden.snagtracer.model.workspace.*
import com.aiden.snagtracer.service.workspace.WorkSpaceService
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import java.util.UUID


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


    // * ------------------------------------------------
    // *   for Workspace
    // * ------------------------------------------------

    // Create
    @PostMapping
    @Operation(summary = "작업실 생성 요청", description = "입력된 정보를 바탕으로 작업실(Work Space)를 생성합니다.")
    fun createWorkSpace(@RequestBody workSpace: AddWorkSpace) : Int {
        return getService().createWorkSpace(workSpace)
    }

    // Read
    @Operation(summary = "작업실 정보 요청", description = "현재 등록된 작업실 정보를 요청합니다.")
    @Parameter(name = "page", description = "페이지 번호 (1, 2, ... n )")
    @Parameter(name = "size", description = "페이지 크기 (5, 10, 15 등)")
    @GetMapping("/list", params = ["page", "size"])
    fun getWorkSpaceList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<WorkSpace> {
        return getService().getAllWorkSpaceByPage(page, size)
    }

    @Operation(summary = "작업실 정보 요청", description = "작업실 식별자 정보를 바탕으로 정보를 요청합니다.")
    @Parameter(name = "order", description = "작업실 생성 번호")
    @Parameter(name = "code", description = "작업실 분류 코드")
    @GetMapping(params = ["order", "code"])
    fun getWorkSpaceId(
        @RequestParam order:Long,
        @RequestParam code:String,
    ) : WorkSpace? {
        return getService().getWorkSpaceById(order, code) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id '${"$code$order"}' not found"
        )
    }

    @PutMapping
    @Operation(summary = "작업실 정보 수정", description = "작업실 생성사 또는 관리자에 한하여 작업실 정보룰 수정합니다.")
    fun editWorkSpace(
        @RequestBody editWorkSpace: EditWorkSpace,
        @RequestParam fkUUID: UUID // TODO 나중에 JWT 등의 인증 기반으로 교체...
    ) : Boolean {
        val prevSpace:WorkSpace? = getService().getWorkSpaceById(
            editWorkSpace.orderIndex, editWorkSpace.code
        )
        if(prevSpace == null || prevSpace.orderIndex != editWorkSpace.orderIndex){
            return false
        } else {
            getService().editWorkSpaceById(editWorkSpace, fkUUID)
            return true
        }
    }

    // Delete
    @Operation(summary = "작업실 정보 삭제", description = "작업실 생성사 또는 관리자에 한하여 작업실 정보룰 삭제합니다.")
    @DeleteMapping
    fun removeWorkSpace(
        @RequestBody removeSpace:RemoveSpace,
        @RequestParam fkCreatedBy: UUID     // TODO 나중에 JWT 등의 인증 기반으로 교체...
    ) : Boolean {
        val record:WorkSpace? = getService().getWorkSpaceById(
            removeSpace.orderIndex, removeSpace.code
        )
        if(record == null || record.orderIndex != removeSpace.orderIndex){
            return false
        } else {
            getService().removeWorkSpaceById(
                removeSpace.orderIndex, removeSpace.code, fkCreatedBy
            )
            return true
        }
    }

    // * ------------------------------------------------
    // *   for Workspace Member
    // * ------------------------------------------------
    // Create
    @PostMapping("/members")
    @Operation(summary = "작업실 멤버 추가", description = "입력된 정보를 바탕으로 작업실 멤버를 추가합니다.")
    fun createWorkMember(@RequestBody workMember: BaseMember) : Boolean {
        return try {
            val result = getService().createWorkMember(workMember)
            result > 0
        } catch (e:Exception) {
            e.printStackTrace()
            throw ResponseStatusException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                "The information you entered is incorrect!"
            )
        }
    }

    @Operation(summary = "작업실 멤버 정보 요청", description = "현재 등록된 작업실의 멤버 정보를 요청합니다.")
    @Parameter(name = "page", description = "페이지 번호 (1, 2, ... n )")
    @Parameter(name = "size", description = "페이지 크기 (5, 10, 15 등)")
    @GetMapping("/members/list", params = ["page", "size"])
    fun getWorkMemberList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<WorkMember> {
        return getService().getAllWorkMemberByPage(page, size)
    }

    @Operation(summary = "작업실 별 멤버 정보 요청", description = "한 작업실에 등록된 멤버 정보를 요청합니다.")
    @Parameter(name = "orderIndex", description = "작업실 등록 순서 (1, 2, ... n )")
    @Parameter(name = "code", description = "작업실 구분 코드 (최대 20자)")
    @Parameter(name = "page", description = "페이지 번호 (1, 2, ... n )")
    @Parameter(name = "size", description = "페이지 크기 (5, 10, 15 등)")
    @GetMapping("/space/list", params = ["orderIndex", "code", "page", "size"])
    fun getSpaceMemberList(
        @RequestParam orderIndex:Long,
        @RequestParam code:String,
        @RequestParam page:Int,
        @RequestParam size:Int,
    ) : List<WorkMember> {
        val searchMap:MutableMap<String, Any> = mutableMapOf()
        searchMap["orderIndex"] = orderIndex
        searchMap["code"] = code
        searchMap["page"] = page
        searchMap["size"] = size
        return try {
            getService().getSpaceMemberByPage(searchMap)
        }catch (e:Exception){
            throw ResponseStatusException(
                HttpStatus.BAD_REQUEST,
            )
        }
    }

    //     val fkOrderIndex:Long,
    //    val fkCode:String,
    //    val fkUserUuid: UUID,
    @Operation(summary = "작업실 멤버 정보 요청", description = "현재 작업실에 등록된 멤버 정보를 조회합니다.")
    @PostMapping("/space/member")
    fun getSpaceMemberInfo(
        @RequestBody baseMember:BaseMember
    ) : WorkMember {
        val info = getService().getWorkMemberById(baseMember)
        logger.info("controller info : $info")
        if(info == null){
            throw ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "User with uuid '${baseMember.fkUserUuid}' not found"
            )
        } else {
            return info
        }
    }

    @Operation(summary = "작업실 멤버 수 요청", description = "현재 작업실에 등록된 멤버 인원 수를 조회힙니다.")
    @Parameter(name = "orderIndex", description = "작업실 등록 순서 (1, 2, ... n )")
    @Parameter(name = "code", description = "작업실 구분 코드 (최대 20자)")
    @GetMapping("/space/count", params = ["orderIndex", "code"])
    fun getSpaceMemberCount(
        @RequestParam orderIndex:Long,
        @RequestParam code:String
    ) : Int {
        return getService().getCountWorkMember(orderIndex, code)
    }


    // Delete
    @Operation(summary = "작업실 멤버 삭제", description = "현재 작업실에 등록된 멤버를 삭제힙니다.")
    @DeleteMapping("/members")
    fun removeSpaceMember(
        @RequestBody baseMember: BaseMember
    ) : Boolean {
        return getService().removeWorkMember(baseMember)
    }

}

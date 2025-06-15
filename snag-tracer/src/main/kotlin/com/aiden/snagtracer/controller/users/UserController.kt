package com.aiden.snagtracer.controller.users

// Kotlin
import com.aiden.snagtracer.controller.BaseRestController
import com.aiden.snagtracer.model.users.JoinUser
import com.aiden.snagtracer.model.users.ResultJoinUser
import com.aiden.snagtracer.model.users.UpdateUser
import com.aiden.snagtracer.model.users.User
import com.aiden.snagtracer.service.users.UserService
import io.swagger.v3.oas.annotations.Hidden
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.UUID


@Tag(name = "User Info API", description = "사용자 정보 요청 API")
@RestController
@RequestMapping("/users")
class UserController(
    private val userService: UserService?
) : BaseRestController<UserService>  {

    private val logger: Logger = LoggerFactory.getLogger(UserController::class.java)

    override fun getService() : UserService {
        val service = this.userService ?: throw ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Server Not Ready for RESPONSE"
        )
        return service
    }


    // Create
    @PostMapping
    @Operation(summary = "사용자 로컬 계정 회원가입", description = "로컬 계정으로 사용자 회원 가입을 진행합니다.")
    fun createUser(@RequestBody joinUser : JoinUser) : ResultJoinUser? {
        return getService().createUser(joinUser) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User Register Fail... $joinUser"
        )
    }

    // Read
    @Operation(summary = "사용자 정보 요청", description = "현재 등록된 사용자 정보를 요청합니다.")
    @GetMapping("/list", params = ["page", "size"])
    fun getAllUserList(
        @RequestParam page:Int,
        @RequestParam size:Int
    ) : List<User> {
        return getService().getAllUserList(page, size)
    }

    @Operation(summary = "사용자 정보 요청", description = "사용자 이이디를 바탕으로 정보를 요청합니다.")
    @Parameter(name = "userId", description = "사용자 로그인 Id")
    @GetMapping(params = ["userId"])
    fun getUserByUserId(@RequestParam userId:String) : User? {
        return getService().getUserById(userId) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id '$userId' not found"
        )
    }

    @Operation(summary = "사용자 정보 요청", description = "사용자 고유 식별 번호를 바탕으로 정보를 요청합니다.")
    @Parameter(name = "uuid", description = "사용자 고유 식별 번호")
    @GetMapping("/key", params = ["uuid"])
    fun getUserByUuid(@RequestParam uuid: UUID) : User? {
        return getService().getUserByUuid(uuid) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with uuid '$uuid' not found"
        )
    }

    // Update
    @PutMapping
    fun editUser(@RequestBody userInfo: UpdateUser) : Boolean {
        return getService().editUser(userInfo)
    }

    // Delete
    @DeleteMapping
    fun removeUser(@RequestParam uuid: UUID) : Boolean {
        return getService().removeUser(uuid)
    }

    @Hidden
    @GetMapping("/ignore")
    fun ignore() = "무시되는 API"

}
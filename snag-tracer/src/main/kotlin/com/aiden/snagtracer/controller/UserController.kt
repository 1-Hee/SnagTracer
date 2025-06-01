package com.aiden.snagtracer.controller

// Kotlin
import com.aiden.snagtracer.model.User
import com.aiden.snagtracer.service.UserService
import io.swagger.v3.oas.annotations.Hidden
import io.swagger.v3.oas.annotations.Operation
import io.swagger.v3.oas.annotations.Parameter
import io.swagger.v3.oas.annotations.tags.Tag
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.*
import org.springframework.web.server.ResponseStatusException
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Tag(name = "User Info API", description = "사용자 정보 요청 API")
@RestController
@RequestMapping("/users")
class UserController(
    private val userService: UserService?
) {

    private val logger: Logger = LoggerFactory.getLogger(UserController::class.java)

    private fun getService() : UserService {
        val service = this.userService ?: throw ResponseStatusException(
            HttpStatus.INTERNAL_SERVER_ERROR,
            "Server Not Ready for RESPONSE"
        )
        return service
    }


    // Create
    @PostMapping
    fun createUser(@RequestBody user : User) : User {
        return getService().createUser(user)
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
    fun getUser(@RequestParam userId:String) : User? {
        return getService().getUserById(userId) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id '$userId' not found"
        )
    }

    // Update
    @PutMapping
    fun editUser(@RequestParam userId: String, @RequestBody userInfo:User) : User? {
        return getService().editUser(userId, userInfo) ?: throw ResponseStatusException(
            HttpStatus.NOT_FOUND,
            "User with id '$userId' not found"
        )
    }

    // Delete
    @DeleteMapping
    fun removeUser(@RequestParam userId: String) : Boolean {
        return getService().removeUser(userId)
    }

    @Hidden
    @GetMapping("/ignore")
    fun ignore() = "무시되는 API"

}
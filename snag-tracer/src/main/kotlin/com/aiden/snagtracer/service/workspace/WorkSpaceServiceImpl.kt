package com.aiden.snagtracer.service.workspace

import com.aiden.snagtracer.model.users.User
import com.aiden.snagtracer.model.workspace.*
import com.aiden.snagtracer.repository.users.UserRepository
import com.aiden.snagtracer.repository.workspace.WorkspaceRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service
import java.util.*

@Service
class WorkSpaceServiceImpl(
    private val workspaceRepository: WorkspaceRepository,
    private val userRepository: UserRepository
) : WorkSpaceService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(WorkSpaceServiceImpl::class.java)
    }

    // * ------------------------------------------------
    // *   for Workspace
    // * ------------------------------------------------
    override fun createWorkSpace(workSpace: AddWorkSpace): Int {
        return workspaceRepository.insertWorkSpace(workSpace)
    }

    override fun getAllWorkSpace(): List<WorkSpace> {
        return workspaceRepository.findAllWorkSpace()
    }

    override fun getAllWorkSpaceByPage(page: Int, size: Int): List<WorkSpace> {
        return workspaceRepository.findAllWorkSpaceByPage(page, size)
    }

    override fun getWorkSpaceById(orderIndex: Long, code: String): WorkSpace? {
        return workspaceRepository.findWorkSpaceById(orderIndex, code)
    }

    override fun editWorkSpaceById(editWorkSpace: EditWorkSpace, fkCreatedBy: UUID) {
        workspaceRepository.updateWorkSpaceById(editWorkSpace, fkCreatedBy)
    }

    override fun removeWorkSpaceById(orderIndex: Long, code: String, fkCreatedBy: UUID) {
        workspaceRepository.deleteWorkSpaceById(orderIndex, code, fkCreatedBy)
    }

    // * ------------------------------------------------
    // *   for Workspace Member
    // * ------------------------------------------------
    override fun createWorkMember(addMember: BaseMember): Int {
        // fkUsrRoleId:Int
        val userInfo:User = userRepository.findById(addMember.fkUserUuid).get()
        val fkUsrRoleId:Int? = userInfo.fkUsrRoleId
        // 생성자일 경우 -1
        val orderIdx = addMember.fkOrderIndex
        val code = addMember.fkCode
        val fkUserUuid: UUID = addMember.fkUserUuid
        val space: WorkSpace? = workspaceRepository.findWorkSpaceById(orderIdx, code)
        if(space != null){
            val flag:Boolean = space.fkCreatedBy?.equals(addMember.fkUserUuid)?:false
            if(flag) return -1
        }
        // 멤버가 이미 있는지 점검하고 있으면 0
        val mBaseMember = BaseMember(orderIdx, code, fkUserUuid)
        val member: WorkMember? = workspaceRepository
            .findWorkMemberById(mBaseMember)
        if(member != null){
            return  0;
        }
        return workspaceRepository.insertWorkMember(addMember, fkUsrRoleId)
    }

    override fun getAllWorkMember(): List<WorkMember> {
        return workspaceRepository.findAllWorkMember()
    }

    override fun getAllWorkMemberByPage(page: Int, size: Int): List<WorkMember> {
        return workspaceRepository.findAllWorkMemberByPage(page, size)
    }

    override fun getSpaceMemberByPage(searchParam: Map<String, Any>): List<WorkMember> {
        val page:Int = ( searchParam["page"] as? Int ) ?: -1
        val size:Int = ( searchParam["size"] as? Int ) ?: -1
        val orderIndex:Long? = ( searchParam["orderIndex"] as? Long )
        val code:String? = ( searchParam["code"] as? String )
        val flag = page < 1 || size < 0 || orderIndex == null || code == null
        if(flag) throw IllegalArgumentException();
        return workspaceRepository.findSpaceMemberByPage(searchParam)
    }

    override fun getWorkMemberById(baseMember: BaseMember): WorkMember? {
        val entity = workspaceRepository.findWorkMemberById(baseMember)
        logger.info("entity : $entity")
        return entity
    }

    override fun getCountWorkMember(orderIndex: Long, code: String): Int {
        return workspaceRepository.countWorkMember(orderIndex, code)
    }

    override fun removeWorkMember(baseMember: BaseMember): Boolean {
        return workspaceRepository.deleteWorkMember(baseMember)
    }


}
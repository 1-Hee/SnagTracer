package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.*
import java.util.UUID

interface WorkspaceRepository {

    // * ------------------------------------------------
    // *   for Workspace
    // * ------------------------------------------------
    // Create
    fun insertWorkSpace(workSpace: AddWorkSpace): Int
    // Read
    fun findAllWorkSpace(): List<WorkSpace>
    fun findAllWorkSpaceByPage(page:Int, size:Int) : List<WorkSpace>
    fun findWorkSpaceById(orderIndex: Long, code: String): WorkSpace?
    // update
    fun updateWorkSpaceById(editWorkSpace: EditWorkSpace, fkCreatedBy: UUID)
    // delete
    fun deleteWorkSpaceById(orderIndex: Long, code:String, fkCreatedBy: UUID)

    // * ------------------------------------------------
    // *   for Workspace Member
    // * ------------------------------------------------
    // Create
    fun insertWorkMember(addMember: BaseMember, fkUsrRoleId:Int?): Int
    // Read
    fun findAllWorkMember(): List<WorkMember>
    fun findAllWorkMemberByPage(page:Int, size:Int) : List<WorkMember>

    fun findSpaceMemberByPage(searchParam:Map<String, Any>) : List<WorkMember>

    fun findWorkMemberById(baseMember: BaseMember): WorkMember?

    fun countWorkMember(orderIndex: Long, code: String) : Int

    // Delete
    fun deleteWorkMember(baseMember: BaseMember) : Boolean

    // TODO 2) list by all ?


}
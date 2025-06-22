package com.aiden.snagtracer.service.workspace

import com.aiden.snagtracer.model.workspace.*
import java.util.*

interface WorkSpaceService {

    // * ------------------------------------------------
    // *   for Workspace
    // * ------------------------------------------------
    // Create
    fun createWorkSpace(workSpace: AddWorkSpace): Int
    // Read
    fun getAllWorkSpace(): List<WorkSpace>
    fun getAllWorkSpaceByPage(page:Int, size:Int) : List<WorkSpace>
    fun getWorkSpaceById(orderIndex: Long, code: String): WorkSpace?
    // update
    fun editWorkSpaceById(editWorkSpace: EditWorkSpace, fkCreatedBy: UUID)
    // delete
    fun removeWorkSpaceById(orderIndex: Long, code:String, fkCreatedBy: UUID)

    // * ------------------------------------------------
    // *   for Workspace Member
    // * ------------------------------------------------

    // Create
    fun createWorkMember(addMember: BaseMember): Int

    // Read
    fun getAllWorkMember(): List<WorkMember>
    fun getAllWorkMemberByPage(page:Int, size:Int) : List<WorkMember>

    fun getSpaceMemberByPage(searchParam:Map<String, Any>) : List<WorkMember>

    fun getWorkMemberById(baseMember: BaseMember): WorkMember?

    fun getCountWorkMember(orderIndex: Long, code: String) : Int

    // Update 없음!

    // Delete
    fun removeWorkMember(baseMember: BaseMember) : Boolean

}
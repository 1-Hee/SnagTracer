package com.aiden.snagtracer.service.workspace

import com.aiden.snagtracer.model.workspace.AddWorkSpace
import com.aiden.snagtracer.model.workspace.WorkSpace

interface WorkSpaceService {

    // Create
    fun createWorkSpace(workSpace: AddWorkSpace): Int


    // Read
    fun getWorkSpaceList(): List<WorkSpace>
    fun getWorkSpaceListByOffset(page:Int, size:Int) : List<WorkSpace>
    fun getWorkSpaceById(orderIndex: Long, code: String): WorkSpace?


}
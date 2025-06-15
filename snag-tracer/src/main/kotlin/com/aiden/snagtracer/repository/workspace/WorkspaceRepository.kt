package com.aiden.snagtracer.repository.workspace

import com.aiden.snagtracer.model.workspace.AddWorkSpace
import com.aiden.snagtracer.model.workspace.WorkSpace

interface WorkspaceRepository {

    // Create
    fun insert(workSpace: AddWorkSpace): Int


    // Read
    fun findAll(): List<WorkSpace>
    fun findList(page:Int, size:Int) : List<WorkSpace>

    fun findById(orderIndex: Long, code: String): WorkSpace?

}
package com.aiden.snagtracer.service.workspace

import com.aiden.snagtracer.model.workspace.AddWorkSpace
import com.aiden.snagtracer.model.workspace.WorkSpace
import com.aiden.snagtracer.repository.workspace.WorkspaceRepository
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.stereotype.Service

@Service
class WorkSpaceServiceImpl(
    private val workspaceRepository: WorkspaceRepository
) : WorkSpaceService {

    companion object {
        private val logger: Logger = LoggerFactory.getLogger(WorkSpaceServiceImpl::class.java)
    }
    override fun createWorkSpace(workSpace: AddWorkSpace): Int {

        return workspaceRepository.insert(workSpace)
    }

    override fun getWorkSpaceList(): List<WorkSpace> {
        return workspaceRepository.findAll()
    }

    override fun getWorkSpaceListByOffset(page: Int, size: Int): List<WorkSpace> {
        return workspaceRepository.findList(page, size)
    }

    override fun getWorkSpaceById(orderIndex: Long, code: String): WorkSpace? {
        return workspaceRepository.findById(orderIndex, code)
    }
}
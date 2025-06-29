package com.aiden.snagtracer.repository.issue

import com.aiden.snagtracer.model.issue.Issue
import com.aiden.snagtracer.model.issue.IssueResponse
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import java.util.*

interface IssueRepository : CrudRepository<Issue, Long> {


    @Query("""
        SELECT * FROM issue_info
        ORDER BY issue_id DESC
        LIMIT :size OFFSET :offset
    """)
    fun findPageList(size: Int, offset: Long): List<Issue>

    @Query(
        """
        SELECT 
        i.issue_id, i.title, content, 
        ws.space_name as work_space_name, 
        pi.priority_eng as priority,
        u.user_name as owner_name,
        i.status, i.created_at, i.update_at
        FROM issue_info i
        INNER JOIN work_space ws 
        ON i.fk_order_index = ws.order_index AND i.fk_code = ws.code
        INNER JOIN priority_info pi 
        ON i.fk_priority_lv = pi.priority_lv
        INNER JOIN users u 
        ON i.fk_issue_owner = u.user_uuid
        ORDER BY i.issue_id DESC
        LIMIT :size OFFSET :offset;            
        """
    )
    fun findResponsePageList(size:Int, offset: Long) : List<IssueResponse>

    @Query("""
        SELECT * FROM issue_info
        WHERE title ILIKE '%' || :title || '%'
        ORDER BY issue_id DESC
        LIMIT :size OFFSET :offset;
    """)
    fun findTitleList(title:String, size: Int, offset: Long) : List<Issue>

    @Query("""
        SELECT * FROM issue_info
        WHERE fk_issue_owner = :ownerId
        ORDER BY issue_id DESC
        LIMIT :size OFFSET :offset;
    """)
    fun findOwnerList(ownerId: UUID, size: Int, offset: Long) : List<Issue>




}


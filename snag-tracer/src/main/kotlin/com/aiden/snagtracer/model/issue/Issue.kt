package com.aiden.snagtracer.model.issue

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID

@Table("issue_info")
data class Issue(
    @Id
    var issueId:Long? = null,           // 이슈 정보 식별자
    var title:String,                   // 이슈 제목
    var content:String,                 // 이슈 내용
    var fkOrderIndex:Int? = null,       // 작업실 순서
    var fkCode:String? = null,          // 작업실 코드 (순서 + 코드 = 외래키)
    var fkPriorityLv:Int? = null,       // 중요도 레벨
    var fkIssueOwner:UUID? = null,      // 이슈 생성자(소유자, 불변해야함)
    var status:Int = 1,
    val createdAt: LocalDateTime? = null,            // 생성 일자
    var updateAt: LocalDateTime? = null              // 수정 일자
)

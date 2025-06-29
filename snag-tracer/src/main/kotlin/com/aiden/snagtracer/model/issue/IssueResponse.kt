package com.aiden.snagtracer.model.issue

import java.time.LocalDateTime
import java.util.*

// 엔티티는 아니고 후처리용 클래스?
data class IssueResponse(
    val issueId:Long? = null,           // 이슈 정보 식별자
    val title:String,                   // 이슈 제목
    val content:String,                 // 이슈 내용
    val workSpaceName:String,           // (fkOrderIndex + fkCode) -> Title
    val priority:String,                // (fkPriorityLv) -> Priority Name
    val ownerName:String,               // (fkIssueOwner) -> owner name
    var status:Int = 1,
    val createdAt: LocalDateTime? = null,            // 생성 일자
    var updateAt: LocalDateTime? = null              // 수정 일자
)

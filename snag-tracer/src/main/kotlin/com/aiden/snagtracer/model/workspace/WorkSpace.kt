package com.aiden.snagtracer.model.workspace

import org.springframework.data.annotation.Id
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table
import java.time.LocalDateTime
import java.util.UUID
@Table("work_space")
 data class WorkSpace(
     var orderIndex:Long? = null,               // 순서
     var code:String,                           // 분류 코드 (20자)
     var spaceName:String,                      // 작업실 명
     var spaceDomain:String,                    // 도메인 (com.example.project)
     var fkCreatedBy:UUID? = null,              // 만든 이
     val createdAt: LocalDateTime? = null,      // 생성 일자
 )
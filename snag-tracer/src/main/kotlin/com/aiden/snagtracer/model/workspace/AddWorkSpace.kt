package com.aiden.snagtracer.model.workspace

import java.util.*

data class AddWorkSpace(
    var code:String,                           // 분류 코드 (20자)
    var spaceName:String,                      // 작업실 명
    var spaceDomain:String,                    // 도메인 (com.example.project)
    var fkCreatedBy: UUID? = null,              // 만든 이
)
/*
  "code": "DOC-0542",
  "spaceName": "기술 문서 표준화",
  "spaceDomain": "com.package.document",
  "fkCreatedBy": "6ff2966a-284b-4c5e-9d78-816d79be7ddb"
 */

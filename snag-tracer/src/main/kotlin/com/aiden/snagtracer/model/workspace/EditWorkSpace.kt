package com.aiden.snagtracer.model.workspace

import java.util.*

data class EditWorkSpace (
    var orderIndex:Long,
    var code:String,                           // 분류 코드 (20자)
    var spaceName:String,                      // 작업실 명
    var spaceDomain:String,                    // 도메인 (com.example.project)
)
/*
AddWorkSpace{
code*	string
spaceName*	string
spaceDomain*	string
fkCreatedBy	string($uuid)
}
 */
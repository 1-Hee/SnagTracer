package com.aiden.snagtracer.model.workspace

data class RemoveSpace(
    var orderIndex:Long,
    var code:String,                           // 분류 코드 (20자)
)
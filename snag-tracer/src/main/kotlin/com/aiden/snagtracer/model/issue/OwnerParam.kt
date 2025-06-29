package com.aiden.snagtracer.model.issue

import java.util.UUID

data class OwnerParam(
    val ownerId:UUID,
    val page:Int,
    val size:Int
)

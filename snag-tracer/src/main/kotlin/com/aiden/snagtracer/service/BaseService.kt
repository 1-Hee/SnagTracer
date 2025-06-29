package com.aiden.snagtracer.service

interface BaseService {
    open fun getOffset(page: Int, size:Int) : Long {
        return ((page - 1L) * size)
    }
}
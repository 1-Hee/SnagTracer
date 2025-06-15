package com.aiden.snagtracer.controller

interface BaseRestController<S> {
    fun getService() : S
}
package com.aiden.snagtracer

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SnagTracerApplication

fun main(args: Array<String>) {
	runApplication<SnagTracerApplication>(*args)
}

package com.example.EduPatch.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WelcomeController {
    
    @GetMapping("/")
    public String welcome() {
        return "EduPatch API is running! Backend deployed successfully.";
    }
    
    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}
package com.learnhub.controller;

import com.learnhub.model.LoginRequest;
import com.learnhub.model.User;
import com.learnhub.service.AuthService;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest request) {
        return authService.login(request.getUsername(), request.getPassword());
    }
}
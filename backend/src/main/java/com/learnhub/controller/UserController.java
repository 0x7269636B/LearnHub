package com.learnhub.controller;

import com.learnhub.model.RegisterRequest;
import com.learnhub.model.User;
import com.learnhub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3000") // Σημαντικό για να μιλάει με το React
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest request) {
        try {
            User newUser = userService.createUser(request);
            return ResponseEntity.ok(newUser);
        } catch (RuntimeException e) {
            // Αν υπάρχει ήδη το email, επιστρέφουμε 400 Bad Request με το μήνυμα λάθους
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
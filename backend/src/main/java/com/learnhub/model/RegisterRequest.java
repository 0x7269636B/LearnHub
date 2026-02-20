package com.learnhub.model;

import lombok.Data;

@Data
public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private Role role; // "STUDENT", "TEACHER" ή "ADMIN"
}
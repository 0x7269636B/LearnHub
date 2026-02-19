package com.learnhub.service;

import com.learnhub.model.User; // <-- ΑΥΤΟ ΕΙΝΑΙ ΤΟ ΣΩΣΤΟ IMPORT
import com.learnhub.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ΠΡΟΣΟΧΗ ΕΔΩ: Η μέθοδος πρέπει να επιστρέφει User
    public User login(String username, String password) {

        // Χρησιμοποιούμε το findByEmail που ορίσαμε στο UserRepository
        return userRepository.findByEmail(username)
                .filter(u -> u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid User credentials"));
    }
}
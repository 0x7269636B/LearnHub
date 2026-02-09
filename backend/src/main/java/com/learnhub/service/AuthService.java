package com.learnhub.service;

import com.learnhub.model.User;
import com.learnhub.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User login(String username, String password) {
        return userRepository.findByUsername(username)
                .filter(u -> u.getPassword() != null && u.getPassword().equals(password))
                .orElseThrow(() -> new RuntimeException("Invalid username or password"));
    }
}
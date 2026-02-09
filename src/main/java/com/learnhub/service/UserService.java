package com.learnhub.service;

import com.learnhub.model.User;
import com.learnhub.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        // Στο μέλλον εδώ θα μπορούσες να βάλεις κρυπτογράφηση κωδικού
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
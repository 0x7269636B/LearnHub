package com.learnhub.controller;

import com.learnhub.model.Role;
import com.learnhub.model.User;
import com.learnhub.repository.CourseRepository;
import com.learnhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("http://localhost:3000")
@RequiredArgsConstructor
public class AdminController {

    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("students", userRepository.countByRole(Role.STUDENT));
        stats.put("teachers", userRepository.countByRole(Role.TEACHER));
        stats.put("courses", courseRepository.count()); // Μετράει όλα τα μαθήματα
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent-users")
    public ResponseEntity<List<User>> getRecentUsers() {
        return ResponseEntity.ok(userRepository.findTop5ByOrderByIdDesc());
    }
}
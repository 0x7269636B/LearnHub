package com.learnhub.controller;

import com.learnhub.model.Teacher;
import com.learnhub.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/teachers") // Χρησιμοποιούμε πληθυντικό στα endpoints
public class TeacherController {

    private final TeacherService teacherService;

    // Dependency Injection μέσω Constructor
    @Autowired
    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    // Λήψη όλων των καθηγητών
    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherService.getAllTeachers();
    }

    // Προσθήκη νέου καθηγητή
    @PostMapping
    public Teacher createTeacher(@RequestBody Teacher teacher) {
        return teacherService.saveTeacher(teacher);
    }

    // Λήψη καθηγητή με βάση το ID
    @GetMapping("/{id}")
    public Teacher getTeacherById(@PathVariable Long id) {
        return teacherService.getTeacherById(id);
    }
}
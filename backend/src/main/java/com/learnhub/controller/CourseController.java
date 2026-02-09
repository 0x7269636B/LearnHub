package com.learnhub.controller;

import com.learnhub.model.Course;
import com.learnhub.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses") // Το endpoint για τα μαθήματα
@CrossOrigin("*") // Απαραίτητο για την επικοινωνία με το React front-end [cite: 49]
public class CourseController {

    private final CourseService courseService;

    // Χρήση Dependency Injection μέσω Constructor
    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // CREATE: Προσθήκη νέου μαθήματος
    @PostMapping
    public Course createCourse(@RequestBody Course course) {
        return courseService.createCourse(course);
    }

    // READ: Λήψη όλων των μαθημάτων
    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    // READ: Λήψη συγκεκριμένου μαθήματος βάσει ID
    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable Long id) {
        return courseService.getCourseById(id);
    }
}
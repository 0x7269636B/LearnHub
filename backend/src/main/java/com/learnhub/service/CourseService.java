package com.learnhub.service;

import com.learnhub.model.Course;
import com.learnhub.repository.CourseRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service // Λέει στο Spring ότι αυτό είναι το Business Logic (Layer 2)
public class CourseService {

    private final CourseRepository courseRepository;

    // Dependency Injection μέσω Constructor
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course addCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course updateCourse(Long id, Course updatedCourse) {
        return courseRepository.findById(id).map(course -> {
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setCategory(updatedCourse.getCategory());
            course.setHoursPerWeek(updatedCourse.getHoursPerWeek());
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Το μάθημα δεν βρέθηκε."));
    }

    public Course getCourseById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Το μάθημα δεν βρέθηκε."));
    }
}
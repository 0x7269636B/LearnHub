package com.learnhub.repository;

import com.learnhub.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    // Εδώ το Spring Data JPA υλοποιεί αυτόματα όλες τις CRUD λειτουργίες
}
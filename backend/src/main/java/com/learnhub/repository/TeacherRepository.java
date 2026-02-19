package com.learnhub.repository;

import com.learnhub.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    // ΑΛΛΑΓΗ ΕΔΩ: Από findByUsername σε findByEmail
    Optional<Teacher> findByEmail(String email);
}
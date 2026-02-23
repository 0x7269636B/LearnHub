package com.learnhub.service;

import com.learnhub.model.Course;
import com.learnhub.model.Enrollment;
import com.learnhub.model.User;
import com.learnhub.repository.CourseRepository;
import com.learnhub.repository.EnrollmentRepository;
import com.learnhub.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;
    private final UserRepository userRepository;
    private final CourseRepository courseRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository, UserRepository userRepository, CourseRepository courseRepository) {
        this.enrollmentRepository = enrollmentRepository;
        this.userRepository = userRepository;
        this.courseRepository = courseRepository;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Enrollment enrollStudent(Long studentId, Long courseId) {
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Ο μαθητής δεν βρέθηκε"));
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Το μάθημα δεν βρέθηκε"));

        Enrollment enrollment = Enrollment.builder()
                .student(student)
                .course(course)
                .enrollmentDate(LocalDate.now())
                .absences(0) // Αρχικοποίηση απουσιών
                .build();

        return enrollmentRepository.save(enrollment);
    }

    public Enrollment updateAbsences(Long enrollmentId, int hours) {
        return enrollmentRepository.findById(enrollmentId).map(enr -> {
            int currentAbsences = (enr.getAbsences() == null) ? 0 : enr.getAbsences();
            int newAbsences = Math.max(0, currentAbsences + hours);
            enr.setAbsences(newAbsences);
            return enrollmentRepository.save(enr);
        }).orElseThrow(() -> new RuntimeException("Η ανάθεση δεν βρέθηκε."));
    }

    public Enrollment updateGrade(Long enrollmentId, Double grade) {
        return enrollmentRepository.findById(enrollmentId).map(enr -> {
            enr.setGrade(grade);
            return enrollmentRepository.save(enr);
        }).orElseThrow(() -> new RuntimeException("Η ανάθεση δεν βρέθηκε."));
    }
}
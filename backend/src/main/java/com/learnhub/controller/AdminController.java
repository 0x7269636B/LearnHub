package com.learnhub.controller;

import com.learnhub.model.Course;
import com.learnhub.model.Role;
import com.learnhub.model.User;
import com.learnhub.repository.PaymentRepository;
import com.learnhub.repository.UserRepository;
import com.learnhub.service.CourseService;
import com.learnhub.service.EnrollmentService;
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
    private final PaymentRepository paymentRepository;

    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getDashboardStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("students", userRepository.countByRole(Role.STUDENT));
        stats.put("teachers", userRepository.countByRole(Role.TEACHER));
        // Υπολογίζουμε τα μαθήματα μέσω του Service πλέον!
        stats.put("courses", (long) courseService.getAllCourses().size());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/recent-users")
    public ResponseEntity<List<User>> getRecentUsers() {
        return ResponseEntity.ok(userRepository.findTop5ByOrderByIdDesc());
    }

    @GetMapping("/students")
    public ResponseEntity<List<User>> getAllStudents() {
        return ResponseEntity.ok(userRepository.findByRole(Role.STUDENT));
    }

    @GetMapping("/teachers")
    public ResponseEntity<List<User>> getAllTeachers() {
        return ResponseEntity.ok(userRepository.findByRole(Role.TEACHER));
    }

    @GetMapping("/courses")
    public ResponseEntity<?> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @PostMapping("/courses")
    public ResponseEntity<?> addCourse(@RequestBody Course course) {
        try {
            return ResponseEntity.ok(courseService.addCourse(course));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την αποθήκευση του μαθήματος.");
        }
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody Course updatedCourse) {
        try {
            return ResponseEntity.ok(courseService.updateCourse(id, updatedCourse));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/enrollments")
    public ResponseEntity<?> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @PostMapping("/enrollments")
    public ResponseEntity<?> enrollStudent(@RequestBody com.learnhub.model.EnrollmentRequest request) {
        try {
            return ResponseEntity.ok(enrollmentService.enrollStudent(request.getStudentId(), request.getCourseId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/enrollments/{id}/absences")
    public ResponseEntity<?> updateAbsence(@PathVariable Long id, @RequestParam int hours) {
        try {
            return ResponseEntity.ok(enrollmentService.updateAbsences(id, hours));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/enrollments/{id}/grade")
    public ResponseEntity<?> updateGrade(@PathVariable Long id, @RequestParam Double grade) {
        try {
            return ResponseEntity.ok(enrollmentService.updateGrade(id, grade));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/payments")
    public ResponseEntity<?> getAllPayments() {
        return ResponseEntity.ok(paymentRepository.findAll());
    }

    @PostMapping("/payments")
    public ResponseEntity<?> addPayment(@RequestBody com.learnhub.model.PaymentRequest request) {
        try {
            User student = userRepository.findById(request.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Ο μαθητής δεν βρέθηκε"));

            com.learnhub.model.Payment payment = com.learnhub.model.Payment.builder()
                    .student(student)
                    .amount(request.getAmount())
                    .paymentDate(java.time.LocalDate.now())
                    .description(request.getDescription())
                    .build();

            return ResponseEntity.ok(paymentRepository.save(payment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την καταχώρηση πληρωμής.");
        }
    }
}
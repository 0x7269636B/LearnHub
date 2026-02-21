package com.learnhub.controller;

import com.learnhub.model.Course;
import com.learnhub.model.Role;
import com.learnhub.model.User;
import com.learnhub.repository.CourseRepository;
import com.learnhub.repository.EnrollmentRepository;
import com.learnhub.repository.PaymentRepository;
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
    private final EnrollmentRepository enrollmentRepository;
    private final PaymentRepository paymentRepository;

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
        return ResponseEntity.ok(courseRepository.findAll());
    }

    @PostMapping("/courses")
    public ResponseEntity<?> addCourse(@RequestBody com.learnhub.model.Course course) {
        try {
            com.learnhub.model.Course savedCourse = courseRepository.save(course);
            return ResponseEntity.ok(savedCourse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την αποθήκευση του μαθήματος.");
        }
    }

    @PutMapping("/courses/{id}")
    public ResponseEntity<?> updateCourse(@PathVariable Long id, @RequestBody com.learnhub.model.Course updatedCourse) {
        try {
            // Ψάχνουμε αν υπάρχει το μάθημα με αυτό το ID (προσοχή: ίσως το πεδίο σου λέγεται cid)
            return courseRepository.findById(id).map(course -> {
                course.setTitle(updatedCourse.getTitle());
                course.setDescription(updatedCourse.getDescription());
                course.setCategory(updatedCourse.getCategory());
                course.setHoursPerWeek(updatedCourse.getHoursPerWeek());

                // Το αποθηκεύουμε ενημερωμένο
                com.learnhub.model.Course savedCourse = courseRepository.save(course);
                return ResponseEntity.ok(savedCourse);
            }).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την ενημέρωση του μαθήματος.");
        }
    }

    @GetMapping("/enrollments")
    public ResponseEntity<?> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentRepository.findAll());
    }

    @PostMapping("/enrollments")
    public ResponseEntity<?> enrollStudent(@RequestBody com.learnhub.model.EnrollmentRequest request) {
        try {
            User student = userRepository.findById(request.getStudentId())
                    .orElseThrow(() -> new RuntimeException("Ο μαθητής δεν βρέθηκε"));
            Course course = courseRepository.findById(request.getCourseId())
                    .orElseThrow(() -> new RuntimeException("Το μάθημα δεν βρέθηκε"));

            com.learnhub.model.Enrollment enrollment = com.learnhub.model.Enrollment.builder()
                    .student(student)
                    .course(course)
                    .enrollmentDate(java.time.LocalDate.now())
                    .build();

            return ResponseEntity.ok(enrollmentRepository.save(enrollment));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την ανάθεση του μαθητή.");
        }
    }

    @PutMapping("/enrollments/{id}/absences")
    public ResponseEntity<?> updateAbsence(@PathVariable Long id, @RequestParam int hours) {
        try {
            return enrollmentRepository.findById(id).map(enr -> {
                int currentAbsences = (enr.getAbsences() == null) ? 0 : enr.getAbsences();
                int newAbsences = Math.max(0, currentAbsences + hours);
                enr.setAbsences(newAbsences);

                com.learnhub.model.Enrollment updatedEnrollment = enrollmentRepository.save(enr);
                return ResponseEntity.ok(updatedEnrollment);
            }).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την ενημέρωση απουσίας.");
        }
    }

    @PutMapping("/enrollments/{id}/grade")
    public ResponseEntity<?> updateGrade(@PathVariable Long id, @RequestParam Double grade) {
        try {
            return enrollmentRepository.findById(id).map(enr -> {
                enr.setGrade(grade);
                com.learnhub.model.Enrollment updatedEnrollment = enrollmentRepository.save(enr);
                return ResponseEntity.ok(updatedEnrollment);
            }).orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Σφάλμα κατά την καταχώρηση βαθμού.");
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
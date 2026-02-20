package com.learnhub.service;

import com.learnhub.model.RegisterRequest;
import com.learnhub.model.Role;
import com.learnhub.model.Student;
import com.learnhub.model.Teacher;
import com.learnhub.model.User;
import com.learnhub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User createUser(RegisterRequest request) {
        // 1. Έλεγχος αν το email υπάρχει ήδη
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Το Email υπάρχει ήδη!");
        }

        User user;

        // 2. Δημιουργία της κατάλληλης οντότητας βάσει του Ρόλου
        if (request.getRole() == Role.STUDENT) {
            user = Student.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .phoneNumber(request.getPhoneNumber())
                    .role(Role.STUDENT)
                    .registrationDate(LocalDate.now()) // Ειδικό πεδίο του Student
                    .build();
        } else if (request.getRole() == Role.TEACHER) {
            user = Teacher.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .phoneNumber(request.getPhoneNumber())
                    .role(Role.TEACHER)
                    // .specialization(...) θα μπορούσες να το προσθέσεις αργότερα
                    .build();
        } else {
            // ADMIN
            user = User.builder()
                    .firstName(request.getFirstName())
                    .lastName(request.getLastName())
                    .email(request.getEmail())
                    .password(request.getPassword())
                    .phoneNumber(request.getPhoneNumber())
                    .role(Role.ADMIN)
                    .build();
        }

        // 3. Αποθήκευση στη βάση (το hibernate θα βάλει σωστά το user_type)
        return userRepository.save(user);
    }
}
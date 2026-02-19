package com.learnhub;

import com.learnhub.model.Role;
import com.learnhub.model.Student;
import com.learnhub.model.Teacher;
import com.learnhub.model.User;
import com.learnhub.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
public class LearnHubApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnHubApplication.class, args);
    }

    /**
     * Αυτή η μέθοδος τρέχει αυτόματα κατά την εκκίνηση.
     * Χρησιμεύει για να βάλουμε αρχικά δεδομένα στη βάση (Seeding).
     */
    @Bean
    public CommandLineRunner initData(UserRepository userRepository) {
        return args -> {
            // Έλεγχος: Αν υπάρχουν ήδη χρήστες, μην κάνεις τίποτα (για να μην έχουμε διπλότυπα)
            if (userRepository.count() > 0) {
                System.out.println("⚠️ Database already populated. Skipping initialization.");
                return;
            }

            System.out.println("🌱 Seeding database with initial users...");

            // 1. Δημιουργία Μαθητή (Student)
            // Προσέξε πώς χρησιμοποιούμε τον builder: βάζουμε ΚΑΙ τα πεδία του User ΚΑΙ του Student
            Student student1 = Student.builder()
                    .firstName("Giorgos")
                    .lastName("Papadopoulos")
                    .email("student@learnhub.com")
                    .password("1234") // Προσοχή: Σε real app θέλει κρυπτογράφηση (BCrypt)
                    .phoneNumber("6971234567")
                    .role(Role.STUDENT)
                    .registrationDate(LocalDate.now()) // Πεδίο μόνο για Student
                    .build();

            // 2. Δημιουργία Καθηγητή (Teacher)
            Teacher teacher1 = Teacher.builder()
                    .firstName("Maria")
                    .lastName("Nikolaou")
                    .email("teacher@learnhub.com")
                    .password("1234")
                    .phoneNumber("6939876543")
                    .role(Role.TEACHER)
                    .specialization("Mathematics") // Πεδίο μόνο για Teacher
                    .build();

            // 3. Δημιουργία Διαχειριστή (Admin - Απλό User object ή Admin entity αν έφτιαξες)
            User admin1 = User.builder()
                    .firstName("Admin")
                    .lastName("System")
                    .email("admin@learnhub.com")
                    .password("admin123")
                    .phoneNumber("2101234567")
                    .role(Role.ADMIN)
                    .build();

            // Αποθήκευση όλων στη βάση με ΜΙΑ κλήση
            userRepository.saveAll(List.of(student1, teacher1, admin1));

            System.out.println("✅ Database seeded successfully!");
            System.out.println("👉 Student Login: student@learnhub.com / 1234");
            System.out.println("👉 Teacher Login: teacher@learnhub.com / 1234");
            System.out.println("👉 Admin Login:   admin@learnhub.com / admin123");
        };
    }
}
package com.learnhub.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Entity
@Table(name = "payments")
@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Ο μαθητής που έκανε την πληρωμή
    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @Column(nullable = false)
    private Double amount; // Το ποσό

    @Column(nullable = false)
    private LocalDate paymentDate; // Ημερομηνία πληρωμής

    private String description; // π.χ. "Δίδακτρα Οκτωβρίου"
}
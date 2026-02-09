package com.learnhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long sid;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String email;

    private String phoneNumber;

    private String registrationDate;

    private String birthDate;
}

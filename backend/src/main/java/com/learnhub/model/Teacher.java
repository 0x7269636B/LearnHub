package com.learnhub.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Teacher")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tid;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    private String email;

    private String username;

    private String password;

    private String speciality;

    private int salary;
}

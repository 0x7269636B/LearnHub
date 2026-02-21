package com.learnhub.model;

import lombok.Data;

@Data
public class PaymentRequest {
    private Long studentId;
    private Double amount;
    private String description;
}
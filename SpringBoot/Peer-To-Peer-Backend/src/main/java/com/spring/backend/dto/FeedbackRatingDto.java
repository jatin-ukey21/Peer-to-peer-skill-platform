package com.spring.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackRatingDto {
    private String sessionId;
    private String tutorId;

    private String feedback;

    private double rating;
}

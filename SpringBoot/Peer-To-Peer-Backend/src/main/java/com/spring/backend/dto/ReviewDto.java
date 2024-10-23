package com.spring.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {

    private String skillName;
    private String learnerName;
    private String feedback;
    private double rating;
    private String conductedDate;
}

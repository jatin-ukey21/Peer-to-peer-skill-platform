package com.spring.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PendingSessionRequestDTO {
    private String id;
    private String learnerName;
    private String skillName;
    private String timing;
    private String proposedDate;
}

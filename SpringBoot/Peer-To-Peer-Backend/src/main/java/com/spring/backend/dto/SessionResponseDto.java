package com.spring.backend.dto;


import com.spring.backend.utils.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionResponseDto {

    private String teacherId;

    private String  learnerId;

    private String skillName;

    private String proposedDate;
    //private Date date;

    private boolean active;

    private Status status;
    //newly added
    private String timing;
}

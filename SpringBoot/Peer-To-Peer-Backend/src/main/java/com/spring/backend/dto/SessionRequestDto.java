package com.spring.backend.dto;

import com.spring.backend.entity.User;
import com.spring.backend.utils.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionRequestDto {
    private String teacherId;

    private String  learnerId;

    private String skillName;

    private String proposedDate;
    //private Date date;

    private boolean active;
    //newly added
    private String timing;

}

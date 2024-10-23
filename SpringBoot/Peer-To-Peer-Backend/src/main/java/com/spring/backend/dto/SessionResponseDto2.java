package com.spring.backend.dto;


import com.spring.backend.utils.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SessionResponseDto2 {

    private String sessionId;

    private String teacherId;

    private String  learnerId;


}

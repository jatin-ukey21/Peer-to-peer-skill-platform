package com.spring.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSimplifiedDto {
    private String id;
    private String name;
    private String email;
}

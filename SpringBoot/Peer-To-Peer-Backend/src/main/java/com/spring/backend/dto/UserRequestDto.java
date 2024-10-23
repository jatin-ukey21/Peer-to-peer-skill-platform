package com.spring.backend.dto;

import com.spring.backend.entity.Review;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.Skill;
import com.spring.backend.utils.ExperienceLevel;
import com.spring.backend.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class UserRequestDto {

    private String name;
    private String email;
    private String password;
    private Role role;
    private List<Skill> skillsOffered;
    private List<Skill> skillsToLearn;
    private List<String> availableTimeSlots;

    private ExperienceLevel experienceLevel;
    private String collegeName;
    private String bio;
    private double ratings;


    //private List<Session>

}

package com.spring.backend.dto;

import com.spring.backend.entity.Review;
import com.spring.backend.entity.Skill;
import com.spring.backend.utils.ExperienceLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserSkillMatchingDto {

    private String id;
    private String name;
    private ExperienceLevel experienceLevel;
    private Double rating;
    private List<Skill> skillsOffered;
    private List<String> availableTimeSlots;
}

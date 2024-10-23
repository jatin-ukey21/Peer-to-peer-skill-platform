package com.spring.backend.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.spring.backend.entity.Review;
import com.spring.backend.entity.Skill;
import com.spring.backend.utils.ExperienceLevel;
import com.spring.backend.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;


//public class UserResponseDto {
//
////    private String name;
////    private String email;
////
////    private Role role;
////    @DBRef
////    private List<Skill> skillsToOffered;
////    @DBRef
////    private List<Skill> skillsToLearn;
////    private ExperienceLevel experienceLevel;
////    private String collegeName;
////    private String bio;
////    private double ratings;
////    private String profilePicture;//
////    private List<Review> reviews; // Include this to store user reviews
//    private String name;
//    private String email;
//    //private String password;
//    private Role role;
//    //@DBRef
////    private List<Skill> skillsToOffered;
//    private List<String> skillsToOffered;
//    //@DBRef
//    //private List<Skill> skillsToLearn;
//    private List<String> skillsToLearn;
//
//
//    private ExperienceLevel experienceLevel;
//    private String collegeName;
//    private String bio;
//    private double ratings;
//    private String profilePicture;//
//    //@DBRef
//    //private List<Review> reviews;
//    //private String availability;
//    //private List<Date> calander;+
////    public void setReviews(List<Review> reviews) {
////    }
//}
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
    private String id;
    private String name;
    private String email;

    private Role role;
    private List<Skill> skillsOffered;
    private List<Skill> skillsToLearn;
    private List<String> availableTimeSlots;

    private ExperienceLevel experienceLevel;
    private String collegeName;
    private String bio;
    private double ratings;
    private String profilePicture;

    // Getters and setters
}


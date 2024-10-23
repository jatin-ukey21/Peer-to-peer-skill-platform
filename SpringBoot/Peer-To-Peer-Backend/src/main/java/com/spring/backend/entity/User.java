package com.spring.backend.entity;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.spring.backend.utils.ExperienceLevel;
import com.spring.backend.utils.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "userCollection")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String password;
    private Role role;

    // References to the Skill collection
    @DBRef
    private List<Skill> skillsOffered;

    @DBRef
    private List<Skill> skillsToLearn;
    private List<String> availableTimeSlots;

    private ExperienceLevel experienceLevel;
    private String collegeName;
    private String bio;
    private double averageRating;
    private String profilePicture;

    @JsonIgnore
    private List<Session> upComingSessions;

}


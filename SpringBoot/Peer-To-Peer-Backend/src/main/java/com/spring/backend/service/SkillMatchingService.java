package com.spring.backend.service;

import com.spring.backend.dto.UserSkillMatchingDto;
import com.spring.backend.entity.Skill;
import com.spring.backend.entity.User;
import com.spring.backend.repsitory.SkillRepository;
import com.spring.backend.repsitory.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SkillMatchingService
{

    @Autowired
    private SkillRepository skillRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;


    public List<UserSkillMatchingDto> findMatchingTeachers(String skillToLearn, String userId) {
        // Fetch the skill ID based on the skill name
        Skill skill = skillRepository.findByName(skillToLearn);
        if (skill == null) {
            return Collections.emptyList(); // Return empty list if skill not found
        }

        // Create a query to find users who offer the specified skill
        Query tutorQuery = new Query();
        tutorQuery.addCriteria(Criteria.where("skillsOffered._id").is(skill.getId()));

        // Fetch matching tutors
        List<User> tutors = mongoTemplate.find(tutorQuery, User.class);

        // Prepare the response DTOs
        List<UserSkillMatchingDto> userSkillMatchingDto = new ArrayList<>();
        for (User user : tutors) {
            // Skip the current logged-in user (whose userId matches the provided userId)
            if (user.getId().equals(userId)) {
                continue; // Skip adding this user to the result
            }

            // Prepare DTO for each matching tutor
            UserSkillMatchingDto udto = new UserSkillMatchingDto();
            udto.setId(user.getId());
            udto.setName(user.getName());
            udto.setRating(user.getAverageRating());
            udto.setExperienceLevel(user.getExperienceLevel());
            udto.setSkillsOffered(user.getSkillsOffered());
            udto.setAvailableTimeSlots(user.getAvailableTimeSlots());

            userSkillMatchingDto.add(udto);
        }

        return userSkillMatchingDto;
    }
}

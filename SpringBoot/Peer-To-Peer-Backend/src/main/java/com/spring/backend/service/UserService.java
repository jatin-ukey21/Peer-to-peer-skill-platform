package com.spring.backend.service;

import com.spring.backend.dto.*;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.Skill;
import com.spring.backend.entity.User;
import com.spring.backend.exception.EmailAlreadExistException;
import com.spring.backend.exception.LoginException;
import com.spring.backend.repsitory.SessionRepository;
import com.spring.backend.repsitory.SkillRepository;
import com.spring.backend.repsitory.UserRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private SessionRepository sessionRepository;
    @Autowired
    UserRepository userRepository;


    @Autowired
    private MongoTemplate mongoTemplate;
    @Autowired
    SkillRepository skillRepository;

    @Autowired
    EmailService emailService;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Method for user registration
    public User registerUser(UserRequestDto userDto,String profilePictureData) {
        Optional<User> userExist = userRepository.findByEmail(userDto.getEmail());

        // Check if a user with the given email already exists
        if (userExist.isPresent()) {
            throw new EmailAlreadExistException("User with same email already exist!!");
        } else {
            // Mapping DTO to Entity


            /*new mapping*/
            User savedUser = new User();
            savedUser.setName(userDto.getName());
            savedUser.setEmail(userDto.getEmail());
            savedUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
            savedUser.setExperienceLevel(userDto.getExperienceLevel());
            savedUser.setCollegeName(userDto.getCollegeName());
            savedUser.setAvailableTimeSlots(userDto.getAvailableTimeSlots());
            savedUser.setBio(userDto.getBio());
            savedUser.setRole(userDto.getRole());

            List<Skill> offeredSkills =  new ArrayList<>();
            for (Skill skill : userDto.getSkillsOffered()){

                Skill existingSkill = skillRepository.findByName(skill.getName());
                if (existingSkill == null){
                    existingSkill = skillRepository.save(skill);
                }
                offeredSkills.add(existingSkill);
            }
            savedUser.setSkillsOffered(offeredSkills);

            List<Skill> learningSkills =  new ArrayList<>();
            for (Skill skill : userDto.getSkillsToLearn()){

                Skill existingSkill = skillRepository.findByName(skill.getName());
                if (existingSkill == null) {
                    existingSkill = skillRepository.save(skill);  // Save new skill
                }
                learningSkills.add(existingSkill);
            }
            savedUser.setSkillsToLearn(learningSkills);


            // Store profile picture (Base64 encoded)
            // Set Profile Picture (if provided)
            if (profilePictureData != null) {
                savedUser.setProfilePicture(profilePictureData);
            }


            return userRepository.save(savedUser);
        }
    }


    public boolean loginUser(UserLoginDto userLoginDto) {
        Optional<User> userExist = userRepository.findByEmail(userLoginDto.getEmail());
        return userExist.isPresent();
    }

    // Method to handle user login
    public UserResponseDto login(UserLoginDto userLoginDto) {
        Optional<User> userExist = userRepository.findByEmail(userLoginDto.getEmail());

        if (userExist.isPresent()) {
            // Check if the password matches
            if (passwordEncoder.matches(userLoginDto.getPassword(), userExist.get().getPassword())) {
                UserResponseDto userResponseDto = new UserResponseDto();
                User user = userExist.get();

                // Map fields from User to UserResponseDto
                userResponseDto.setId(user.getId());
                userResponseDto.setBio(user.getBio());
                userResponseDto.setRole(user.getRole());
                userResponseDto.setName(user.getName());
                userResponseDto.setEmail(user.getEmail());
                userResponseDto.setAvailableTimeSlots(user.getAvailableTimeSlots());
                //Remember to uncomment this

                userResponseDto.setSkillsOffered(user.getSkillsOffered()); // Updated field
                userResponseDto.setSkillsToLearn(user.getSkillsToLearn()); // Updated field
                userResponseDto.setCollegeName(user.getCollegeName());
                userResponseDto.setProfilePicture(user.getProfilePicture()); // Updated field
                userResponseDto.setRatings(user.getAverageRating()); // Include ratings
                userResponseDto.setExperienceLevel(user.getExperienceLevel());
                userResponseDto.setAvailableTimeSlots(user.getAvailableTimeSlots());

                return userResponseDto;
            } else {
                throw new LoginException("User found but password not matched");
            }
        } else {
            throw new LoginException("User not found, please register");
        }
    }

    // Method to handle password reset
    public User passwordReset(UserPasswordResetDto userPasswordResetDto) {
        // Find the user by email
        Optional<User> existUser = userRepository.findByEmail(userPasswordResetDto.getEmail());

        if (existUser.isPresent()) {
            User user = existUser.get(); // Get the existing user

            // Update the password
            user.setPassword(passwordEncoder.encode(userPasswordResetDto.getNewPassword()));

            // Log the password reset action
            System.out.println("Password reset successfully for user: " + user.getEmail());

            // Save the updated user back to the repository
            return userRepository.save(user);
        } else {
            throw new LoginException("User Not Found, Please Register");
        }
    }

    public List<Session> getUpcomingSessionsForUser(String userId) {
        // Fetch the user by ID
       // User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));


        // Return the list of upcoming sessions
        //return user.getUpComingSessions();

        Query userQuery = new Query();
        userQuery.addCriteria(Criteria.where("id").is(userId));

        // Fetch the user
        User user = mongoTemplate.findOne(userQuery, User.class);

        // Check if user exists
        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // Return the list of upcoming sessions
        Query getSessionsQuery = new Query();
        getSessionsQuery.addCriteria(Criteria.where("teacher").in(user.getUpComingSessions()));
       var sessions =  mongoTemplate.find(getSessionsQuery,Session.class);

        return sessions;
    }

    public boolean updateAvailableSlots(UserAvailableSlotsDto userAvailableSlotsDto) {

        Optional<User> userOptional = userRepository.findById(userAvailableSlotsDto.getId());

        if (userOptional.isPresent()){
            User user = userOptional.get();

            if (user.getAvailableTimeSlots() != null){
                List<String> slots = user.getAvailableTimeSlots();

                for (String slot : userAvailableSlotsDto.getAvailableTimeSlots()){
                    if (!slots.contains(slot)) slots.add(slot);
                }

                user.setAvailableTimeSlots(slots);
            }
            else{
                user.setAvailableTimeSlots(userAvailableSlotsDto.getAvailableTimeSlots());
            }

            userRepository.save(user);
            return true;

        }
        else {
            throw new RuntimeException("User not found with ID: " + userAvailableSlotsDto.getId());
        }
    }
}
package com.spring.backend.controller;

import com.spring.backend.dto.*;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.User;
import com.spring.backend.service.EmailService;
import com.spring.backend.service.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Base64;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;
    @Autowired
    EmailService emailService;

    @PostMapping(value = "/registerUser", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<User> registerUser(
            @RequestPart("user") UserRequestDto userDto,
            @RequestPart(value = "profilePicture") MultipartFile profilePicture) throws  IOException{

        // Convert image to Base64 or byte array
        String profilePictureData = Base64.getEncoder().encodeToString(profilePicture.getBytes());

        // Pass image data along with the userDto to service layer
        User user = userService.registerUser(userDto, profilePictureData);

        // Send registration email (if needed)
        emailService.sendRegistrationEmail(userDto.getEmail(), userDto.getName());

        return ResponseEntity.ok(user);
    }

    @PostMapping("/loginUser")
    public String loginUser(@RequestBody UserLoginDto userLoginDto){

        return userService.loginUser(userLoginDto) == true ? "true" : "false";

    }

    @PostMapping("/login")
    public ResponseEntity<UserResponseDto> login(@RequestBody UserLoginDto userLoginDto){
            var user = userService.login(userLoginDto);
            return ResponseEntity.ok(user);
    }

    @PostMapping("/passwordReset")
    public  ResponseEntity<User> userPasswordReset(@RequestBody UserPasswordResetDto userPasswordResetDto){
        var user = userService.passwordReset(userPasswordResetDto);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/{userId}/upcoming-sessions")
    public ResponseEntity<List<Session>> getUpcomingSessions(@PathVariable String userId) {
        List<Session> upcomingSessions = userService.getUpcomingSessionsForUser(userId);
        return ResponseEntity.ok(upcomingSessions);
    }

    @PostMapping("/slots/updateAvailableSlots")
    public ResponseEntity<Boolean> updateAvailableTimeSlots(@RequestBody UserAvailableSlotsDto userAvailableSlotsDto){
        boolean status = userService.updateAvailableSlots(userAvailableSlotsDto);

        return ResponseEntity.ok(status);
    }


}
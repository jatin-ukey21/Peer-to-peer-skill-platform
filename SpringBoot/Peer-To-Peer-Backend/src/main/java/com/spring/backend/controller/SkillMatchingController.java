package com.spring.backend.controller;

import com.spring.backend.dto.UserSkillMatchingDto;
import com.spring.backend.entity.User;
import com.spring.backend.service.SkillMatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/match")
public class SkillMatchingController {
    @Autowired
    private SkillMatchingService skillMatchingService;


    @GetMapping("/findTeachers")
    public ResponseEntity<List<UserSkillMatchingDto>> findMatchingTeachers(
            @RequestParam String skillToLearn, @RequestParam String userId) {

        List<UserSkillMatchingDto> matchingTeachers = skillMatchingService.findMatchingTeachers(skillToLearn, userId);
        return ResponseEntity.ok(matchingTeachers);
    }

}

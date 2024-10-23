package com.spring.backend.controller;


import com.spring.backend.dto.ReviewDto;
import com.spring.backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/tutor")
public class ReviewController {
    @Autowired
    private ReviewService sessionService;

    // Endpoint to get all sessions for a tutor by teacher ID
    @GetMapping("/sessions/{teacherId}" )
    public List<ReviewDto> getSessionsForTutor(@PathVariable String teacherId) {
        return sessionService.getSessionsForTutor(teacherId);
    }

}

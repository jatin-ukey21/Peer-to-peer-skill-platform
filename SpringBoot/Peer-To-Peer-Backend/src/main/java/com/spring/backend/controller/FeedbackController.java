package com.spring.backend.controller;

import com.spring.backend.dto.FeedbackRatingDto;
import com.spring.backend.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/sessionComplete")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/submitFeedback")
    public ResponseEntity<String> submitFeedback(@RequestBody FeedbackRatingDto feedbackRatingDto){

        System.out.println("URL hitted");
        boolean status = feedbackService.submitFeedback(feedbackRatingDto);
        System.out.println("Everything work correctly");
        return status == true ? ResponseEntity.ok("Feedback and Rating submitted successfully") : ResponseEntity.badRequest().body("Error submitting info");
    }
}

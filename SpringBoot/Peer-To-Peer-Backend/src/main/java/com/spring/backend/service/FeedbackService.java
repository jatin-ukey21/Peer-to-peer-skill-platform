package com.spring.backend.service;

import com.spring.backend.dto.FeedbackRatingDto;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.User;
import com.spring.backend.repsitory.SessionRepository;
import com.spring.backend.repsitory.UserRepository;
import com.spring.backend.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FeedbackService {

    private final RatingService ratingService;

    @Autowired
    public FeedbackService(RatingService ratingService){
        this.ratingService = ratingService;
    }
    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Boolean submitFeedback(FeedbackRatingDto feedbackRatingDto){

        //fetch session by id

        Session session = sessionRepository.findById(feedbackRatingDto.getSessionId())
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setFeedback(feedbackRatingDto.getFeedback());
        session.setRating(feedbackRatingDto.getRating());
        session.setStatus(Status.COMPLETED);
        //REMEMBER THIS POINT
        session.setActive(false);

        sessionRepository.save(session);

        //Update the tutor's rating
        User tutor = userRepository.findById(feedbackRatingDto.getTutorId())
                .orElseThrow(() -> new RuntimeException("Tutor not found"));

        tutor.setAverageRating(ratingService.calculateAverageRating(tutor.getId()));

        userRepository.save(tutor);

        return true;
    }
}

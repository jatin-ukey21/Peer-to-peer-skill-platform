package com.spring.backend.service;


import com.spring.backend.dto.ReviewDto;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.User;
import com.spring.backend.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReviewService {
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ReviewDto> getSessionsForTutor(String teacherId) {
        Query query = new Query();
        query.addCriteria(Criteria.where("teacher._id").is(teacherId).and("active").is(false).and("status").is(Status.COMPLETED));

        // Fetch all matching sessions
        List<Session> sessions = mongoTemplate.find(query, Session.class);

        // Map Session entities to SessionDTOs
        return sessions.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    // Helper method to map Session to SessionDTO
    private ReviewDto mapToDTO(Session session) {
        User learner = session.getLearner(); // Getting learner's details from session
        return new ReviewDto(
                session.getSkillName(),
                learner != null ? learner.getName() : "Unknown", // Handle potential null value for learner
                session.getFeedback(),
                session.getRating(),
                session.getProposedDate()
        );
    }
}

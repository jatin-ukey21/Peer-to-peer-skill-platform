package com.spring.backend.service;

import com.spring.backend.entity.Session;
import com.spring.backend.repsitory.SessionRepository;
import com.spring.backend.repsitory.UserRepository;
import com.spring.backend.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MongoTemplate mongoTemplate;



    public double calculateAverageRating(String tutorId){
        // Fetch all sessions for the tutor where the status is completed
        System.out.println("Average Rating method called!");
            Query query = new Query();
            query.addCriteria(Criteria.where("teacher.id").is(tutorId)
                    .and("status").is(Status.COMPLETED));

            List<Session> tutorsCompletedSesssions = mongoTemplate.find(query,Session.class);

            double totalRatings = 0;
            int numberOfRatings = 0;

            for (Session session: tutorsCompletedSesssions){
                totalRatings += session.getRating();
                numberOfRatings++;
            }

            if (numberOfRatings == 0){
                return 0;
            }

            return totalRatings / numberOfRatings;
    }
}

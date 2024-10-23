package com.spring.backend.service;

import com.spring.backend.entity.Session;
import com.spring.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;

public class NotificationService {
    @Autowired
    private EmailService emailService;
    public void sendRejectionEmail(Session session) {
        // Extract necessary information
        User learner = session.getLearner();
        String skillName = session.getSkillName();

        // Create email content
        String subject = "Session Rejection: " + skillName;
        String message = "Unfortunately, your session for " + skillName + " has been rejected. "
                + "Please try booking another time or session with another tutor.";

        // Send email to learner only
        emailService.sendEmail(learner.getEmail(), subject, message);
    }

    public void sendConfirmationEmail(Session session) {
//        String emailContent = "Your session for " + session.getSkillName() + " has been confirmed.\n"
//                + "Tutor: " + session.getTeacher().getName() + "\n"
//                + "Time: " + session.getProposedTime() + "\n"
//                + "Join the session here: " + "clickable video link";

        String emailContent = "Your session for " + session.getSkillName() + " has been confirmed.\n"
                + "Tutor: " + session.getTeacher().getName() + "\n"
                + "Join the session here: " + "clickable video link";

        String tutorContent = "Your session has been booked with the Learner : "
                + session.getLearner().getName();

        emailService.sendEmail(session.getLearner().getEmail(), "Session Confirmation", emailContent);
        emailService.sendEmail(session.getTeacher().getEmail(), "Session Confirmation", tutorContent);
    }
}

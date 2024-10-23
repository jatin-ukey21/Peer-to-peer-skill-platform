package com.spring.backend.service;

import com.spring.backend.entity.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender javaMailSender;

    public void sendRegistrationEmail(String to, String name) {

        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(to);
        simpleMailMessage.setSubject("Welcome to Peer to Peer Platform");
        simpleMailMessage.setText("Hello " + name + ",\n\nThank you for registering!");
        simpleMailMessage.setFrom("ukeykalpesh@gmail.com");
        javaMailSender.send(simpleMailMessage);
    }



    public void sendEmail(String emailRecipeint, String sessionConfirmation, String emailContent) {
            SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
            simpleMailMessage.setTo(emailRecipeint);
            simpleMailMessage.setSubject(sessionConfirmation);
            simpleMailMessage.setText(emailContent);
            simpleMailMessage.setFrom("ukeykalpesh@gmail.com");
            javaMailSender.send(simpleMailMessage);

    }

    // Function to send email notification to the tutor about a session request
    public void sendNotificationMail(String to, String tutorName, String clientName, String skillName, String sessionTime,String date) {
        // Create a simple mail message
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to); // recipient's email (tutor)
        message.setSubject("New Session Request: " + skillName + " - Skill Exchange Platform");
        message.setFrom("ukeykalpesh@gmail.com");
        // Email body
        String emailText = String.format("Hello %s,\n\n"
                        + "You have a new session request from %s.\n\n"
                        + "Skill: %s\n"
                        + "Requested Session Time: %s\n\n"
                        + "Requested Date: %s\n\n"
                        + "Please log in to your dashboard to view and confirm the session.\n"
                        + "We look forward to your confirmation!\n\n"
                        + "Best regards,\n"
                        + "Skill Exchange Platform Team",
                tutorName, clientName, skillName, sessionTime,date);

        message.setText(emailText);

        // Send the email
        javaMailSender.send(message);
    }
}

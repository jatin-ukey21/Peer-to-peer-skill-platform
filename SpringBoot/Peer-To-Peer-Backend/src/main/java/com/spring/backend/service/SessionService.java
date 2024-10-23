package com.spring.backend.service;

import com.spring.backend.dto.PendingSessionRequestDTO;
import com.spring.backend.dto.SessionRequestDto;
import com.spring.backend.dto.SessionResponseDto;
import com.spring.backend.dto.SessionResponseDto2;
import com.spring.backend.entity.Session;
import com.spring.backend.entity.User;
import com.spring.backend.exception.ResourceNotFoundException;
import com.spring.backend.repsitory.SessionRepository;
import com.spring.backend.repsitory.UserRepository;
import com.spring.backend.utils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SessionService {

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private MongoTemplate mongoTemplate;


    public SessionResponseDto createSessionRequest(SessionRequestDto sessionRequestDto){
        // Fetch the teacher and learner by their IDs
        User teacher = userRepository.findById(sessionRequestDto.getTeacherId())
                .orElseThrow(() -> new RuntimeException("Teacher not found"));
        User learner = userRepository.findById(sessionRequestDto.getLearnerId())
                .orElseThrow(() -> new RuntimeException("Learner not found"));

        // Create a new Session object
        Session session = new Session();
        session.setTeacher(teacher);
        session.setLearner(learner);
        session.setSkillName(sessionRequestDto.getSkillName());
        session.setProposedDate(sessionRequestDto.getProposedDate());
        session.setTiming(sessionRequestDto.getTiming());
        session.setActive(sessionRequestDto.isActive());

        session.setStatus(Status.PENDING);  // Default status as PENDING


        // Save the session in the database
        Session savedSession = sessionRepository.save(session);

        SessionResponseDto sessionResponseDto =  new SessionResponseDto();
        sessionResponseDto.setTeacherId(savedSession.getTeacher().getId());
        sessionResponseDto.setLearnerId(savedSession.getLearner().getId());
        sessionResponseDto.setSkillName(savedSession.getSkillName());
        sessionResponseDto.setProposedDate(savedSession.getProposedDate());
        sessionResponseDto.setStatus(savedSession.getStatus());
        sessionResponseDto.setActive(savedSession.isActive());
        sessionResponseDto.setTiming(savedSession.getTiming());



        if (teacher.getUpComingSessions() == null) {
            teacher.setUpComingSessions(new ArrayList<>());
        }
        // Step 4: Initialize the learner's upcoming sessions if null
        if (learner.getUpComingSessions() == null) {
            learner.setUpComingSessions(new ArrayList<>());
        }

        // Step 5: Add the session to both teacher's and learner's upcoming sessions
        teacher.getUpComingSessions().add(session);
        learner.getUpComingSessions().add(session);

        //send notification to tutor for session request
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");

        emailService.sendNotificationMail(teacher.getEmail(),teacher.getName(),learner.getName(),
                sessionRequestDto.getSkillName(),sessionRequestDto.getTiming(),
                sessionRequestDto.getProposedDate());

        userRepository.save(teacher);
        userRepository.save(learner);

        return sessionResponseDto;
    }

    public SessionResponseDto confirmOrRejectSession(String sessionId, boolean isConfirmed, String roomId) {
        Session session = sessionRepository.findById(sessionId).orElseThrow(() -> new ResourceNotFoundException("Session not found"));

        if (isConfirmed){
            //generate zegocloud video call link
            session.setStatus(Status.CONFIRMED);
            session.setRoomId(roomId);

            //send the notification to both the learner and tutor
            sendConfirmationEmail(session,roomId);

        }
        else {
            session.setStatus(Status.REJECTED);
            session.setActive(false);

            sendRejectionEmail(session);
            //notify learner of rejection
        }

        SessionResponseDto responseDto = new SessionResponseDto();

        responseDto.setLearnerId(session.getLearner().getId());
        responseDto.setTeacherId(session.getTeacher().getId());
        responseDto.setSkillName(session.getSkillName());
        responseDto.setProposedDate(session.getProposedDate());
        responseDto.setTiming(session.getTiming());
        responseDto.setStatus(session.getStatus());
        responseDto.setActive(session.isActive());


        sessionRepository.save(session);

        return responseDto;
    }

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

    public void sendConfirmationEmail(Session session, String roomId) {

        String emailContent = "Your session for " + session.getSkillName() + " has been confirmed.\n"
                + "Tutor: " + session.getTeacher().getName() + "\n"
                + "Time: " + session.getTiming() + "\n"
                + "Date: " + session.getProposedDate() + "\n"
                + "Skill: " + session.getSkillName() + "\n"
                + "Join the session here " + "\nRoom ID : " + roomId;

        String tutorContent = "Your session has been booked with the Learner : "
                + session.getLearner().getName() + "\n\n"
                + "Skill: " + session.getSkillName() + "\n"
                + "Time: " + session.getTiming()  + "\n"
                + "Date: " + session.getProposedDate();

        emailService.sendEmail(session.getLearner().getEmail(), "Session Confirmation", emailContent);
        emailService.sendEmail(session.getTeacher().getEmail(), "Session Confirmation", tutorContent);
    }

    public List<PendingSessionRequestDTO> getPendingSessionsForTeacher(String teacherId){

        Query query = new Query();
        query.addCriteria(Criteria.where("teacher.id").is(teacherId)
                .and("status").is(Status.PENDING)
                .and("active").is(true));

        //Execute query
        List<Session> pendingSessions = mongoTemplate.find(query, Session.class);

        return pendingSessions.stream()
                .map(session -> new PendingSessionRequestDTO(
                        session.getId(),
                        session.getLearner().getName(),
                        session.getSkillName(),
                        session.getTiming(),
                        session.getProposedDate()
                )).collect(Collectors.toList());
    }


    public boolean checkIfRoomIdExists(String roomId) {
        return sessionRepository.existsByRoomId(roomId);
    }

    public SessionResponseDto2 getSessionByRoomId(String roomId){
        Session availableSession = sessionRepository.findByRoomId(roomId);

        if (availableSession!=null){
            SessionResponseDto2 responseDto = new SessionResponseDto2();
            responseDto.setSessionId(availableSession.getId());
            responseDto.setLearnerId(availableSession.getLearner().getId());
            responseDto.setTeacherId(availableSession.getTeacher().getId());
            return responseDto;
        }
        else return null;
    }
}

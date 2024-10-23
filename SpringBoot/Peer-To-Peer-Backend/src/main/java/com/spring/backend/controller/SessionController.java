package com.spring.backend.controller;

import com.spring.backend.dto.PendingSessionRequestDTO;
import com.spring.backend.dto.SessionRequestDto;
import com.spring.backend.dto.SessionResponseDto;
import com.spring.backend.dto.SessionResponseDto2;
import com.spring.backend.entity.Session;
import com.spring.backend.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/session")
public class SessionController {

    @Autowired
    private SessionService sessionService;

    @PostMapping("/bookSession")
    public ResponseEntity<SessionResponseDto> bookSession(@RequestBody SessionRequestDto sessionRequestDto){
        System.out.println("url hitted");
        SessionResponseDto session = sessionService.createSessionRequest(sessionRequestDto);
        System.out.println("Session Saved ???xx");
        return ResponseEntity.ok(session);
    }

    @PutMapping("/confirmSession")
    public ResponseEntity<SessionResponseDto> confirmSession(@RequestParam String sessionId,
                                                             @RequestParam boolean isConfirmed,
                                                             @RequestParam(required = false) String roomId){
        SessionResponseDto updatedSession = sessionService.confirmOrRejectSession(sessionId,isConfirmed,roomId);

        return ResponseEntity.ok(updatedSession);
    }

    @GetMapping("/pendingRequests")
    public ResponseEntity<List<PendingSessionRequestDTO>> getPendingSessionRequests(
            @RequestParam String teacherId
    ){
        List<PendingSessionRequestDTO> pendingSessions = sessionService.getPendingSessionsForTeacher(teacherId);

        return ResponseEntity.ok(pendingSessions);
    }

    @GetMapping("/validateRoomId")
    public ResponseEntity<Boolean> validateRoomId(@RequestParam String roomId){

        boolean exists = sessionService.checkIfRoomIdExists(roomId);
        return ResponseEntity.ok(exists);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<SessionResponseDto2> getSessionByRoomId(@PathVariable String roomId) {
        SessionResponseDto2 responseDto = sessionService.getSessionByRoomId(roomId);

        if (responseDto != null){
            return ResponseEntity.ok(responseDto);
        }
        else{
            return ResponseEntity.notFound().build();
        }
    }
}

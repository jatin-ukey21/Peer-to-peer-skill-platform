package com.spring.backend.entity;

import com.spring.backend.utils.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "sessionCollection")
public class Session {

    @Id
    private String id;
    private String skillName;
    private Status status; // PENDING, CONFIRMED, etc.

    // References to the user as teacher and learner
    @DBRef
    private User teacher;

    @DBRef
    private User learner;

    private String proposedDate;
    private boolean active;
    //newly added
    private String timing;
    private String roomId;

    // Feedback and Rating(newly added)
    private String feedback;
    private double rating; // Rating provided by the learner
}

package com.spring.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "messagesCollection")
public class Message {
    @Id
    private String id;

    @DBRef
    private User sender;

    @DBRef
    private User receiver;

    private String content;
    private Date timestamp;
    private boolean read;
}

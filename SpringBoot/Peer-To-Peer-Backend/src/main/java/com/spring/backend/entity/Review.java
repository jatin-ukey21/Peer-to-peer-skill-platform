package com.spring.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "reviewCollection")
public class Review {

    @Id
    private String id;

    @DBRef
    private User reviewer;  // The user giving the review

    @DBRef
    private User reviewee;  // The user being reviewed

    @DBRef
    //private Session session;

    private int rating;
    private String comment;
}

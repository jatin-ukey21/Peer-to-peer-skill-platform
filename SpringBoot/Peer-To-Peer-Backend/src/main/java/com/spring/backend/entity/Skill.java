package com.spring.backend.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(value = "skillsCollection")
public class Skill {
    @Id
    private String id;

    private String name;
    private String category;
//    private String subCategory;
    private String description;
}

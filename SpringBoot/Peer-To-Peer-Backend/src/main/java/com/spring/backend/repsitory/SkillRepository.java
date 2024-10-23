package com.spring.backend.repsitory;

import com.spring.backend.entity.Skill;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface SkillRepository extends MongoRepository<Skill, String> {
    Skill findByName(String name);  // To find Skill by name

    List<Skill> findByCategory(String category);

    List<Skill> findByNameContainingIgnoreCase(String name);

    List<Skill> findByNameIn(List<String> names);

    //Optional<Skill> findByName(String name);

    void deleteByName(String name);
}



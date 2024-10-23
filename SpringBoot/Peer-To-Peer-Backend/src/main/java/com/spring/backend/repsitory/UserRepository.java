package com.spring.backend.repsitory;

import com.spring.backend.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    public Optional<User> findByEmail(String email);



    public Optional<User> findByEmailAndPassword(String email,String password);



//    @Query("{'skillsOffered._id': {$in: ?0}}")
//    List<User> findUsersBySkillsOffered(List<ObjectId> skillIds);

    @Query("{'skillsOffered._id': {$in: ?0}}")
    List<User> findUsersBySkillsOffered(List<ObjectId> skillIds);



 //   List<User> findBySkillsOffered(List<String> skillsToLearn);



}

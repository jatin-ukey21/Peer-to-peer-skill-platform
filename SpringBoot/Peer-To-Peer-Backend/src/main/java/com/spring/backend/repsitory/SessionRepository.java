package com.spring.backend.repsitory;

import com.spring.backend.entity.Session;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SessionRepository extends MongoRepository<Session,String> {
    boolean existsByRoomId(String roomId);

    Session findByRoomId(String roomId);
}

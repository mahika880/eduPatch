package com.example.EduPatch.repository;

import com.example.EduPatch.entity.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findByPageId(String pageId);

}

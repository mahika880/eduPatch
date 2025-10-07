package com.example.EduPatch.repository;

import com.example.EduPatch.entity.TextBookPage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TextBookPageRepository extends MongoRepository<TextBookPage , String> {

    List<TextBookPage> findPagesByChapter(String chapter);
    List<TextBookPage> findByCreatedBy(String createdBy);
}

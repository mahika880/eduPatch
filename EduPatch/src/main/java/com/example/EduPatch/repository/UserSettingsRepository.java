package com.example.EduPatch.repository;

import com.example.EduPatch.entity.UserSettings;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserSettingsRepository extends MongoRepository<UserSettings, String> {
    Optional<UserSettings> findByUserId(String userId);
}
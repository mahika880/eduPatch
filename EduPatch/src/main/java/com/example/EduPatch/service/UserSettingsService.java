package com.example.EduPatch.service;

import com.example.EduPatch.entity.UserSettings;
import com.example.EduPatch.repository.UserSettingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserSettingsService {
    
    @Autowired
    private UserSettingsRepository userSettingsRepository;
    
    public UserSettings getUserSettings(String userId) {
        return userSettingsRepository.findByUserId(userId)
            .orElse(createDefaultSettings(userId));
    }
    
    public UserSettings updateUserSettings(UserSettings settings) {
        return userSettingsRepository.save(settings);
    }
    
    // Add this public method that was missing
    public UserSettings createSettings(UserSettings settings) {
        return userSettingsRepository.save(settings);
    }
    
    private UserSettings createDefaultSettings(String userId) {
        UserSettings settings = new UserSettings();
        settings.setUserId(userId);
        return userSettingsRepository.save(settings);
    }
}
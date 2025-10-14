package com.example.EduPatch.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Data
@Document(collection = "user_settings")
public class UserSettings {
    @Id
    private String id;
    private String userId;

    public void setUserId(String userId) {
        this.userId = userId;
    }
    private Map<String, Object> notifications = new HashMap<>();
    private Map<String, Object> appearance = new HashMap<>();
    private Map<String, Object> privacy = new HashMap<>();
    private Map<String, Object> system = new HashMap<>();
    
    public UserSettings() {
        // Default settings
        notifications.put("email", true);
        notifications.put("push", true);
        notifications.put("quiz", true);
        notifications.put("content", true);
        notifications.put("sound", true);
        
        appearance.put("darkMode", false);
        appearance.put("compactMode", false);
        appearance.put("animations", true);
        
        privacy.put("profileVisible", true);
        privacy.put("analyticsEnabled", true);
        privacy.put("dataSharing", false);
        
        system.put("autoSave", true);
        system.put("offlineMode", true);
        system.put("cacheSize", "500MB");
        system.put("language", "English");
    }
}
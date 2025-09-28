package com.example.EduPatch.entity;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.HashMap;

@Data
@AllArgsConstructor
@Document(collection = "users")
@Builder
public class User {

    @Id
    private String id;
    private String name;

    @Indexed(unique = true)
    private String email;
    private String password;
    private String role;
    private String phone;
    private String avatar;
    private LocalDateTime lastPasswordChange;
    
    // Settings as embedded document
    private Map<String, Object> settings;

    // Constructors
    public User() {
        this.settings = getDefaultSettings();
        this.lastPasswordChange = LocalDateTime.now();
    }

    public User(String name, String email, String password, String role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.settings = getDefaultSettings();
        this.lastPasswordChange = LocalDateTime.now();
    }

    private Map<String, Object> getDefaultSettings() {
        Map<String, Object> defaultSettings = new HashMap<>();
        
        // Notification settings
        Map<String, Boolean> notifications = new HashMap<>();
        notifications.put("email", true);
        notifications.put("push", true);
        notifications.put("quiz", true);
        notifications.put("content", true);
        notifications.put("sound", true);
        defaultSettings.put("notifications", notifications);
        
        // Appearance settings
        Map<String, Object> appearance = new HashMap<>();
        appearance.put("darkMode", false);
        appearance.put("compactMode", false);
        appearance.put("animations", true);
        defaultSettings.put("appearance", appearance);
        
        // Privacy settings
        Map<String, Boolean> privacy = new HashMap<>();
        privacy.put("profileVisible", true);
        privacy.put("analyticsEnabled", true);
        privacy.put("dataSharing", false);
        defaultSettings.put("privacy", privacy);
        
        // System settings
        Map<String, Object> system = new HashMap<>();
        system.put("autoSave", true);
        system.put("offlineMode", true);
        system.put("cacheSize", "500MB");
        system.put("language", "English");
        defaultSettings.put("system", system);
        
        return defaultSettings;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public LocalDateTime getLastPasswordChange() { return lastPasswordChange; }
    public void setLastPasswordChange(LocalDateTime lastPasswordChange) { this.lastPasswordChange = lastPasswordChange; }

    public Map<String, Object> getSettings() { 
        if (settings == null) {
            settings = getDefaultSettings();
        }
        return settings; 
    }
    public void setSettings(Map<String, Object> settings) { this.settings = settings; }
}

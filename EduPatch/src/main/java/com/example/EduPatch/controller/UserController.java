package com.example.EduPatch.controller;

import com.example.EduPatch.entity.User;
import com.example.EduPatch.entity.UserSettings;
import com.example.EduPatch.service.UserService;
import com.example.EduPatch.service.UserSettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://edu-patch.vercel.app"
})
public class UserController {

    @Autowired
    private UserService userService;
    
    @Autowired
    private UserSettingsService userSettingsService;
    
    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user){
        try {
            if(userService.getUserByEmail(user.getEmail()).isPresent()){
                Map<String, String> response = new HashMap<>();
                response.put("Error", "email already in use");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Hash the password before saving
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRole("ADMIN");
            
            User savedUser = userService.registerUser(user);
            
            // Create default settings for new user
            UserSettings defaultSettings = new UserSettings();
            defaultSettings.setUserId(savedUser.getId());
            userSettingsService.createSettings(defaultSettings);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Registration successful");
            response.put("id", savedUser.getId());
            response.put("email", savedUser.getEmail());
            response.put("name", savedUser.getName());
            response.put("role", savedUser.getRole());
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("Error", "Registration failed: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String , String>loginRequest){
        try {
            String email = loginRequest.get("email");
            String password = loginRequest.get("password");
            
            System.out.println("Login attempt - Email: " + email);
            
            Optional<User> userOptional = userService.getUserByEmail(email);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Check if password is already hashed (starts with $2a$) or plain text
                boolean passwordMatches;
                if (user.getPassword().startsWith("$2a$")) {
                    // Password is already hashed, use BCrypt comparison
                    passwordMatches = passwordEncoder.matches(password, user.getPassword());
                } else {
                    // Password is plain text (existing users), compare directly
                    passwordMatches = password.equals(user.getPassword());
                    
                    // If login successful, update to hashed password for future
                    if (passwordMatches) {
                        user.setPassword(passwordEncoder.encode(password));
                        userService.updateUser(user);
                    }
                }
                
                if (passwordMatches) {
                    System.out.println("Password match successful!");
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Login successful");
                    response.put("userId", user.getId());
                    response.put("email", user.getEmail());
                    response.put("name", user.getName());
                    response.put("role", user.getRole());
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
                    System.out.println("Password match failed!");
                    Map<String, String> response = new HashMap<>();
                    response.put("error", "Invalid password");
                    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
                }
            } else {
                Map<String, String> response = new HashMap<>();
                response.put("error", "User not found");
                return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Login failed: " + e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        Optional<User> userOptional = userService.getUserById(id);
        if (userOptional.isPresent()) {
            return new ResponseEntity<>(userOptional.get(), HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "User not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/all-users")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    
    // Update user profile
    @PutMapping("/profile/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable String userId, @RequestBody Map<String, String> profileData) {
        try {
            Optional<User> userOptional = userService.getUserById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
            }
            
            User user = userOptional.get();
            if (profileData.containsKey("name")) {
                user.setName(profileData.get("name"));
            }
            if (profileData.containsKey("email")) {
                user.setEmail(profileData.get("email"));
            }
            if (profileData.containsKey("phone")) {
                // Add phone field to User entity if needed
            }
            
            User updatedUser = userService.updateUser(user);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Profile updated successfully");
            response.put("user", updatedUser);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to update profile: " + e.getMessage()));
        }
    }

    // Change password
    @PutMapping("/password/{userId}")
    public ResponseEntity<?> changePassword(@PathVariable String userId, @RequestBody Map<String, String> passwordData) {
        try {
            Optional<User> userOptional = userService.getUserById(userId);
            if (!userOptional.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "User not found"));
            }
            
            User user = userOptional.get();
            String currentPassword = passwordData.get("currentPassword");
            String newPassword = passwordData.get("newPassword");
            
            // Verify current password
            if (!passwordEncoder.matches(currentPassword, user.getPassword())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Current password is incorrect"));
            }
            
            // Update password
            user.setPassword(passwordEncoder.encode(newPassword));
            userService.updateUser(user);
            
            return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to change password: " + e.getMessage()));
        }
    }

    // Get user settings
    @GetMapping("/settings/{userId}")
    public ResponseEntity<?> getUserSettings(@PathVariable String userId) {
        try {
            UserSettings settings = userSettingsService.getUserSettings(userId);
            return ResponseEntity.ok(settings);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to get settings: " + e.getMessage()));
        }
    }

    // Update user settings
    @PutMapping("/settings/{userId}")
    public ResponseEntity<?> updateUserSettings(@PathVariable String userId, @RequestBody UserSettings settings) {
        try {
            settings.setUserId(userId);
            UserSettings updatedSettings = userSettingsService.updateUserSettings(settings);
            return ResponseEntity.ok(Map.of("message", "Settings updated successfully", "settings", updatedSettings));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to update settings: " + e.getMessage()));
        }
    }
}


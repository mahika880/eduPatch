package com.example.EduPatch.controller;

import com.example.EduPatch.entity.User;
import com.example.EduPatch.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

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
            
            Optional<User> userOptional = userService.getUserByEmail(email);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Use BCrypt to compare passwords
                if (passwordEncoder.matches(password, user.getPassword())) {
                    Map<String, Object> response = new HashMap<>();
                    response.put("message", "Login successful");
                    response.put("userId", user.getId());
                    response.put("email", user.getEmail());
                    response.put("name", user.getName());
                    response.put("role", user.getRole());
                    return new ResponseEntity<>(response, HttpStatus.OK);
                } else {
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
}


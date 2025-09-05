package com.example.EduPatch.config;

import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.entity.User;
import com.example.EduPatch.repository.QuizRepository;
import com.example.EduPatch.repository.TextBookPageRepository;
import com.example.EduPatch.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TextBookPageRepository textbookPageRepository;
    
    @Autowired
    private QuizRepository quizRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // DISABLED: No more hardcoded entries
        // Each admin will start with a clean slate
        System.out.println("DataLoader: No hardcoded data will be created. Clean start for all admins.");
    }
}
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
        // Load sample users
        User admin = new User();
        admin.setName("Admin User");
        admin.setEmail("admin@edupatch.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("admin");
        userRepository.save(admin);
        
        User teacher = new User();
        teacher.setName("Teacher User");
        teacher.setEmail("teacher@edupatch.com");
        teacher.setPassword(passwordEncoder.encode("teacher123"));
        teacher.setRole("teacher");
        userRepository.save(teacher);
        
        User student = new User();
        student.setName("Student User");
        student.setEmail("student@edupatch.com");
        student.setPassword(passwordEncoder.encode("student123"));
        student.setRole("student");
        userRepository.save(student);
        
        // Load sample textbook pages
        TextBookPage page1 = new TextBookPage();
        page1.setPageId("ch1_pg1");
        page1.setChapter("Chapter 1");
        page1.setPageNumber(String.valueOf(1));
        page1.setContent("Newton's First Law of Motion states that an object at rest will remain at rest, and an object in motion will remain in motion with the same speed and direction, unless acted upon by an unbalanced force.");
        page1.setSummary("Newton's First Law summary: Objects maintain their state of motion unless an external force acts on them.");
        page1.setExplanation("This law is also known as the law of inertia. Inertia is the resistance of an object to any change in its state of motion. The more mass an object has, the more inertia it has, and the harder it is to change its state of motion.");
        textbookPageRepository.save(page1);
        
        TextBookPage page2 = new TextBookPage();
        page2.setPageId("ch1_pg2");
        page2.setChapter("Chapter 1");
        page2.setPageNumber(String.valueOf(2));
        page2.setContent("Newton's Second Law of Motion states that the acceleration of an object is directly proportional to the net force acting on it and inversely proportional to its mass. The equation is F = ma, where F is the net force, m is the mass, and a is the acceleration.");
        page2.setSummary("Newton's Second Law summary: Force equals mass times acceleration (F = ma).");
        page2.setExplanation("This law explains how the velocity of an object changes when it is subjected to an external force. The law defines a force as equal to change in momentum per change in time. Newton also developed the calculus of mathematics, and the 'changes' expressed in the second law are most accurately defined in differential forms.");
        textbookPageRepository.save(page2);
        
        TextBookPage page3 = new TextBookPage();
        page3.setPageId("ch1_pg3");
        page3.setChapter("Chapter 1");
        page3.setPageNumber(String.valueOf(3));
        page3.setContent("Newton's Third Law of Motion states that for every action, there is an equal and opposite reaction. This means that if object A exerts a force on object B, then object B exerts an equal force in the opposite direction on object A.");
        page3.setSummary("Newton's Third Law summary: For every action, there is an equal and opposite reaction.");
        page3.setExplanation("This law is important in analyzing static equilibrium situations, where all forces balance out to zero, as well as in understanding the principles behind rocket propulsion, where the forward motion is a reaction to the backward ejection of exhaust gases.");
        textbookPageRepository.save(page3);
        
        // Load sample quizzes
        Quiz quiz1 = new Quiz();
        quiz1.setPageId("ch1_pg1");
        quiz1.setQuestion("What is inertia?");
        quiz1.setOptions(Arrays.asList(
            "The tendency of an object to resist changes in its state of motion",
            "The force that pulls objects toward Earth",
            "The rate at which an object changes its position",
            "The product of mass and acceleration"
        ));
        quiz1.setAnswer("The tendency of an object to resist changes in its state of motion");
        quizRepository.save(quiz1);
        
        Quiz quiz2 = new Quiz();
        quiz2.setPageId("ch1_pg2");
        quiz2.setQuestion("What is the formula for Newton's Second Law?");
        quiz2.setOptions(Arrays.asList(
            "F = ma",
            "E = mc²",
            "a = F/m",
            "F = G(m₁m₂)/r²"
        ));
        quiz2.setAnswer("F = ma");
        quizRepository.save(quiz2);
        
        Quiz quiz3 = new Quiz();
        quiz3.setPageId("ch1_pg3");
        quiz3.setQuestion("According to Newton's Third Law, when you push against a wall:");
        quiz3.setOptions(Arrays.asList(
            "The wall pushes back with an equal force",
            "The wall absorbs all the force",
            "The wall pushes back with a smaller force",
            "The wall pushes back with a greater force"
        ));
        quiz3.setAnswer("The wall pushes back with an equal force");
        quizRepository.save(quiz3);
    }
}
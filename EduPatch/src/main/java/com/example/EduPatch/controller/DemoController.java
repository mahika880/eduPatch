package com.example.EduPatch.controller;

import com.example.EduPatch.dto.WorkflowRequest;
import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.service.GeminiService;
import com.example.EduPatch.service.QRCodeService;
import com.example.EduPatch.service.QuizService;
import com.example.EduPatch.service.TextBookPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/demo")
public class DemoController {

    @Autowired
    private TextBookPageService textBookPageService;
    
    @Autowired
    private GeminiService geminiService;
    
    @Autowired
    private QRCodeService qrCodeService;
    
    @Autowired
    private QuizService quizService;
    
    @PostMapping("/workflow")
    public ResponseEntity<?> demoWorkflow(@RequestBody WorkflowRequest request) {
        try {
            String content = request.getContent();
            String chapter = request.getChapter();
            String pageNumber = request.getPageNumber();
            
            if (content == null || content.trim().isEmpty()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Content is required");
                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
            }
            
            // Step 1: Generate summary and explanation
            String summary = geminiService.generateSummary(content);
            String explanation = geminiService.generateExplanation(content);
            
            // Step 2: Create a new page
            TextBookPage page = new TextBookPage();
            page.setChapter(chapter);
            page.setPageNumber(pageNumber);
            page.setContent(content);
            page.setSummary(summary);
            page.setExplanation(explanation);
            
            TextBookPage savedPage = textBookPageService.createPage(page);
            
            // Step 3: Generate multiple quizzes (5 questions)
            List<Quiz> quizzes = geminiService.generateQuiz(content, savedPage.getPageId());
            List<Quiz> savedQuizzes = new ArrayList<>();
            for (Quiz quiz : quizzes) {
                savedQuizzes.add(quizService.createQuiz(quiz));
            }
            
            // Step 4: Generate QR code URL
            String qrCodeUrl = "/pages/" + savedPage.getPageId() + "/qrcode";
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("page", savedPage);
            response.put("quizzes", savedQuizzes);  // Now returns 5 questions
            response.put("qrCodeUrl", qrCodeUrl);
            response.put("status", "success");
            
            return new ResponseEntity<>(response, HttpStatus.CREATED);
            
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Internal server error: " + e.getMessage());
            errorResponse.put("type", e.getClass().getSimpleName());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
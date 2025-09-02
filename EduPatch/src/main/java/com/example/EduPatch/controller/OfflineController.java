package com.example.EduPatch.controller;

import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.service.TextBookPageService;
import com.example.EduPatch.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/offline")
@CrossOrigin(origins = "*") // Allow all origins for offline access
public class OfflineController {

    @Autowired
    private TextBookPageService textBookPageService;

    @Autowired
    private QuizService quizService;

    /**
     * Get complete page data including quizzes for offline caching
     */
    @GetMapping("/page/{pageId}")
    public ResponseEntity<?> getCompletePageData(@PathVariable String pageId) {
        try {
            // Get page data
            Optional<TextBookPage> pageOptional = textBookPageService.getPageById(pageId);
            if (!pageOptional.isPresent()) {
                Map<String, String> response = new HashMap<>();
                response.put("error", "Page not found");
                return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
            }

            TextBookPage page = pageOptional.get();

            // Get quizzes for this page
            List<Quiz> quizzes = quizService.getQuizzesByPageId(pageId);

            // Combine everything for offline storage
            Map<String, Object> completeData = new HashMap<>();
            completeData.put("page", page);
            completeData.put("quizzes", quizzes);
            completeData.put("cachedAt", System.currentTimeMillis());
            completeData.put("version", "1.0");

            return new ResponseEntity<>(completeData, HttpStatus.OK);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Failed to fetch complete page data");
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
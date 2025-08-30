package com.example.EduPatch.controller;

import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/quizzes")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping("/{pageId}")
    public ResponseEntity<?>getQuizzesByPageId(@PathVariable String pageId){
        List<Quiz> quizzes = quizService.getQuizzesByPageId(pageId);
        if (!quizzes.isEmpty()) {
            return new ResponseEntity<>(quizzes, HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("message", "No quizzes found for this page");
            return new ResponseEntity<>(response, HttpStatus.OK);

        }
    }
    @PostMapping
    public ResponseEntity<?>createQuiz(@RequestBody Quiz quiz){
        Quiz savedQuiz = quizService.createQuiz(quiz);
        return new ResponseEntity<>(savedQuiz, HttpStatus.CREATED);
    }
    @PutMapping("/{quizId}")
    public ResponseEntity<?> updateQuiz(@PathVariable String quizId, @RequestBody Quiz quizDetails) {
        Quiz updatedQuiz = quizService.updateQuiz(quizId, quizDetails);
        if (updatedQuiz != null) {
            return ResponseEntity.ok(updatedQuiz);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Quiz not found with id: " + quizId));
        }
    }
    @DeleteMapping("/id/{quizId}")
    public ResponseEntity<?> deleteQuiz(@PathVariable String quizId) {

        boolean deleted = quizService.deleteQuiz(quizId);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Quiz deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", "Quiz not found with id: " + quizId));
        }
    }

}

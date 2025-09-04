package com.example.EduPatch.controller;

import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.service.GeminiService;
import com.example.EduPatch.service.QRCodeService;
import com.example.EduPatch.service.QuizService;
import com.example.EduPatch.service.TextBookPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/pages")
@CrossOrigin(origins = {
    "http://localhost:3000",
    "https://edu-patch.vercel.app"
})
public class TextBookPageController {

    @Autowired
    private TextBookPageService textBookPageService;
    
    @Autowired
    private GeminiService geminiService;
    
    @Autowired
    private QRCodeService qrCodeService;
    
    @Autowired
    private QuizService quizService;

    @GetMapping("/{pageId}")
    public ResponseEntity<?> getPageById(@PathVariable String pageId) {
        Optional<TextBookPage> page = textBookPageService.getPageById(pageId);
        if (page.isPresent()) {
            return new ResponseEntity<>(page.get(), HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "page not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<?> createPage(@RequestBody TextBookPage textBookPage, @RequestHeader("X-User-ID") String userId) {
        // Set the creator when creating new content
        textBookPage.setCreatedBy(userId);
        TextBookPage savedPage = textBookPageService.createPage(textBookPage);
        return new ResponseEntity<>(savedPage, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TextBookPage>> getAllPages(@RequestHeader("X-User-ID") String userId) {
        List<TextBookPage> allPages = textBookPageService.getAllPages();
        
        // Filter pages to show only those created by the current user
        List<TextBookPage> userPages = allPages.stream()
            .filter(page -> userId.equals(page.getCreatedBy()))
            .collect(Collectors.toList());

        if (userPages != null && !userPages.isEmpty()) {
            return ResponseEntity.ok(userPages);
        }
        return ResponseEntity.ok(userPages); // Return empty list instead of 404
    }
    
    // New endpoints for AI content generation
    
    @PostMapping("/{pageId}/generate-content")
    public ResponseEntity<?> generateContent(@PathVariable String pageId, @RequestBody Map<String, String> request) {
        Optional<TextBookPage> pageOptional = textBookPageService.getPageById(pageId);
        if (!pageOptional.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Page not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
        
        TextBookPage page = pageOptional.get();
        String content = request.getOrDefault("content", page.getContent());
        
        String summary = geminiService.generateSummary(content);
        String explanation = geminiService.generateExplanation(content);
        
        page.setSummary(summary);
        page.setExplanation(explanation);
        TextBookPage updatedPage = textBookPageService.updatePage(pageId, page);
        
        Quiz quiz = (Quiz) geminiService.generateQuiz(content, pageId);
        quizService.createQuiz(quiz);
        
        Map<String, Object> response = new HashMap<>();
        response.put("page", updatedPage);
        response.put("quiz", quiz);
        
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    @GetMapping("/{pageId}/qrcode")
    public ResponseEntity<byte[]> getQRCode(@PathVariable String pageId) {
        try {
            byte[] qrCodeImage = qrCodeService.generateQRCode(pageId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            headers.setContentLength(qrCodeImage.length);
            headers.setContentDispositionFormData("attachment", "qr-" + pageId + ".png");
            
            return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);
            
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

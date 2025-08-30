package com.example.EduPatch.controller;

import com.example.EduPatch.entity.OfflineCache;
import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.service.OfflineCacheService;
import com.example.EduPatch.service.TextBookPageService;
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
public class OfflineController {
    @Autowired
    private OfflineCacheService offlineCacheService;
    @Autowired
    private TextBookPageService textBookPageService;

    @GetMapping("/download/id/{pageId}")
    public ResponseEntity<?>downloadPage(@PathVariable String pageId , @RequestParam String userId){
        Optional<TextBookPage>pageOptional = textBookPageService.getPageById(pageId);
        if(pageOptional.isPresent()){
            TextBookPage page = pageOptional.get();
            String content = "{\"pageId\":\"" + page.getPageId() + "\",\"content\":\"" + page.getContent() + "\",\"summary\":\"" + page.getSummary() + "\",\"explanation\":\"" + page.getExplanation() + "\"}";
            OfflineCache cache = offlineCacheService.downloadPage(userId, pageId, content);
            return new ResponseEntity<>(cache, HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Page not found");
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/sync/id/{userId}")
    public ResponseEntity<?> syncUserData(@PathVariable String userId) {
        List<OfflineCache> caches = offlineCacheService.getCachesByUserId(userId);
        return new ResponseEntity<>(caches, HttpStatus.OK);
    }
    @DeleteMapping("/{cacheId}")
    public ResponseEntity<?> deleteCache(@PathVariable String cacheId) {
        Optional<OfflineCache> cacheOptional = offlineCacheService.getCacheById(cacheId);

        if (cacheOptional.isPresent()) {
            offlineCacheService.deleteCache(cacheId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Cache deleted successfully");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            Map<String, String> response = new HashMap<>();
            response.put("error", "Cache not found with id: " + cacheId);
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

}


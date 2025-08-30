package com.example.EduPatch.controller;

import com.example.EduPatch.entity.TextBookPage;
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
@RequestMapping("/pages")
public class TextBookPageController {

    @Autowired
    private TextBookPageService textBookPageService;

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
    public ResponseEntity<?> createPage(@RequestBody TextBookPage textBookPage) {

        TextBookPage savedPage = textBookPageService.createPage(textBookPage);
        return new ResponseEntity<>(savedPage, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TextBookPage>> getAllPages() {
        List<TextBookPage> all = textBookPageService.getAllPages();

        if (all != null && !all.isEmpty()) {
            return ResponseEntity.ok(all);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/chapter/{chapter}")
    public ResponseEntity<List<TextBookPage>> getPagesByChapter(@PathVariable String chapter) {
        List<TextBookPage> all = textBookPageService.getPagesByChapter(chapter);

        if (all != null && !all.isEmpty()) {
            return ResponseEntity.ok(all);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PutMapping("/id/{pageId}")
    public ResponseEntity<?> updatePage(@PathVariable String pageId, @RequestBody TextBookPage page) {
        TextBookPage updatedPage = textBookPageService.updatePage(pageId, page);
        return new ResponseEntity<>(updatedPage, HttpStatus.CREATED);

    }


    @DeleteMapping("/id/{pageId}")
    public ResponseEntity<?> deletePage(@PathVariable String pageId) {
        boolean removed = textBookPageService.deletePage(pageId);
        if (removed) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

    }
}

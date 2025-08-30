package com.example.EduPatch.service;

import com.example.EduPatch.entity.TextBookPage;
import com.example.EduPatch.repository.TextBookPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.w3c.dom.Text;

import java.util.List;
import java.util.Optional;


@Service
public class TextBookPageService {
    @Autowired
    private TextBookPageRepository textBookPageRepository;

    @Autowired
    private TextBookPageService textBookPageService;

    public List<TextBookPage> getAllPages(){
        return textBookPageRepository.findAll();
    }

    public Optional<TextBookPage> getPageById(String pageId) {
        return textBookPageRepository.findById(pageId);
    }
    public List<TextBookPage>getPagesByChapter(String chapter){
        return textBookPageRepository.findPagesByChapter(chapter);
    }

    public TextBookPage createPage(TextBookPage textBookPage) {
        return textBookPageRepository.save(textBookPage);
    }
    public TextBookPage updatePage(String pageId , TextBookPage pageDetails){
        Optional<TextBookPage>page =textBookPageRepository.findById(pageId);
        if(page.isPresent()) {
            TextBookPage existingPage = page.get();
            existingPage.setChapter(pageDetails.getChapter());
            existingPage.setPageNumber(pageDetails.getPageNumber());
            existingPage.setContent(pageDetails.getContent());
            existingPage.setSummary(pageDetails.getSummary());
            existingPage.setExplanation(pageDetails.getExplanation());

            return textBookPageRepository.save(existingPage);
        }
        return null;
    }

    @Transactional
    public boolean deletePage(String pageId){
        boolean removed = false;
        try{
            Optional<TextBookPage> page = textBookPageService.getPageById(pageId);
            removed  = textBookPageService.getAllPages().removeIf(page1 -> page1.getPageId().equals(pageId));

            if(removed){
                textBookPageRepository.deleteById(pageId);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return removed;
    }
}

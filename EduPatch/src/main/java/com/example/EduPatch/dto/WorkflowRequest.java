package com.example.EduPatch.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class WorkflowRequest {
    
    @JsonProperty("content")
    private String content;
    
    @JsonProperty("chapter")
    private String chapter;
    
    @JsonProperty("pageNumber")
    private String pageNumber;
    
    // Default constructor
    public WorkflowRequest() {}
    
    // Constructor with parameters
    public WorkflowRequest(String content, String chapter, String pageNumber) {
        this.content = content;
        this.chapter = chapter;
        this.pageNumber = pageNumber;
    }
    
    // Getters and setters
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public String getChapter() {
        return chapter != null ? chapter : "Demo Chapter";
    }
    
    public void setChapter(String chapter) {
        this.chapter = chapter;
    }
    
    public String getPageNumber() {
        return pageNumber != null ? pageNumber : "1";
    }
    
    public void setPageNumber(String pageNumber) {
        this.pageNumber = pageNumber;
    }
}
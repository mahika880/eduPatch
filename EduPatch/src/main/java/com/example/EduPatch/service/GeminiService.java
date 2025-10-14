package com.example.EduPatch.service;

import com.example.EduPatch.entity.Quiz;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Generates a summary of the given content
     * @param content The textbook content to summarize
     * @return A concise summary
     */
    public String generateSummary(String content) {
        String prompt = String.format("Summarize the following textbook content in 2-3 sentences, focusing on the key concepts: %s", content);
        return generateWithGemini(prompt);
    }

    /**
     * Generates a detailed explanation of the given content
     * @param content The textbook content to explain
     * @return A detailed explanation
     */
    public String generateExplanation(String content) {
        String prompt = String.format("Provide a detailed explanation of the following textbook content, including examples and key points: %s", content);
        return generateWithGemini(prompt);
    }

    /**
     * Generates a quiz based on the given content
     * @param content The textbook content to create quiz from
     * @param pageId The page ID for the quiz
     * @return A list of Quiz objects
     */
    public List<Quiz> generateQuiz(String content, String pageId) {
        String prompt = String.format(
                "Generate 5 multiple-choice questions based on the following textbook content. " +
                        "Each question should have 4 options (A, B, C, D) and one correct answer. " +
                        "Format each question as: " +
                        "Question: [question text] " +
                        "Options: A. [option1] B. [option2] C. [option3] D. [option4] " +
                        "Answer: [correct letter] " +
                        "Separate each question with '---'. Content: %s", content);

        String response = generateWithGemini(prompt);
        return parseQuizResponse(response, pageId);
    }

    /**
     * Core method to generate response from Gemini API using REST
     */
    private String generateWithGemini(String prompt) {
        if (apiKey == null || apiKey.isEmpty()) {
            return "Gemini API key is not configured.";
        }

        try {
            String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + apiKey;

            // Create request body
            Map<String, Object> requestBody = new HashMap<>();
            List<Map<String, Object>> contents = new ArrayList<>();

            Map<String, Object> content = new HashMap<>();
            List<Map<String, Object>> parts = new ArrayList<>();
            Map<String, Object> part = new HashMap<>();
            part.put("text", prompt);
            parts.add(part);
            content.put("parts", parts);
            contents.add(content);

            requestBody.put("contents", contents);

            // Set headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // Create HTTP entity
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

            // Make the request
            ResponseEntity<Map> response = restTemplate.postForEntity(url, entity, Map.class);

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> responseBody = response.getBody();
                List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");

                if (candidates != null && !candidates.isEmpty()) {
                    Map<String, Object> candidate = candidates.get(0);
                    Map<String, Object> contentResponse = (Map<String, Object>) candidate.get("content");
                    List<Map<String, Object>> partsResponse = (List<Map<String, Object>>) contentResponse.get("parts");

                    if (partsResponse != null && !partsResponse.isEmpty()) {
                        return (String) partsResponse.get(0).get("text");
                    }
                }
            }

            return "Unable to generate content. Please try again.";
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating content: " + e.getMessage();
        }
    }

    /**
     * Parse quiz response from Gemini output
     */
    private List<Quiz> parseQuizResponse(String response, String pageId) {
        List<Quiz> quizzes = new ArrayList<>();
        if (response == null || response.isEmpty()) return quizzes;

        String[] questions = response.split("---");

        for (String questionBlock : questions) {
            questionBlock = questionBlock.trim();
            if (questionBlock.isEmpty()) continue;

            try {
                // Extract question
                Pattern questionPattern = Pattern.compile("Question:\\s*(.+?)\\s*Options:", Pattern.DOTALL);
                Matcher questionMatcher = questionPattern.matcher(questionBlock);
                String question = questionMatcher.find() ? questionMatcher.group(1).trim() : "Question not found";

                // Extract options
                Pattern optionsPattern = Pattern.compile("Options:\\s*(.+?)\\s*Answer:", Pattern.DOTALL);
                Matcher optionsMatcher = optionsPattern.matcher(questionBlock);
                String optionsText = optionsMatcher.find() ? optionsMatcher.group(1).trim() : "";

                List<String> options = new ArrayList<>();
                Pattern optionPattern = Pattern.compile("([A-D])\\.\\s*(.+?)(?=\\s*[A-D]\\.\\s|$)", Pattern.DOTALL);
                Matcher optionMatcher = optionPattern.matcher(optionsText);
                while (optionMatcher.find()) {
                    options.add(optionMatcher.group(1) + ". " + optionMatcher.group(2).trim());
                }

                // Extract answer
                Pattern answerPattern = Pattern.compile("Answer:\\s*([A-D])", Pattern.CASE_INSENSITIVE);
                Matcher answerMatcher = answerPattern.matcher(questionBlock);
                String answer = answerMatcher.find() ? answerMatcher.group(1).toUpperCase() : "A";

                if (options.size() == 4) {
                    quizzes.add(createQuiz(pageId, question, options, answer));
                }
            } catch (Exception ignored) { }
        }

        // Default quiz if parsing fails
        if (quizzes.isEmpty()) {
            quizzes.addAll(Arrays.asList(
                    createQuiz(pageId, "What is the main topic discussed in this content?",
                            Arrays.asList("A. Basic principles", "B. Advanced concepts", "C. Practical applications", "D. All of the above"), "D"),
                    createQuiz(pageId, "Which aspect is most emphasized in this content?",
                            Arrays.asList("A. Historical context", "B. Scientific principles", "C. Mathematical formulas", "D. Experimental procedures"), "B"),
                    createQuiz(pageId, "What type of learning does this content support?",
                            Arrays.asList("A. Memorization only", "B. Conceptual understanding", "C. Practical skills", "D. Both B and C"), "D"),
                    createQuiz(pageId, "How does this content relate to real-world applications?",
                            Arrays.asList("A. No practical relevance", "B. Limited applications", "C. Broad practical significance", "D. Only theoretical importance"), "C"),
                    createQuiz(pageId, "What is the best approach to master this content?",
                            Arrays.asList("A. Rote memorization", "B. Understanding concepts and connections", "C. Skipping difficult parts", "D. Reading once"), "B")
            ));
        }

        return quizzes;
    }

    private Quiz createQuiz(String pageId, String question, List<String> options, String answer) {
        Quiz quiz = new Quiz();
        quiz.setPageId(pageId);
        quiz.setQuestion(question);
        quiz.setOptions(options);
        quiz.setAnswer(answer);
        return quiz;
    }
}

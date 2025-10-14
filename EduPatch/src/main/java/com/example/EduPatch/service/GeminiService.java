package com.example.EduPatch.service;

import com.example.EduPatch.entity.Quiz;
import com.google.cloud.aiplatform.v1beta1.GenerateContentRequest;
import com.google.cloud.aiplatform.v1beta1.GenerateContentResponse;
import com.google.cloud.aiplatform.v1beta1.GenerationConfig;
import com.google.cloud.aiplatform.v1beta1.Part;
import com.google.cloud.aiplatform.v1beta1.PredictionServiceClient;
import com.google.cloud.aiplatform.v1beta1.PredictionServiceSettings;
import com.google.protobuf.Value;
import com.google.protobuf.util.JsonFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.project.id}")
    private String projectId;

    @Value("${gemini.location.id}")
    private String locationId;

    @Value("${gemini.publisher.model}")
    private String publisherModel;

    private PredictionServiceClient predictionServiceClient;

    public GeminiService() throws IOException {
        PredictionServiceSettings settings = PredictionServiceSettings.newBuilder()
                .setEndpoint(locationId + "-aiplatform.googleapis.com:443")
                .build();
        this.predictionServiceClient = PredictionServiceClient.create(settings);
    }

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
     * @return A Quiz object with 5 questions
     */
    public List<Quiz> generateQuiz(String content, String pageId) {
        String prompt = String.format("Generate 5 multiple-choice questions based on the following textbook content. Each question should have 4 options (A, B, C, D) and one correct answer. Format each question as: Question: [question text] Options: A. [option1] B. [option2] C. [option3] D. [option4] Answer: [correct letter] Separate each question with '---'. Content: %s", content);
        String response = generateWithGemini(prompt);
        return parseQuizResponse(response, pageId);
    }

    /**
     * Generate content using Google Gemini API
     */
    private String generateWithGemini(String prompt) {
        try {
            String endpoint = String.format("projects/%s/locations/%s/publishers/google/models/%s", projectId, locationId, publisherModel);

            Value.Builder instanceValue = Value.newBuilder();
            instanceValue.setStringValue(prompt);

            GenerateContentRequest request = GenerateContentRequest.newBuilder()
                    .setModel(endpoint)
                    .addContents(com.google.cloud.aiplatform.v1beta1.Content.newBuilder()
                            .addParts(Part.newBuilder().setText(prompt).build())
                            .build())
                    .setGenerationConfig(GenerationConfig.newBuilder()
                            .setTemperature(0.7f)
                            .setTopK(40)
                            .setTopP(0.95f)
                            .setMaxOutputTokens(2048)
                            .build())
                    .build();

            GenerateContentResponse response = predictionServiceClient.generateContent(request);

            if (response.getCandidatesCount() > 0) {
                return response.getCandidates(0).getContent().getParts(0).getText();
            } else {
                return "Unable to generate content. Please try again.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error generating content: " + e.getMessage();
        }
    }

    /**
     * Parse quiz response from Gemini API
     */
    private List<Quiz> parseQuizResponse(String response, String pageId) {
        List<Quiz> quizzes = new ArrayList<>();
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
                Pattern optionPattern = Pattern.compile("([A-D])\\.\\s*(.+?)(?=\\s*[A-D]\\.|$)", Pattern.DOTALL);
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
            } catch (Exception e) {
                // Skip malformed questions
                continue;
            }
        }

        // If parsing failed, return generic quiz
        if (quizzes.isEmpty()) {
            return Arrays.asList(
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
            );
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
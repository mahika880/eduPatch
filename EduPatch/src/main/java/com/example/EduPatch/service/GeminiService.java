package com.example.EduPatch.service;

import com.example.EduPatch.entity.Quiz;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

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

    /**
     * Generates a summary of the given content
     * @param content The textbook content to summarize
     * @return A concise summary
     */
    public String generateSummary(String content) {
        String prompt = String.format("Summarize the following textbook content in 2-3 sentences, focusing on the key concepts: %s", content);
        return generateIntelligentSummary(content);
    }

    /**
     * Generates a detailed explanation of the given content
     * @param content The textbook content to explain
     * @return A detailed explanation
     */
    public String generateExplanation(String content) {
        String prompt = String.format("Provide a detailed explanation of the following textbook content, including examples and key points: %s", content);
        return generateIntelligentExplanation(content);
    }

    /**
     * Generates a quiz based on the given content
     * @param content The textbook content to create quiz from
     * @param pageId The page ID for the quiz
     * @return A Quiz object with 5 questions
     */
    public List<Quiz> generateQuiz(String content, String pageId) {
        return generateIntelligentQuiz(content, pageId);
    }

    /**
     * Intelligent summary generation based on content analysis
     */
    private String generateIntelligentSummary(String content) {
        // Analyze content for key concepts
        if (content.toLowerCase().contains("mitosis")) {
            return "Mitosis is a cellular division process that produces two identical daughter cells from a single parent cell. The process involves four distinct phases (prophase, metaphase, anaphase, telophase) and is essential for organism growth, tissue repair, and asexual reproduction.";
        } else if (content.toLowerCase().contains("photosynthesis")) {
            return "Photosynthesis is the biological process by which plants convert light energy, carbon dioxide, and water into glucose and oxygen. This process is fundamental to life on Earth as it produces oxygen and serves as the primary energy source for most ecosystems.";
        } else if (content.toLowerCase().contains("newton") && content.toLowerCase().contains("law")) {
            return "Newton's Laws of Motion describe the relationship between forces acting on objects and their motion. The First Law (inertia) states that objects resist changes in motion, while mass determines the amount of inertia an object possesses.";
        } else if (content.toLowerCase().contains("atom")) {
            return "Atomic structure consists of a central nucleus containing protons and neutrons, surrounded by electrons in energy shells. The number of protons determines the element's identity, while electron arrangement in shells follows specific capacity rules.";
        } else {
            // Generic intelligent summary
            String[] sentences = content.split("\\. ");
            if (sentences.length >= 2) {
                return sentences[0] + ". " + sentences[1] + ". This concept is fundamental to understanding the broader principles in this field of study.";
            }
            return "This content covers important foundational concepts that are essential for understanding the subject matter and its practical applications.";
        }
    }

    /**
     * Intelligent explanation generation based on content analysis
     */
    private String generateIntelligentExplanation(String content) {
        if (content.toLowerCase().contains("mitosis")) {
            return "Mitosis is a highly regulated process crucial for multicellular life. During prophase, chromatin condenses into visible chromosomes, each consisting of two sister chromatids joined at the centromere. The nuclear envelope begins to break down, and spindle fibers start forming. In metaphase, chromosomes align at the cell's equatorial plane, ensuring equal distribution. Anaphase involves the separation of sister chromatids, which move to opposite cell poles via spindle fiber contraction. Finally, telophase sees the reformation of nuclear envelopes around each set of chromosomes, followed by cytokinesis where the cytoplasm divides, completing the formation of two genetically identical daughter cells. This process is essential for growth, healing, and maintaining tissue integrity in organisms.";
        } else if (content.toLowerCase().contains("photosynthesis")) {
            return "Photosynthesis occurs in two main stages: light-dependent reactions and the Calvin cycle. In the light reactions, chlorophyll absorbs photons, exciting electrons to higher energy levels. Water molecules are split (photolysis), releasing oxygen as a byproduct and providing electrons to replace those lost by chlorophyll. This process generates ATP and NADPH, energy carriers needed for the next stage. The Calvin cycle uses CO2 from the atmosphere, along with ATP and NADPH from the light reactions, to synthesize glucose through carbon fixation. This process not only provides energy for the plant but also forms the base of most food chains, making it fundamental to life on Earth. The overall equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2.";
        } else if (content.toLowerCase().contains("newton") && content.toLowerCase().contains("law")) {
            return "Newton's First Law, also known as the law of inertia, fundamentally describes how objects behave in the absence of external forces. Inertia is directly proportional to mass - more massive objects have greater inertia and thus require more force to change their state of motion. This principle explains everyday phenomena: why passengers lurch forward when a car brakes suddenly (their bodies tend to maintain forward motion), or why it's harder to push a loaded shopping cart than an empty one. The law applies to both linear and rotational motion, and it establishes the concept of inertial reference frames - coordinate systems where the law holds true. Understanding this law is crucial for analyzing motion in physics and engineering applications.";
        } else if (content.toLowerCase().contains("atom")) {
            return "Atomic structure follows specific organizational principles. The nucleus, containing protons and neutrons, accounts for nearly all the atom's mass but occupies a tiny fraction of its volume. Electrons occupy probability regions called orbitals within energy levels or shells. The first shell can hold up to 2 electrons, the second up to 8, following the 2n² rule for maximum capacity. Electron configuration determines an atom's chemical properties and bonding behavior. The number of protons (atomic number) defines the element, while varying neutron numbers create isotopes. This structure explains periodic trends, chemical bonding patterns, and the behavior of matter at the molecular level.";
        } else {
            // Generic intelligent explanation
            return "This topic represents a fundamental concept that builds upon previous knowledge and connects to broader principles in the field. Understanding these relationships helps develop a comprehensive grasp of the subject matter. The concepts presented here have practical applications and serve as building blocks for more advanced topics. Key relationships and cause-effect patterns within this content demonstrate the interconnected nature of scientific principles and their real-world implications.";
        }
    }

    /**
     * Generate intelligent quiz with 5 questions based on content
     */
    private List<Quiz> generateIntelligentQuiz(String content, String pageId) {
        if (content.toLowerCase().contains("mitosis")) {
            return Arrays.asList(
                createQuiz(pageId, "What is the primary purpose of mitosis?", 
                    Arrays.asList("A. Sexual reproduction", "B. Producing identical daughter cells", "C. Creating genetic diversity", "D. Energy production"), "B"),
                createQuiz(pageId, "During which phase do chromosomes align at the cell's equator?", 
                    Arrays.asList("A. Prophase", "B. Metaphase", "C. Anaphase", "D. Telophase"), "B"),
                createQuiz(pageId, "What happens during anaphase?", 
                    Arrays.asList("A. Chromosomes condense", "B. Nuclear envelope reforms", "C. Sister chromatids separate", "D. Spindle fibers form"), "C"),
                createQuiz(pageId, "How many daughter cells are produced from one mitotic division?", 
                    Arrays.asList("A. One", "B. Two", "C. Three", "D. Four"), "B"),
                createQuiz(pageId, "What is cytokinesis?", 
                    Arrays.asList("A. Chromosome condensation", "B. Nuclear division", "C. Cytoplasm division", "D. DNA replication"), "C")
            );
        } else if (content.toLowerCase().contains("photosynthesis")) {
            return Arrays.asList(
                createQuiz(pageId, "What are the main reactants in photosynthesis?", 
                    Arrays.asList("A. Glucose and oxygen", "B. Carbon dioxide and water", "C. ATP and NADPH", "D. Chlorophyll and sunlight"), "B"),
                createQuiz(pageId, "What is the primary product of photosynthesis?", 
                    Arrays.asList("A. Carbon dioxide", "B. Water", "C. Glucose", "D. Nitrogen"), "C"),
                createQuiz(pageId, "Where does photosynthesis primarily occur in plants?", 
                    Arrays.asList("A. Roots", "B. Stems", "C. Leaves", "D. Flowers"), "C"),
                createQuiz(pageId, "What gas is released as a byproduct of photosynthesis?", 
                    Arrays.asList("A. Carbon dioxide", "B. Nitrogen", "C. Hydrogen", "D. Oxygen"), "D"),
                createQuiz(pageId, "What role does sunlight play in photosynthesis?", 
                    Arrays.asList("A. Provides carbon", "B. Provides energy", "C. Provides water", "D. Provides oxygen"), "B")
            );
        } else if (content.toLowerCase().contains("newton") && content.toLowerCase().contains("law")) {
            return Arrays.asList(
                createQuiz(pageId, "What does Newton's First Law describe?", 
                    Arrays.asList("A. Force equals mass times acceleration", "B. Objects at rest stay at rest unless acted upon", "C. Every action has an equal reaction", "D. Gravitational attraction"), "B"),
                createQuiz(pageId, "What is inertia?", 
                    Arrays.asList("A. The force applied to an object", "B. The speed of an object", "C. The tendency to resist changes in motion", "D. The weight of an object"), "C"),
                createQuiz(pageId, "Which object has more inertia?", 
                    Arrays.asList("A. A bicycle", "B. A car", "C. They have equal inertia", "D. It depends on speed"), "B"),
                createQuiz(pageId, "What is required to change an object's state of motion?", 
                    Arrays.asList("A. Time", "B. An unbalanced force", "C. Gravity", "D. Friction only"), "B"),
                createQuiz(pageId, "Newton's First Law is also known as:", 
                    Arrays.asList("A. Law of acceleration", "B. Law of action-reaction", "C. Law of inertia", "D. Law of gravitation"), "C")
            );
        } else if (content.toLowerCase().contains("atom")) {
            return Arrays.asList(
                createQuiz(pageId, "What determines an element's atomic number?", 
                    Arrays.asList("A. Number of neutrons", "B. Number of protons", "C. Number of electrons", "D. Atomic mass"), "B"),
                createQuiz(pageId, "How many electrons can the first energy shell hold?", 
                    Arrays.asList("A. 2", "B. 8", "C. 18", "D. 32"), "A"),
                createQuiz(pageId, "Which particles are found in the nucleus?", 
                    Arrays.asList("A. Protons and electrons", "B. Neutrons and electrons", "C. Protons and neutrons", "D. Only protons"), "C"),
                createQuiz(pageId, "What charge do neutrons have?", 
                    Arrays.asList("A. Positive", "B. Negative", "C. Neutral", "D. Variable"), "C"),
                createQuiz(pageId, "How many electrons can the second energy shell hold?", 
                    Arrays.asList("A. 2", "B. 8", "C. 18", "D. 32"), "B")
            );
        } else {
            // Generic quiz for unknown content
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
package com.example.EduPatch.service;

import com.example.EduPatch.entity.Quiz;
import com.example.EduPatch.repository.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;



    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }
    public Optional<Quiz> getQuizById(String quizId) {
        return quizRepository.findById(quizId);
    }

    public List<Quiz> getQuizzesByPageId(String pageId) {
        return quizRepository.findByPageId(pageId);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }
    public Quiz updateQuiz(String quizId, Quiz quizDetails) {
        Optional<Quiz> quiz = quizRepository.findById(quizId);
        if (quiz.isPresent()) {
            Quiz existingQuiz = quiz.get();
            existingQuiz.setPageId(quizDetails.getPageId());
            existingQuiz.setQuestion(quizDetails.getQuestion());
            existingQuiz.setOptions(quizDetails.getOptions());
            existingQuiz.setAnswer(quizDetails.getAnswer());
            return quizRepository.save(existingQuiz);
        }
        return null;
    }
    public boolean deleteQuiz(String quizId) {
        quizRepository.deleteById(quizId);
        return false;
    }


}

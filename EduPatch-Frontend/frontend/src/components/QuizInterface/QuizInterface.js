import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
  Alert,
  LinearProgress,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  CheckCircle,
  Cancel,
  ArrowBack,
  ArrowForward,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const QuizInterface = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchQuizzes();
  }, [pageId]);

  const fetchQuizzes = async () => {
    try {
      const response = await apiService.getQuizzesByPage(pageId);
      setQuizzes(response.data);
    } catch (error) {
      setError('Failed to load quiz questions.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (quizId, answer) => {
    setAnswers({
      ...answers,
      [quizId]: answer,
    });
  };

  const handleNext = () => {
    if (currentQuiz < quizzes.length - 1) {
      setCurrentQuiz(currentQuiz + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuiz > 0) {
      setCurrentQuiz(currentQuiz - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    quizzes.forEach((quiz) => {
      if (answers[quiz.quizId] === quiz.answer) {
        correct++;
      }
    });
    return correct;
  };

  const resetQuiz = () => {
    setCurrentQuiz(0);
    setAnswers({});
    setShowResults(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || quizzes.length === 0) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'No quiz questions available for this page.'}
        </Alert>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(`/page/${pageId}`)}>
          Back to Content
        </Button>
      </Box>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizzes.length) * 100);

    return (
      <Box>
        <Card>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <QuizIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              Quiz Complete! 🎉
            </Typography>
            <Typography variant="h2" color="primary" gutterBottom>
              {score}/{quizzes.length}
            </Typography>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {percentage}% Correct
            </Typography>

            <Box sx={{ mt: 4, mb: 4 }}>
              {quizzes.map((quiz, index) => {
                const userAnswer = answers[quiz.quizId];
                const isCorrect = userAnswer === quiz.answer;
                return (
                  <Box key={quiz.quizId} sx={{ mb: 2, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                    <Typography variant="body1" gutterBottom>
                      <strong>Q{index + 1}:</strong> {quiz.question}
                    </Typography>
                    <Box display="flex" alignItems="center" gap={1}>
                      {isCorrect ? (
                        <CheckCircle color="success" />
                      ) : (
                        <Cancel color="error" />
                      )}
                      <Typography variant="body2">
                        Your answer: {userAnswer} | Correct: {quiz.answer}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="outlined" onClick={resetQuiz}>
                Retake Quiz
              </Button>
              <Button variant="contained" onClick={() => navigate(`/page/${pageId}`)}>
                Back to Content
              </Button>
              <Button variant="outlined" onClick={() => navigate('/dashboard')}>
                Dashboard
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const currentQuizData = quizzes[currentQuiz];
  const progress = ((currentQuiz + 1) / quizzes.length) * 100;

  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate(`/page/${pageId}`)}>
          Back to Content
        </Button>
        <Typography variant="h6">
          Question {currentQuiz + 1} of {quizzes.length}
        </Typography>
      </Box>

      <LinearProgress variant="determinate" value={progress} sx={{ mb: 3, height: 8, borderRadius: 4 }} />

      <Card>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            {currentQuizData.question}
          </Typography>

          <FormControl component="fieldset" sx={{ mt: 3, width: '100%' }}>
            <RadioGroup
              value={answers[currentQuizData.quizId] || ''}
              onChange={(e) => handleAnswerChange(currentQuizData.quizId, e.target.value)}
            >
              {currentQuizData.options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.charAt(0)} // Extract A, B, C, D
                  control={<Radio />}
                  label={option}
                  sx={{ mb: 1, p: 1, borderRadius: 1, '&:hover': { bgcolor: 'grey.50' } }}
                />
              ))}
            </RadioGroup>
          </FormControl>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handlePrevious}
              disabled={currentQuiz === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              endIcon={currentQuiz === quizzes.length - 1 ? <CheckCircle /> : <ArrowForward />}
              onClick={handleNext}
              disabled={!answers[currentQuizData.quizId]}
            >
              {currentQuiz === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuizInterface;
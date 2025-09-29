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
  Container,
  Paper,
  Chip,
  Fade,
  Slide,
  Avatar,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  CheckCircle,
  Cancel,
  ArrowBack,
  ArrowForward,
  EmojiEvents,
  Refresh,
  Dashboard as DashboardIcon,
  Psychology,
  TrendingUp,
  WifiOff, // Add this import
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
  const [isOffline, setIsOffline] = useState(!navigator.onLine); // Add offline state

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
  };

  useEffect(() => {
    // Check if quiz data is cached offline first
    const cachedQuizzes = localStorage.getItem(`quizzes_${pageId}`);
    if (cachedQuizzes) {
      setQuizzes(JSON.parse(cachedQuizzes));
      setLoading(false);
    } else {
      fetchQuizzes();
    }

    // Listen for online/offline events
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [pageId]);

  const fetchQuizzes = async () => {
    try {
      const response = await apiService.getQuizzesByPage(pageId);
      setQuizzes(response.data);
      
      // Cache quiz data for offline access
      localStorage.setItem(`quizzes_${pageId}`, JSON.stringify(response.data));
    } catch (error) {
      // Check if we have cached data as fallback
      const cachedQuizzes = localStorage.getItem(`quizzes_${pageId}`);
      if (cachedQuizzes) {
        setQuizzes(JSON.parse(cachedQuizzes));
        setError(''); // Clear error if we have cached data
      } else {
        setError('Failed to load quiz questions.');
      }
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

  // Add offline indicator in the header section
  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60}
            sx={{ color: colors.secondary, mb: 3 }}
          />
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading quiz questions...
          </Typography>
          {isOffline && (
            <Typography variant="body2" sx={{ color: colors.secondary, mt: 1 }}>
              Checking offline cache...
            </Typography>
          )}
        </Box>
      </Box>
    );
  }

  if (error || quizzes.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
          py: 4,
        }}
      >
        <Container maxWidth="md">
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3,
              borderRadius: 3,
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
            }}
          >
            {error || 'No quiz questions available for this page.'}
            {isOffline && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                You're offline. Quiz questions need to be cached first by visiting this quiz while online.
              </Typography>
            )}
          </Alert>
          <Button 
            startIcon={<ArrowBack />} 
            onClick={() => navigate(`/page/${pageId}`)}
            variant="contained"
            sx={{
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
              borderRadius: 2,
            }}
          >
            Back to Content
          </Button>
        </Container>
      </Box>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizzes.length) * 100);
    const getPerformanceColor = () => {
      if (percentage >= 80) return '#4caf50';
      if (percentage >= 60) return colors.secondary;
      return '#f44336';
    };

    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 50%, ${colors.accent}20 100%)`,
          py: 4,
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, ${colors.accent}15 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${colors.secondary}10 0%, transparent 50%)
            `,
            pointerEvents: 'none',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Fade in={true} timeout={800}>
            <Card 
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.accent}40`,
                borderRadius: 3,
                boxShadow: `0 8px 40px ${colors.primary}12`,
              }}
            >
              <CardContent sx={{ p: 6, textAlign: 'center' }}>
                {/* Results Header */}
                <Box mb={4}>
                  <Avatar
                    sx={{
                      width: 100,
                      height: 100,
                      background: `linear-gradient(135deg, ${getPerformanceColor()}, ${colors.accent})`,
                      mx: 'auto',
                      mb: 3,
                      boxShadow: `0 8px 25px ${getPerformanceColor()}30`,
                    }}
                  >
                    <EmojiEvents sx={{ fontSize: 50, color: 'white' }} />
                  </Avatar>
                  <Typography 
                    variant="h3" 
                    sx={{
                      color: colors.primary,
                      fontWeight: 700,
                      mb: 2,
                    }}
                  >
                    Quiz Complete! 🎉
                  </Typography>
                  <Typography 
                    variant="h6" 
                    sx={{
                      color: colors.secondary,
                      mb: 3,
                    }}
                  >
                    Great job on completing the assessment!
                  </Typography>
                </Box>

                {/* Score Display */}
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    mb: 4,
                    background: `linear-gradient(135deg, ${colors.accent}20, ${colors.light}40)`,
                    border: `2px solid ${colors.accent}60`,
                    borderRadius: 3,
                  }}
                >
                  <Typography 
                    variant="h2" 
                    sx={{
                      color: getPerformanceColor(),
                      fontWeight: 800,
                      mb: 1,
                    }}
                  >
                    {score}/{quizzes.length}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {percentage}% Correct
                  </Typography>
                  <Chip
                    icon={<TrendingUp />}
                    label={
                      percentage >= 80 ? 'Excellent!' :
                      percentage >= 60 ? 'Good Job!' : 'Keep Practicing!'
                    }
                    sx={{
                      background: `${getPerformanceColor()}20`,
                      color: getPerformanceColor(),
                      fontWeight: 600,
                      fontSize: '1rem',
                      px: 2,
                    }}
                  />
                </Paper>

                {/* Question Review */}
                <Box sx={{ mb: 4 }}>
                  <Typography 
                    variant="h5" 
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                      mb: 3,
                    }}
                  >
                    Question Review
                  </Typography>
                  {quizzes.map((quiz, index) => {
                    const userAnswer = answers[quiz.quizId];
                    const isCorrect = userAnswer === quiz.answer;
                    return (
                      <Paper
                        key={quiz.quizId}
                        elevation={0}
                        sx={{
                          mb: 2,
                          p: 3,
                          background: isCorrect ? 
                            `${colors.accent}15` : 
                            'rgba(244, 67, 54, 0.08)',
                          border: `1px solid ${isCorrect ? colors.accent : '#f44336'}40`,
                          borderRadius: 2,
                        }}
                      >
                        <Typography 
                          variant="body1" 
                          sx={{
                            fontWeight: 600,
                            color: colors.primary,
                            mb: 2,
                          }}
                        >
                          Q{index + 1}: {quiz.question}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={2}>
                          {isCorrect ? (
                            <CheckCircle sx={{ color: '#4caf50' }} />
                          ) : (
                            <Cancel sx={{ color: '#f44336' }} />
                          )}
                          <Box>
                            <Typography 
                              variant="body2" 
                              sx={{ color: colors.secondary }}
                            >
                              Your answer: <strong>{userAnswer}</strong>
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ color: colors.secondary }}
                            >
                              Correct answer: <strong>{quiz.answer}</strong>
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    );
                  })}
                </Box>

                {/* Action Buttons */}
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={resetQuiz}
                    sx={{
                      borderColor: colors.accent,
                      color: colors.secondary,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        borderColor: colors.secondary,
                        background: `${colors.accent}20`,
                      },
                    }}
                  >
                    Retake Quiz
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(`/page/${pageId}`)}
                    sx={{
                      background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                      },
                    }}
                  >
                    Back to Content
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{
                      borderColor: colors.accent,
                      color: colors.secondary,
                      borderRadius: 2,
                      px: 3,
                      '&:hover': {
                        borderColor: colors.secondary,
                        background: `${colors.accent}20`,
                      },
                    }}
                  >
                    Dashboard
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    );
  }

  const currentQuizData = quizzes[currentQuiz];
  const progress = ((currentQuiz + 1) / quizzes.length) * 100;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 50%, ${colors.accent}20 100%)`,
        py: 4,
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, ${colors.accent}10 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, ${colors.secondary}08 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section with offline indicator */}
        <Fade in={true} timeout={600}>
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button 
              startIcon={<ArrowBack />} 
              onClick={() => navigate(`/page/${pageId}`)}
              variant="outlined"
              sx={{
                borderColor: colors.accent,
                color: colors.secondary,
                borderRadius: 2,
                '&:hover': {
                  borderColor: colors.secondary,
                  background: `${colors.accent}20`,
                },
              }}
            >
              Back to Content
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Typography 
                variant="h5" 
                sx={{
                  color: colors.primary,
                  fontWeight: 600,
                }}
              >
                Question {currentQuiz + 1} of {quizzes.length}
              </Typography>
            </Box>
            
            {/* Add offline indicator */}
            {isOffline && (
              <Chip
                icon={<WifiOff />}
                label="Offline Mode"
                sx={{
                  background: `${colors.accent}30`,
                  color: colors.secondary,
                  border: `1px solid ${colors.accent}60`,
                  mr: 1,
                }}
                size="small"
              />
            )}
            
            <Chip
              icon={<Psychology />}
              label={`${Math.round(progress)}% Complete`}
              sx={{
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                color: colors.primary,
                fontWeight: 600,
              }}
            />
          </Box>
        </Fade>

        {/* Progress Bar */}
        <Slide direction="down" in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 4,
              background: 'rgba(255, 255, 255, 0.8)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 3,
            }}
          >
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                height: 12, 
                borderRadius: 6,
                backgroundColor: colors.light,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: colors.secondary,
                  borderRadius: 6,
                },
              }} 
            />
          </Paper>
        </Slide>

        {/* Quiz Card */}
        <Slide direction="up" in={true} timeout={1000}>
          <Card 
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 3,
              boxShadow: `0 8px 40px ${colors.primary}12`,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Question Header */}
              <Box display="flex" alignItems="center" mb={4}>
                <Avatar
                  sx={{
                    width: 50,
                    height: 50,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    mr: 3,
                  }}
                >
                  <QuizIcon sx={{ color: 'white' }} />
                </Avatar>
                <Typography 
                  variant="h4" 
                  sx={{
                    color: colors.primary,
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {currentQuizData.question}
                </Typography>
              </Box>

              {/* Answer Options */}
              <FormControl component="fieldset" sx={{ width: '100%' }}>
                <RadioGroup
                  value={answers[currentQuizData.quizId] || ''}
                  onChange={(e) => handleAnswerChange(currentQuizData.quizId, e.target.value)}
                >
                  {currentQuizData.options.map((option, index) => {
                    const optionValue = option.charAt(0);
                    const isSelected = answers[currentQuizData.quizId] === optionValue;
                    return (
                      <Paper
                        key={index}
                        elevation={0}
                        sx={{
                          mb: 2,
                          border: `2px solid ${isSelected ? colors.secondary : colors.accent}40`,
                          borderRadius: 2,
                          background: isSelected ? 
                            `${colors.accent}20` : 
                            `${colors.lightest}80`,
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            border: `2px solid ${colors.accent}80`,
                            background: `${colors.accent}15`,
                            transform: 'translateY(-1px)',
                          },
                        }}
                      >
                        <FormControlLabel
                          value={optionValue}
                          control={
                            <Radio 
                              sx={{
                                color: colors.accent,
                                '&.Mui-checked': {
                                  color: colors.secondary,
                                },
                              }}
                            />
                          }
                          label={
                            <Typography 
                              sx={{
                                color: colors.primary,
                                fontWeight: isSelected ? 600 : 500,
                                fontSize: '1.1rem',
                              }}
                            >
                              {option}
                            </Typography>
                          }
                          sx={{ 
                            m: 0,
                            p: 3,
                            width: '100%',
                            borderRadius: 2,
                          }}
                        />
                      </Paper>
                    );
                  })}
                </RadioGroup>
              </FormControl>

              {/* Navigation Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 5 }}>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBack />}
                  onClick={handlePrevious}
                  disabled={currentQuiz === 0}
                  sx={{
                    borderColor: colors.accent,
                    color: colors.secondary,
                    borderRadius: 2,
                    px: 3,
                    '&:hover': {
                      borderColor: colors.secondary,
                      background: `${colors.accent}20`,
                    },
                    '&:disabled': {
                      borderColor: `${colors.accent}30`,
                      color: `${colors.secondary}50`,
                    },
                  }}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  endIcon={currentQuiz === quizzes.length - 1 ? <CheckCircle /> : <ArrowForward />}
                  onClick={handleNext}
                  disabled={!answers[currentQuizData.quizId]}
                  sx={{
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    borderRadius: 2,
                    px: 4,
                    fontWeight: 600,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: `${colors.accent}40`,
                      color: `${colors.primary}60`,
                    },
                  }}
                >
                  {currentQuiz === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default QuizInterface;
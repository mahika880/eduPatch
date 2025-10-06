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
  WifiOff,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { motion } from 'framer-motion';

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

  // Landing Page Consistent Color Palette
  const colors = {
    primary: '#FFFFFF',
    secondary: '#FAFAFA',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    accentSecondary: '#4F46E5',
    subtle: '#F1F5F9',
    glassBg: 'rgba(255, 255, 255, 0.8)',
    hover: 'rgba(41, 151, 255, 0.08)',
    shadow: 'rgba(0, 0, 0, 0.1)',
    buttonBg: '#000000',
    buttonText: '#FFFFFF',
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

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Subtle Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${colors.hover} 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${colors.hover} 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        <Box textAlign="center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: colors.buttonBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: `0 20px 40px ${colors.shadow}`,
              }}
            >
              <CircularProgress size={40} sx={{ color: colors.buttonText }} />
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 500 }}>
              Loading quiz questions...
            </Typography>
            {isOffline && (
              <Typography variant="body2" sx={{ color: colors.textSecondary, mt: 1 }}>
                Checking offline cache...
              </Typography>
            )}
          </motion.div>
        </Box>
      </Box>
    );
  }

  if (error || quizzes.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
          py: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Subtle Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${colors.hover} 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${colors.hover} 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 4,
                borderRadius: 3,
                background: 'rgba(244, 67, 54, 0.08)',
                border: `1px solid rgba(244, 67, 54, 0.2)`,
                color: colors.text,
                '& .MuiAlert-icon': {
                  color: '#d32f2f',
                },
              }}
            >
              {error || 'No quiz questions available for this page.'}
              {isOffline && (
                <Typography variant="body2" sx={{ mt: 1, color: colors.textSecondary }}>
                  You're offline. Quiz questions need to be cached first by visiting this quiz while online.
                </Typography>
              )}
            </Alert>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/page/${pageId}`)}
              variant="contained"
              sx={{
                background: colors.buttonBg,
                color: colors.buttonText,
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: `0 8px 32px ${colors.shadow}`,
                '&:hover': {
                  background: colors.buttonBg,
                  boxShadow: `0 12px 40px ${colors.shadow}`,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Content
            </Button>
          </motion.div>
        </Container>
      </Box>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / quizzes.length) * 100);
    const getPerformanceColor = () => {
      if (percentage >= 80) return '#4caf50';
      if (percentage >= 60) return colors.accent;
      return '#f44336';
    };

    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
          py: 4,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Subtle Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 25% 25%, ${colors.hover} 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, ${colors.hover} 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              elevation={0}
              sx={{
                background: colors.glassBg,
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors.subtle}`,
                borderRadius: 4,
                boxShadow: `0 20px 40px ${colors.shadow}`,
              }}
            >
              <CardContent sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                {/* Results Header */}
                <Box mb={5}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Avatar
                      sx={{
                        width: 100,
                        height: 100,
                        background: colors.buttonBg,
                        mx: 'auto',
                        mb: 4,
                        boxShadow: `0 20px 40px ${colors.shadow}`,
                      }}
                    >
                      <EmojiEvents sx={{ fontSize: 50, color: colors.buttonText }} />
                    </Avatar>
                  </motion.div>
                  <Typography
                    variant="h2"
                    sx={{
                      color: colors.text,
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    Quiz Complete! 🎉
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: colors.textSecondary,
                      mb: 4,
                      fontSize: '1.2rem',
                    }}
                  >
                    Great job on completing the assessment!
                  </Typography>
                </Box>

                {/* Score Display */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: 5,
                      mb: 5,
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      borderRadius: 4,
                      boxShadow: `0 12px 30px ${colors.shadow}`,
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: getPerformanceColor(),
                        fontWeight: 800,
                        mb: 2,
                        fontSize: { xs: '3rem', md: '4rem' },
                      }}
                    >
                      {score}/{quizzes.length}
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 3,
                        fontSize: '1.5rem',
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
                        background: getPerformanceColor(),
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '1rem',
                        px: 3,
                        py: 1,
                      }}
                    />
                  </Paper>
                </motion.div>

                {/* Question Review */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box sx={{ mb: 5 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 4,
                        fontSize: '1.5rem',
                      }}
                    >
                      Question Review
                    </Typography>
                    {quizzes.map((quiz, index) => {
                      const userAnswer = answers[quiz.quizId];
                      const isCorrect = userAnswer === quiz.answer;
                      return (
                        <motion.div
                          key={quiz.quizId}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.1 * index }}
                        >
                          <Paper
                            elevation={0}
                            sx={{
                              mb: 3,
                              p: 4,
                              background: colors.secondary,
                              border: `1px solid ${isCorrect ? colors.accent : '#f44336'}30`,
                              borderRadius: 3,
                              boxShadow: `0 8px 24px ${colors.shadow}`,
                            }}
                          >
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 600,
                                color: colors.text,
                                mb: 3,
                                fontSize: '1.1rem',
                              }}
                            >
                              Q{index + 1}: {quiz.question}
                            </Typography>
                            <Box display="flex" alignItems="center" gap={2}>
                              {isCorrect ? (
                                <CheckCircle sx={{ color: '#4caf50', fontSize: '1.5rem' }} />
                              ) : (
                                <Cancel sx={{ color: '#f44336', fontSize: '1.5rem' }} />
                              )}
                              <Box>
                                <Typography
                                  variant="body1"
                                  sx={{ color: colors.textSecondary, mb: 1 }}
                                >
                                  Your answer: <strong style={{ color: colors.text }}>{userAnswer}</strong>
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{ color: colors.textSecondary }}
                                >
                                  Correct answer: <strong style={{ color: colors.text }}>{quiz.answer}</strong>
                                </Typography>
                              </Box>
                            </Box>
                          </Paper>
                        </motion.div>
                      );
                    })}
                  </Box>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button
                      variant="outlined"
                      startIcon={<Refresh />}
                      onClick={resetQuiz}
                      sx={{
                        borderColor: colors.accent,
                        color: colors.text,
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        border: `1px solid ${colors.accent}`,
                        '&:hover': {
                          borderColor: colors.accent,
                          background: colors.hover,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 24px ${colors.shadow}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Retake Quiz
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<ArrowBack />}
                      onClick={() => navigate(`/page/${pageId}`)}
                      sx={{
                        background: colors.buttonBg,
                        color: colors.buttonText,
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: `0 8px 32px ${colors.shadow}`,
                        '&:hover': {
                          background: colors.buttonBg,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 40px ${colors.shadow}`,
                        },
                        transition: 'all 0.3s ease',
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
                        color: colors.text,
                        borderRadius: 3,
                        px: 4,
                        py: 1.5,
                        textTransform: 'none',
                        fontWeight: 600,
                        border: `1px solid ${colors.accent}`,
                        '&:hover': {
                          borderColor: colors.accent,
                          background: colors.hover,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 8px 24px ${colors.shadow}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Dashboard
                    </Button>
                  </Box>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
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
        background: colors.primary,
        position: 'relative',
        py: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
        },
      }}
    >
      {/* Subtle Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${colors.hover} 1px, transparent 1px),
            radial-gradient(circle at 75% 75%, ${colors.hover} 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(`/page/${pageId}`)}
              variant="outlined"
              sx={{
                borderColor: colors.accent,
                color: colors.text,
                borderRadius: 3,
                px: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  borderColor: colors.accent,
                  background: colors.hover,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 24px ${colors.shadow}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Back to Content
            </Button>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h4"
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontSize: '1.5rem',
                }}
              >
                Question {currentQuiz + 1} of {quizzes.length}
              </Typography>
            </Box>

            {isOffline && (
              <Chip
                icon={<WifiOff />}
                label="Offline Mode"
                sx={{
                  background: colors.hover,
                  color: colors.text,
                  border: `1px solid ${colors.accent}30`,
                  mr: 1,
                }}
                size="small"
              />
            )}

            <Chip
              icon={<Psychology />}
              label={`${Math.round(progress)}% Complete`}
              sx={{
                background: colors.accent,
                color: 'white',
                fontWeight: 600,
                px: 2,
                py: 0.5,
              }}
            />
          </Box>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ transformOrigin: 'left' }}
        >
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 5,
              background: colors.secondary,
              border: `1px solid ${colors.subtle}`,
              borderRadius: 4,
              boxShadow: `0 8px 24px ${colors.shadow}`,
            }}
          >
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 12,
                borderRadius: 6,
                backgroundColor: colors.subtle,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: colors.accent,
                  borderRadius: 6,
                },
              }}
            />
          </Paper>
        </motion.div>

        {/* Quiz Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          key={currentQuiz} // Re-animate when question changes
        >
          <Card
            elevation={0}
            sx={{
              background: colors.glassBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              borderRadius: 4,
              boxShadow: `0 20px 40px ${colors.shadow}`,
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              {/* Question Header */}
              <Box display="flex" alignItems="center" mb={5}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 3,
                    background: colors.buttonBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: `0 8px 24px ${colors.shadow}`,
                  }}
                >
                  <QuizIcon sx={{ color: colors.buttonText, fontSize: 28 }} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    color: colors.text,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    fontSize: { xs: '1.5rem', md: '2rem' },
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
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                      >
                        <Paper
                          elevation={0}
                          sx={{
                            mb: 3,
                            border: `2px solid ${isSelected ? colors.accent : colors.subtle}`,
                            borderRadius: 3,
                            background: isSelected ? colors.hover : colors.secondary,
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                              border: `2px solid ${colors.accent}`,
                              background: colors.hover,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 8px 24px ${colors.shadow}`,
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
                                    color: colors.accent,
                                  },
                                  '& .MuiSvgIcon-root': {
                                    fontSize: '1.5rem',
                                  },
                                }}
                              />
                            }
                            label={
                              <Typography
                                sx={{
                                  color: colors.text,
                                  fontWeight: isSelected ? 600 : 500,
                                  fontSize: '1.1rem',
                                  lineHeight: 1.4,
                                }}
                              >
                                {option}
                              </Typography>
                            }
                            sx={{
                              m: 0,
                              p: 4,
                              width: '100%',
                              borderRadius: 3,
                              alignItems: 'flex-start',
                            }}
                          />
                        </Paper>
                      </motion.div>
                    );
                  })}
                </RadioGroup>
              </FormControl>

              {/* Navigation Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6, gap: 3 }}>
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBack />}
                    onClick={handlePrevious}
                    disabled={currentQuiz === 0}
                    sx={{
                      borderColor: colors.accent,
                      color: colors.text,
                      borderRadius: 3,
                      px: 4,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      border: `1px solid ${colors.accent}`,
                      '&:hover': {
                        borderColor: colors.accent,
                        background: colors.hover,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 8px 24px ${colors.shadow}`,
                      },
                      '&:disabled': {
                        borderColor: colors.subtle,
                        color: colors.textSecondary,
                        background: 'transparent',
                      },
                      transition: 'all 0.3s ease',
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
                      background: colors.buttonBg,
                      color: colors.buttonText,
                      borderRadius: 3,
                      px: 6,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      '&:hover': {
                        background: colors.buttonBg,
                        transform: 'translateY(-2px)',
                        boxShadow: `0 12px 40px ${colors.shadow}`,
                      },
                      '&:disabled': {
                        background: colors.subtle,
                        color: colors.textSecondary,
                        boxShadow: 'none',
                        transform: 'none',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {currentQuiz === quizzes.length - 1 ? 'Finish Quiz' : 'Next Question'}
                  </Button>
                </Box>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default QuizInterface;
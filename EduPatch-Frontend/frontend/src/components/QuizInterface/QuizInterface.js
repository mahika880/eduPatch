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
      if (percentage >= 80) return '#10b981'; // Emerald
      if (percentage >= 60) return colors.accent; // Blue
      return '#f59e0b'; // Amber
    };

    const getPerformanceMessage = () => {
      if (percentage >= 80) return { title: 'Outstanding!', subtitle: 'Excellent work! You\'ve mastered this material.' };
      if (percentage >= 60) return { title: 'Well Done!', subtitle: 'Good job! Keep up the great work.' };
      return { title: 'Keep Learning!', subtitle: 'Great effort! Review the material and try again.' };
    };

    const performance = getPerformanceMessage();

    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
          py: 4,
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            width: '800px',
            height: '800px',
            background: `radial-gradient(circle, ${getPerformanceColor()}15 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.8,
            pointerEvents: 'none',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
            borderRadius: '50%',
            opacity: 0.6,
            pointerEvents: 'none',
          },
        }}
      >
        {/* Animated Background Particles */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, ${getPerformanceColor()}10 2px, transparent 2px),
              radial-gradient(circle at 80% 20%, ${colors.hover} 2px, transparent 2px),
              radial-gradient(circle at 40% 40%, ${getPerformanceColor()}08 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px, 80px 80px, 60px 60px',
            opacity: 0.4,
            pointerEvents: 'none',
            animation: 'float 20s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Hero Section */}
            <Box textAlign="center" mb={8}>
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 0.3,
                  type: "spring",
                  stiffness: 200,
                  damping: 20
                }}
              >
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${getPerformanceColor()}, ${colors.buttonBg})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 4,
                    boxShadow: `0 25px 50px ${getPerformanceColor()}30`,
                    position: 'relative',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: -10,
                      left: -10,
                      right: -10,
                      bottom: -10,
                      borderRadius: '50%',
                      background: `linear-gradient(45deg, ${getPerformanceColor()}20, transparent)`,
                      animation: 'pulse 2s ease-in-out infinite',
                    },
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 70, color: 'white' }} />
                </Box>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: colors.text,
                    fontWeight: 800,
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    letterSpacing: '-0.02em',
                  }}
                >
                  {performance.title}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    color: colors.textSecondary,
                    mb: 6,
                    fontSize: '1.25rem',
                    fontWeight: 400,
                    maxWidth: '500px',
                    mx: 'auto',
                    lineHeight: 1.6,
                  }}
                >
                  {performance.subtitle}
                </Typography>
              </motion.div>
            </Box>

            {/* Score Display */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                delay: 0.8,
                duration: 0.8,
                type: "spring",
                stiffness: 100
              }}
            >
              <Box
                sx={{
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.glassBg} 100%)`,
                  border: `2px solid ${getPerformanceColor()}30`,
                  borderRadius: 6,
                  p: 6,
                  mb: 8,
                  boxShadow: `0 25px 50px ${getPerformanceColor()}15`,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: `linear-gradient(45deg, ${getPerformanceColor()}05, transparent 50%)`,
                    borderRadius: 6,
                  },
                }}
              >
                <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      delay: 1.2,
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <Typography
                      variant="h1"
                      sx={{
                        color: getPerformanceColor(),
                        fontWeight: 900,
                        fontSize: { xs: '4rem', md: '5rem' },
                        lineHeight: 1,
                        mb: 2,
                        textShadow: `0 4px 20px ${getPerformanceColor()}40`,
                      }}
                    >
                      {score}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: { xs: '2rem', md: '2.5rem' },
                          color: colors.textSecondary,
                          fontWeight: 600,
                          ml: 1,
                        }}
                      >
                        /{quizzes.length}
                      </Typography>
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4, duration: 0.6 }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: colors.text,
                        fontWeight: 700,
                        mb: 3,
                        fontSize: { xs: '2rem', md: '2.5rem' },
                      }}
                    >
                      {percentage}% Correct
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                  >
                    <Chip
                      icon={<TrendingUp />}
                      label={
                        percentage >= 80 ? 'Outstanding!' :
                        percentage >= 60 ? 'Well Done!' : 'Keep Learning!'
                      }
                      sx={{
                        background: getPerformanceColor(),
                        color: 'white',
                        fontWeight: 700,
                        fontSize: '1.1rem',
                        px: 4,
                        py: 2,
                        boxShadow: `0 8px 20px ${getPerformanceColor()}40`,
                        '& .MuiChip-icon': {
                          color: 'white',
                        },
                      }}
                    />
                  </motion.div>
                </Box>
              </Box>
            </motion.div>

            {/* Question Review */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <Box sx={{ mb: 8 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: colors.text,
                    fontWeight: 700,
                    mb: 6,
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    textAlign: 'center',
                  }}
                >
                  Detailed Review
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {quizzes.map((quiz, index) => {
                    const userAnswer = answers[quiz.quizId];
                    const isCorrect = userAnswer === quiz.answer;
                    return (
                      <motion.div
                        key={quiz.quizId}
                        initial={{ opacity: 0, x: -30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{
                          duration: 0.6,
                          delay: 2 + (index * 0.1),
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <Box
                          sx={{
                            background: colors.secondary,
                            border: `2px solid ${isCorrect ? getPerformanceColor() : '#f44336'}20`,
                            borderRadius: 4,
                            p: 5,
                            boxShadow: `0 12px 30px ${isCorrect ? getPerformanceColor() : '#f44336'}10`,
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '4px',
                              height: '100%',
                              background: isCorrect ? getPerformanceColor() : '#f44336',
                            },
                          }}
                        >
                          <Box sx={{ ml: 3 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                              <Box
                                sx={{
                                  width: 40,
                                  height: 40,
                                  borderRadius: '50%',
                                  background: isCorrect ? getPerformanceColor() : '#f44336',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  mr: 3,
                                  boxShadow: `0 8px 20px ${isCorrect ? getPerformanceColor() : '#f44336'}30`,
                                }}
                              >
                                {isCorrect ? (
                                  <CheckCircle sx={{ color: 'white', fontSize: '1.5rem' }} />
                                ) : (
                                  <Cancel sx={{ color: 'white', fontSize: '1.5rem' }} />
                                )}
                              </Box>
                              <Typography
                                variant="h6"
                                sx={{
                                  color: colors.text,
                                  fontWeight: 600,
                                  fontSize: '1.2rem',
                                  flex: 1,
                                }}
                              >
                                Question {index + 1}
                              </Typography>
                            </Box>

                            <Typography
                              variant="body1"
                              sx={{
                                color: colors.text,
                                fontSize: '1.1rem',
                                mb: 4,
                                lineHeight: 1.6,
                                fontWeight: 500,
                              }}
                            >
                              {quiz.question}
                            </Typography>

                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: colors.textSecondary,
                                    fontWeight: 600,
                                    minWidth: '120px',
                                  }}
                                >
                                  Your Answer:
                                </Typography>
                                <Typography
                                  variant="body1"
                                  sx={{
                                    color: isCorrect ? getPerformanceColor() : '#f44336',
                                    fontWeight: 600,
                                    background: isCorrect ? `${getPerformanceColor()}10` : '#f4433610',
                                    px: 2,
                                    py: 0.5,
                                    borderRadius: 2,
                                  }}
                                >
                                  {userAnswer}
                                </Typography>
                              </Box>

                              {!isCorrect && (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                  <Typography
                                    variant="body2"
                                    sx={{
                                      color: colors.textSecondary,
                                      fontWeight: 600,
                                      minWidth: '120px',
                                    }}
                                  >
                                    Correct Answer:
                                  </Typography>
                                  <Typography
                                    variant="body1"
                                    sx={{
                                      color: getPerformanceColor(),
                                      fontWeight: 600,
                                      background: `${getPerformanceColor()}10`,
                                      px: 2,
                                      py: 0.5,
                                      borderRadius: 2,
                                    }}
                                  >
                                    {quiz.answer}
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </motion.div>
                    );
                  })}
                </Box>
              </Box>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.5 }}
            >
              <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap', px: 2 }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<Refresh />}
                    onClick={resetQuiz}
                    sx={{
                      borderColor: colors.accent,
                      color: colors.text,
                      borderRadius: 4,
                      px: 6,
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      border: `2px solid ${colors.accent}`,
                      boxShadow: `0 4px 15px ${colors.accent}20`,
                      '&:hover': {
                        borderColor: colors.accent,
                        background: colors.hover,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 12px 30px ${colors.accent}30`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Retake Quiz
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="contained"
                    startIcon={<ArrowBack />}
                    onClick={() => navigate(`/page/${pageId}`)}
                    sx={{
                      background: colors.buttonBg,
                      color: colors.buttonText,
                      borderRadius: 4,
                      px: 6,
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      '&:hover': {
                        background: colors.buttonBg,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 15px 40px ${colors.shadow}`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Back to Content
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate('/admin/dashboard')}
                    sx={{
                      borderColor: colors.accent,
                      color: colors.text,
                      borderRadius: 4,
                      px: 6,
                      py: 2,
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      border: `2px solid ${colors.accent}`,
                      boxShadow: `0 4px 15px ${colors.accent}20`,
                      '&:hover': {
                        borderColor: colors.accent,
                        background: colors.hover,
                        transform: 'translateY(-3px)',
                        boxShadow: `0 12px 30px ${colors.accent}30`,
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Dashboard
                  </Button>
                </motion.div>
              </Box>
            </motion.div>
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
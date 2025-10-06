import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  CircularProgress,
  Container,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Tooltip,
  Alert,
  Snackbar,
  Paper,
  Divider,
  Fade,
  Slide,
  Avatar,
} from '@mui/material';
import {
  Quiz,
  Search,
  Edit,
  Delete,
  Add,
  Visibility,
  FilterList,
  Psychology,
  AutoAwesome,
  CheckCircle,
  Cancel,
  MenuBook,
  Assessment,
  Analytics,
  School,
} from '@mui/icons-material';
import { apiService } from '../../services/api';
import { motion } from 'framer-motion';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState('all');
  const [editDialog, setEditDialog] = useState({ open: false, quiz: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, quiz: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

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
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch all pages first
      const pagesResponse = await apiService.getAllPages();
      setPages(pagesResponse.data);
      
      // Fetch all quizzes for all pages
      const allQuizzes = [];
      for (const page of pagesResponse.data) {
        try {
          const quizzesResponse = await apiService.getQuizzesByPage(page.pageId);
          const pageQuizzes = quizzesResponse.data.map(quiz => ({
            ...quiz,
            pageTitle: page.chapter,
            pageNumber: page.pageNumber
          }));
          allQuizzes.push(...pageQuizzes);
        } catch (error) {
          console.log(`No quizzes found for page ${page.pageId}`);
        }
      }
      setQuizzes(allQuizzes);
    } catch (error) {
      console.error('Error fetching data:', error);
      showSnackbar('Failed to load quizzes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleDeleteQuiz = async (quizId) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/quizzes/id/${quizId}`, {
        method: 'DELETE'
      });
      
      setQuizzes(quizzes.filter(quiz => quiz.quizId !== quizId));
      setDeleteDialog({ open: false, quiz: null });
      showSnackbar('Quiz deleted successfully! 🗑️');
    } catch (error) {
      console.error('Error deleting quiz:', error);
      showSnackbar('Failed to delete quiz', 'error');
    }
  };

  const handleUpdateQuiz = async (updatedQuiz) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/quizzes/${updatedQuiz.quizId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedQuiz)
      });
      
      if (response.ok) {
        const updated = await response.json();
        setQuizzes(quizzes.map(quiz => 
          quiz.quizId === updated.quizId ? { ...updated, pageTitle: quiz.pageTitle, pageNumber: quiz.pageNumber } : quiz
        ));
        setEditDialog({ open: false, quiz: null });
        showSnackbar('Quiz updated successfully! ✏️');
      }
    } catch (error) {
      console.error('Error updating quiz:', error);
      showSnackbar('Failed to update quiz', 'error');
    }
  };

  // Filter quizzes based on search and page selection
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.pageTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPage = selectedPage === 'all' || quiz.pageId === selectedPage;
    return matchesSearch && matchesPage;
  });

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
              Loading assessments...
            </Typography>
          </motion.div>
        </Box>
      </Box>
    );
  }

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
          background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.4,
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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                color: colors.text,
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Assessment Center
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.25rem',
              }}
            >
              Manage, organize, and optimize your AI-generated assessments for better learning outcomes
            </Typography>
          </Box>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              background: colors.glassBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              borderRadius: 4,
              p: 4,
              mb: 6,
              boxShadow: `0 8px 32px ${colors.shadow}`,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search assessments by question or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: colors.textSecondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: colors.accent,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.accent,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: colors.accent,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <TextField
                    select
                    label="Filter by Content"
                    value={selectedPage}
                    onChange={(e) => setSelectedPage(e.target.value)}
                    SelectProps={{ native: true }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 3,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        '&:hover fieldset': {
                          borderColor: colors.accent,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: colors.accent,
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: colors.accent,
                      },
                    }}
                  >
                    <option value="all">All Content</option>
                    {pages.map((page) => (
                      <option key={page.pageId} value={page.pageId}>
                        {page.chapter} (Page {page.pageNumber})
                      </option>
                    ))}
                  </TextField>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 1,
                    p: 2,
                    background: colors.secondary,
                    borderRadius: 3,
                    border: `1px solid ${colors.subtle}`,
                  }}
                >
                  <Assessment sx={{ color: colors.accent, fontSize: '1.5rem' }} />
                  <Box>
                    <Typography variant="h6" sx={{ color: colors.text, fontWeight: 700, lineHeight: 1 }}>
                      {filteredQuizzes.length}
                    </Typography>
                    <Typography variant="caption" sx={{ color: colors.textSecondary, fontWeight: 500 }}>
                      Results
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              {
                title: 'Total Assessments',
                value: quizzes.length,
                icon: <Assessment />,
                color: colors.accent,
                subtitle: 'Active questions'
              },
              {
                title: 'Content Pages',
                value: pages.length,
                icon: <MenuBook />,
                color: colors.accentSecondary,
                subtitle: 'Learning materials'
              },
              {
                title: 'Avg per Page',
                value: Math.round(quizzes.length / Math.max(pages.length, 1)),
                icon: <Analytics />,
                color: colors.success,
                subtitle: 'Questions generated'
              },
              {
                title: 'AI Powered',
                value: '100%',
                icon: <AutoAwesome />,
                color: colors.warning,
                subtitle: 'Intelligent creation'
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: 'center',
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${stat.color}20`,
                        borderColor: stat.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: `0 8px 24px ${stat.color}30`,
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { color: 'white', fontSize: 28 } })}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: colors.text,
                        mb: 1,
                        fontSize: '2rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      {stat.subtitle}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Assessment Cards */}
        {filteredQuizzes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card
              sx={{
                textAlign: 'center',
                p: 8,
                borderRadius: 4,
                background: colors.secondary,
                border: `1px solid ${colors.subtle}`,
                boxShadow: `0 20px 40px ${colors.shadow}`,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: colors.buttonBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: `0 20px 40px ${colors.shadow}`,
                }}
              >
                <Assessment sx={{ fontSize: 60, color: colors.buttonText }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: colors.text,
                  mb: 3,
                  fontSize: '1.8rem'
                }}
              >
                {searchTerm || selectedPage !== 'all' ? 'No Matching Assessments' : 'No Assessments Available'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: colors.textSecondary,
                  fontSize: '1.1rem',
                  maxWidth: '400px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                {searchTerm || selectedPage !== 'all'
                  ? 'Try adjusting your search or filter criteria to find what you\'re looking for.'
                  : 'Create educational content first to generate AI-powered assessments for your students.'}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => window.location.href = '/admin/create'}
                sx={{
                  background: colors.buttonBg,
                  color: colors.buttonText,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: `0 8px 32px ${colors.shadow}`,
                  '&:hover': {
                    background: colors.buttonBg,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 40px ${colors.shadow}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Create Content
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Grid container spacing={4}>
              {filteredQuizzes.map((quiz, index) => (
                <Grid item xs={12} md={6} lg={4} key={quiz.quizId}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 4,
                        height: '100%',
                        transition: 'all 0.3s ease',
                        background: colors.secondary,
                        border: `1px solid ${colors.subtle}`,
                        boxShadow: `0 8px 32px ${colors.shadow}`,
                        '&:hover': {
                          boxShadow: `0 20px 40px ${colors.accent}20`,
                          borderColor: colors.accent,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        {/* Assessment Header */}
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                          <Chip
                            label={`${quiz.pageTitle} • Page ${quiz.pageNumber}`}
                            size="small"
                            sx={{
                              background: colors.accent,
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              px: 2,
                              py: 0.5,
                            }}
                          />
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background: colors.buttonBg,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Psychology sx={{ color: colors.buttonText, fontSize: 18 }} />
                          </Box>
                        </Box>

                        {/* Question */}
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.text,
                            fontWeight: 600,
                            mb: 3,
                            lineHeight: 1.4,
                            fontSize: '1.1rem',
                            minHeight: 70,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {quiz.question}
                        </Typography>

                        {/* Options Preview */}
                        <Box sx={{ mb: 3 }}>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.textSecondary,
                              mb: 2,
                              fontWeight: 600,
                              fontSize: '0.9rem'
                            }}
                          >
                            Answer Options:
                          </Typography>
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {quiz.options?.slice(0, 3).map((option, idx) => (
                              <Box key={idx} display="flex" alignItems="center">
                                <Box
                                  sx={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: '50%',
                                    background: option.charAt(0) === quiz.answer ? colors.success : colors.subtle,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    mr: 2,
                                    flexShrink: 0,
                                  }}
                                >
                                  {option.charAt(0) === quiz.answer && (
                                    <CheckCircle sx={{ color: 'white', fontSize: 12 }} />
                                  )}
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: colors.text,
                                    fontSize: '0.9rem',
                                    lineHeight: 1.4,
                                    flex: 1,
                                  }}
                                >
                                  {option.length > 35 ? `${option.substring(0, 35)}...` : option}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                          {quiz.options?.length > 3 && (
                            <Typography
                              variant="caption"
                              sx={{
                                color: colors.textSecondary,
                                fontStyle: 'italic',
                                mt: 1,
                                display: 'block'
                              }}
                            >
                              +{quiz.options.length - 3} more options
                            </Typography>
                          )}
                        </Box>

                        {/* Correct Answer Highlight */}
                        <Box
                          sx={{
                            background: `${colors.success}10`,
                            border: `1px solid ${colors.success}30`,
                            borderRadius: 2,
                            p: 2,
                            display: 'flex',
                            alignItems: 'center',
                          }}
                        >
                          <CheckCircle sx={{ color: colors.success, fontSize: 18, mr: 2 }} />
                          <Box>
                            <Typography
                              variant="caption"
                              sx={{
                                color: colors.textSecondary,
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                fontSize: '0.7rem',
                                letterSpacing: '0.5px'
                              }}
                            >
                              Correct Answer
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: colors.text,
                                fontWeight: 600,
                                fontSize: '0.9rem'
                              }}
                            >
                              {quiz.answer}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>

                      <CardActions sx={{ justifyContent: 'space-between', px: 4, pb: 4, pt: 0 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => window.open(`/quiz/${quiz.pageId}`, '_blank')}
                            sx={{
                              color: colors.text,
                              borderRadius: 2,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 600,
                              border: `1px solid ${colors.subtle}`,
                              '&:hover': {
                                background: colors.hover,
                                borderColor: colors.accent,
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            Preview
                          </Button>
                        </motion.div>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Edit Assessment">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <IconButton
                                size="small"
                                onClick={() => setEditDialog({ open: true, quiz })}
                                sx={{
                                  background: colors.accent,
                                  color: 'white',
                                  '&:hover': {
                                    background: colors.accentSecondary,
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Edit sx={{ fontSize: 16 }} />
                              </IconButton>
                            </motion.div>
                          </Tooltip>
                          <Tooltip title="Delete Assessment">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <IconButton
                                size="small"
                                onClick={() => setDeleteDialog({ open: true, quiz })}
                                sx={{
                                  background: colors.error,
                                  color: 'white',
                                  '&:hover': {
                                    background: '#dc2626',
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Delete sx={{ fontSize: 16 }} />
                              </IconButton>
                            </motion.div>
                          </Tooltip>
                        </Box>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>

      {/* Edit Assessment Dialog */}
      <EditQuizDialog
        open={editDialog.open}
        quiz={editDialog.quiz}
        onClose={() => setEditDialog({ open: false, quiz: null })}
        onSave={handleUpdateQuiz}
        colors={colors}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, quiz: null })}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: colors.secondary,
            border: `1px solid ${colors.subtle}`,
            boxShadow: `0 25px 50px ${colors.shadow}`,
          }
        }}
      >
        <DialogTitle sx={{
          color: colors.text,
          fontWeight: 700,
          fontSize: '1.5rem',
          textAlign: 'center',
          pt: 4
        }}>
          <Box
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: colors.error,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              boxShadow: `0 8px 24px ${colors.error}30`,
            }}
          >
            <Delete sx={{ color: 'white', fontSize: 28 }} />
          </Box>
          Delete Assessment
        </DialogTitle>
        <DialogContent sx={{ px: 4, pb: 2 }}>
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: colors.textSecondary,
              textAlign: 'center',
              fontSize: '1rem',
              lineHeight: 1.6
            }}
          >
            Are you sure you want to delete this assessment question? This action cannot be undone.
          </Typography>
          {deleteDialog.quiz && (
            <Box
              sx={{
                background: colors.primary,
                border: `1px solid ${colors.subtle}`,
                borderRadius: 3,
                p: 3,
                mb: 2
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.text,
                  fontWeight: 600,
                  fontSize: '1rem',
                  lineHeight: 1.5
                }}
              >
                {deleteDialog.quiz.question}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
          <Button
            onClick={() => setDeleteDialog({ open: false, quiz: null })}
            sx={{
              color: colors.text,
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              border: `1px solid ${colors.subtle}`,
              '&:hover': {
                background: colors.hover,
                borderColor: colors.accent,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteQuiz(deleteDialog.quiz?.quizId)}
            variant="contained"
            sx={{
              background: colors.error,
              color: 'white',
              borderRadius: 3,
              px: 4,
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: `0 8px 32px ${colors.error}30`,
              '&:hover': {
                background: '#dc2626',
                transform: 'translateY(-2px)',
                boxShadow: `0 12px 40px ${colors.error}40`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Delete Assessment
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{
            borderRadius: 3,
            fontWeight: 600,
            fontSize: '0.95rem',
            boxShadow: `0 8px 32px ${colors.shadow}`,
            '& .MuiAlert-icon': {
              fontSize: '1.2rem',
            },
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Edit Assessment Dialog Component
const EditQuizDialog = ({ open, quiz, onClose, onSave, colors }) => {
  const [editedQuiz, setEditedQuiz] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: 'A'
  });

  useEffect(() => {
    if (quiz) {
      setEditedQuiz({
        ...quiz,
        options: quiz.options || ['', '', '', '']
      });
    }
  }, [quiz]);

  const handleSave = () => {
    onSave(editedQuiz);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...editedQuiz.options];
    newOptions[index] = value;
    setEditedQuiz({ ...editedQuiz, options: newOptions });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          background: colors.secondary,
          border: `1px solid ${colors.subtle}`,
          boxShadow: `0 25px 50px ${colors.shadow}`,
        }
      }}
    >
      <DialogTitle sx={{
        color: colors.text,
        fontWeight: 700,
        fontSize: '1.5rem',
        textAlign: 'center',
        pt: 4
      }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: colors.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            boxShadow: `0 8px 24px ${colors.accent}30`,
          }}
        >
          <Edit sx={{ color: 'white', fontSize: 28 }} />
        </Box>
        Edit Assessment
      </DialogTitle>
      <DialogContent sx={{ px: 4 }}>
        <Box sx={{ mt: 2 }}>
          {/* Question */}
          <TextField
            fullWidth
            label="Question"
            multiline
            rows={3}
            value={editedQuiz.question}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, question: e.target.value })}
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover fieldset': {
                  borderColor: colors.accent,
                },
                '&.Mui-focused fieldset': {
                  borderColor: colors.accent,
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: colors.accent,
              },
            }}
          />

          {/* Options */}
          <Typography
            variant="h6"
            sx={{
              mb: 3,
              color: colors.text,
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Answer Options:
          </Typography>
          {editedQuiz.options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${String.fromCharCode(65 + index)}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover fieldset': {
                    borderColor: colors.accent,
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: colors.accent,
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: colors.accent,
                },
              }}
            />
          ))}

          {/* Correct Answer */}
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel
              component="legend"
              sx={{
                color: colors.text,
                fontWeight: 600,
                fontSize: '1rem',
                mb: 2
              }}
            >
              Correct Answer:
            </FormLabel>
            <RadioGroup
              row
              value={editedQuiz.answer}
              onChange={(e) => setEditedQuiz({ ...editedQuiz, answer: e.target.value })}
              sx={{ gap: 2 }}
            >
              {['A', 'B', 'C', 'D'].map((letter) => (
                <FormControlLabel
                  key={letter}
                  value={letter}
                  control={
                    <Radio
                      sx={{
                        color: colors.accent,
                        '&.Mui-checked': {
                          color: colors.accent,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}
                    >
                      {letter}
                    </Typography>
                  }
                  sx={{
                    background: colors.primary,
                    border: `1px solid ${colors.subtle}`,
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    m: 0,
                    '&:hover': {
                      background: colors.hover,
                    },
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 4, pt: 2, gap: 2 }}>
        <Button
          onClick={onClose}
          sx={{
            color: colors.text,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            border: `1px solid ${colors.subtle}`,
            '&:hover': {
              background: colors.hover,
              borderColor: colors.accent,
            },
            transition: 'all 0.3s ease',
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
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
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizManagement;
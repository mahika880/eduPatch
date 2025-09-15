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
} from '@mui/icons-material';
import { apiService } from '../../services/api';

const QuizManagement = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPage, setSelectedPage] = useState('all');
  const [editDialog, setEditDialog] = useState({ open: false, quiz: null });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, quiz: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
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
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box textAlign="center">
          <CircularProgress size={60} sx={{ color: colors.secondary, mb: 3 }} />
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading quiz management...
          </Typography>
        </Box>
      </Box>
    );
  }

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
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              color: 'white',
              borderRadius: 3,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Quiz sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                    Quiz Management 🎯
                  </Typography>
                  <Typography variant="h6" sx={{ opacity: 0.9 }}>
                    Manage and organize your AI-generated quiz questions
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ opacity: 0.8 }}>
                {filteredQuizzes.length} quizzes across {pages.length} content pieces
              </Typography>
            </CardContent>
          </Paper>
        </Fade>

        {/* Search and Filter Section */}
        <Slide direction="down" in={true} timeout={1000}>
          <Paper
            elevation={0}
            sx={{
              mb: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 3,
              p: 3,
            }}
          >
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="Search quizzes by question or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: colors.secondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      background: colors.lightest,
                      '&:hover fieldset': {
                        borderColor: colors.accent,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.secondary,
                      },
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
                        borderRadius: 2,
                        background: colors.lightest,
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
                <Box display="flex" alignItems="center" gap={1}>
                  <FilterList sx={{ color: colors.secondary }} />
                  <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 600 }}>
                    {filteredQuizzes.length} Results
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Slide>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { title: 'Total Quizzes', value: quizzes.length, icon: <Quiz />, color: colors.primary },
            { title: 'Content Pages', value: pages.length, icon: <MenuBook />, color: colors.secondary },
            { title: 'Avg per Page', value: Math.round(quizzes.length / Math.max(pages.length, 1)), icon: <Psychology />, color: colors.accent },
            { title: 'AI Generated', value: '100%', icon: <AutoAwesome />, color: colors.primary },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Fade in={true} timeout={1200 + index * 200}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    textAlign: 'center',
                    background: `${stat.color}08`,
                    border: `1px solid ${stat.color}30`,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: `0 10px 30px ${stat.color}20`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      color: stat.color,
                      mb: 2,
                      p: 2,
                      borderRadius: '50%',
                      background: `${stat.color}15`,
                      display: 'inline-flex',
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
                    {stat.title}
                  </Typography>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>

        {/* Quiz Cards Grid */}
        {filteredQuizzes.length === 0 ? (
          <Fade in={true} timeout={1400}>
            <Card sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
              <Quiz sx={{ fontSize: 80, mb: 2, color: colors.accent }} />
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: colors.primary }}>
                {searchTerm || selectedPage !== 'all' ? 'No Matching Quizzes Found' : 'No Quizzes Available'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: colors.secondary }}>
                {searchTerm || selectedPage !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'Create some content first to generate AI quizzes!'}
              </Typography>
            </Card>
          </Fade>
        ) : (
          <Grid container spacing={3}>
            {filteredQuizzes.map((quiz, index) => (
              <Grid item xs={12} md={6} lg={4} key={quiz.quizId}>
                <Slide direction="up" in={true} timeout={1400 + index * 100}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      height: '100%',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${colors.accent}40`,
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 10px 30px ${colors.primary}15`,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 3 }}>
                      {/* Quiz Header */}
                      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                        <Chip
                          label={`${quiz.pageTitle} - Page ${quiz.pageNumber}`}
                          size="small"
                          sx={{
                            background: colors.light,
                            color: colors.primary,
                            fontWeight: 600,
                          }}
                        />
                        <Box display="flex" alignItems="center">
                          <Psychology sx={{ color: colors.secondary, fontSize: 20 }} />
                        </Box>
                      </Box>

                      {/* Question */}
                      <Typography
                        variant="h6"
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                          mb: 2,
                          lineHeight: 1.4,
                          minHeight: 60,
                        }}
                      >
                        {quiz.question}
                      </Typography>

                      {/* Options Preview */}
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" sx={{ color: colors.secondary, mb: 1, fontWeight: 600 }}>
                          Options:
                        </Typography>
                        {quiz.options?.slice(0, 2).map((option, idx) => (
                          <Box key={idx} display="flex" alignItems="center" mb={0.5}>
                            <Box
                              sx={
                                option.charAt(0) === quiz.answer
                                  ? {
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      background: '#4caf50',
                                      mr: 1,
                                    }
                                  : {
                                      width: 8,
                                      height: 8,
                                      borderRadius: '50%',
                                      background: colors.accent,
                                      mr: 1,
                                    }
                              }
                            />
                            <Typography variant="body2" sx={{ color: colors.primary, fontSize: '0.9rem' }}>
                              {option.length > 40 ? `${option.substring(0, 40)}...` : option}
                            </Typography>
                          </Box>
                        ))}
                        {quiz.options?.length > 2 && (
                          <Typography variant="caption" sx={{ color: colors.secondary, fontStyle: 'italic' }}>
                            +{quiz.options.length - 2} more options
                          </Typography>
                        )}
                      </Box>

                      {/* Correct Answer */}
                      <Box display="flex" alignItems="center" mb={2}>
                        <CheckCircle sx={{ color: '#4caf50', fontSize: 16, mr: 1 }} />
                        <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 600 }}>
                          Correct Answer: {quiz.answer}
                        </Typography>
                      </Box>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
                      <Button
                        size="small"
                        startIcon={<Visibility />}
                        onClick={() => window.open(`/quiz/${quiz.pageId}`, '_blank')}
                        sx={{
                          color: colors.primary,
                          '&:hover': {
                            background: `${colors.primary}10`,
                          },
                        }}
                      >
                        Preview
                      </Button>
                      <Box>
                        <Tooltip title="Edit Quiz">
                          <IconButton
                            size="small"
                            onClick={() => setEditDialog({ open: true, quiz })}
                            sx={{
                              color: colors.secondary,
                              mr: 1,
                              '&:hover': {
                                background: `${colors.secondary}20`,
                              },
                            }}
                          >
                            <Edit />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete Quiz">
                          <IconButton
                            size="small"
                            onClick={() => setDeleteDialog({ open: true, quiz })}
                            sx={{
                              color: '#f44336',
                              '&:hover': {
                                background: 'rgba(244, 67, 54, 0.1)',
                              },
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardActions>
                  </Card>
                </Slide>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      {/* Edit Quiz Dialog */}
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
      >
        <DialogTitle sx={{ color: colors.primary, fontWeight: 600 }}>
          🗑️ Delete Quiz Question
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Are you sure you want to delete this quiz question?
          </Typography>
          {deleteDialog.quiz && (
            <Paper sx={{ p: 2, background: colors.lightest, borderRadius: 2 }}>
              <Typography variant="body2" sx={{ color: colors.primary, fontWeight: 600 }}>
                {deleteDialog.quiz.question}
              </Typography>
            </Paper>
          )}
          <Typography variant="body2" sx={{ mt: 2, color: colors.secondary }}>
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button
            onClick={() => setDeleteDialog({ open: false, quiz: null })}
            sx={{ color: colors.secondary }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleDeleteQuiz(deleteDialog.quiz?.quizId)}
            variant="contained"
            sx={{
              background: '#f44336',
              '&:hover': { background: '#d32f2f' },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

// Edit Quiz Dialog Component
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
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ color: colors.primary, fontWeight: 600 }}>
        ✏️ Edit Quiz Question
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {/* Question */}
          <TextField
            fullWidth
            label="Question"
            multiline
            rows={3}
            value={editedQuiz.question}
            onChange={(e) => setEditedQuiz({ ...editedQuiz, question: e.target.value })}
            sx={{ mb: 3 }}
          />

          {/* Options */}
          <Typography variant="h6" sx={{ mb: 2, color: colors.primary }}>
            Answer Options:
          </Typography>
          {editedQuiz.options.map((option, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Option ${String.fromCharCode(65 + index)}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              sx={{ mb: 2 }}
            />
          ))}

          {/* Correct Answer */}
          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ color: colors.primary, fontWeight: 600 }}>
              Correct Answer:
            </FormLabel>
            <RadioGroup
              row
              value={editedQuiz.answer}
              onChange={(e) => setEditedQuiz({ ...editedQuiz, answer: e.target.value })}
            >
              {['A', 'B', 'C', 'D'].map((letter) => (
                <FormControlLabel
                  key={letter}
                  value={letter}
                  control={<Radio sx={{ color: colors.secondary }} />}
                  label={letter}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose} sx={{ color: colors.secondary }}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
            '&:hover': {
              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
            },
          }}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuizManagement;
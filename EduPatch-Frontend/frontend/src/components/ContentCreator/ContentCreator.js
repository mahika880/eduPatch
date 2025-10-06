import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Container,
  InputAdornment,
} from '@mui/material';
import {
  AutoAwesome,
  Send,
  Create,
  ArrowForward,
} from '@mui/icons-material';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContentCreator = () => {
  const [formData, setFormData] = useState({
    content: '',
    chapter: '',
    pageNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Modern EduPatch Color Palette
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    subtle: '#E8E8E8',
    glassBg: 'rgba(255, 255, 255, 0.7)',
    hover: 'rgba(41, 151, 255, 0.08)',
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!formData.content.trim()) {
      setError('Please enter educational content');
      return false;
    }
    if (!formData.chapter.trim()) {
      setError('Please enter a chapter title');
      return false;
    }
    if (!formData.pageNumber.trim()) {
      setError('Please enter a page number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await apiService.createContent(formData);
      setResult(response.data);
      setSuccess('Content generated successfully! You can now view your interactive learning materials.');
    } catch (error) {
      console.error('Content creation error:', error);
      setError(error.response?.data?.error || 'Failed to create content. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewContent = () => {
    if (result?.page?.pageId) {
      navigate(`/page/${result.page.pageId}`);
    }
  };

  const handleCreateNew = () => {
    setFormData({
      content: '',
      chapter: '',
      pageNumber: '',
    });
    setResult(null);
    setError('');
    setSuccess('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.primary,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 0% 0%, ${colors.accent}08 0%, transparent 30%),
            radial-gradient(circle at 100% 100%, ${colors.accent}05 0%, transparent 30%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            py: 8,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 600 }}>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box textAlign="center" mb={6}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '3rem' },
                    fontWeight: 700,
                    color: colors.text,
                    mb: 2,
                    letterSpacing: '-0.02em',
                  }}
                >
                  Create Content
                </Typography>

                <Typography
                  variant="h6"
                  sx={{
                    color: colors.textSecondary,
                    fontWeight: 400,
                    maxWidth: '400px',
                    mx: 'auto',
                    lineHeight: 1.5,
                  }}
                >
                  Transform your educational content into interactive learning experiences with AI
                </Typography>
              </Box>
            </motion.div>

            {/* Main Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Box
                sx={{
                  background: colors.glassBg,
                  backdropFilter: 'blur(20px)',
                  border: `1px solid ${colors.subtle}`,
                  borderRadius: 4,
                  p: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                {!result ? (
                  <form onSubmit={handleSubmit}>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <TextField
                        fullWidth
                        label="Chapter Title"
                        name="chapter"
                        value={formData.chapter}
                        onChange={handleInputChange}
                        required
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
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Create sx={{ color: colors.textSecondary }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      <TextField
                        fullWidth
                        label="Page Number"
                        name="pageNumber"
                        type="number"
                        value={formData.pageNumber}
                        onChange={handleInputChange}
                        required
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
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      <TextField
                        fullWidth
                        label="Educational Content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={8}
                        placeholder="Paste your textbook content here. Our AI will generate summaries, explanations, and interactive quizzes."
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
                    </motion.div>

                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Alert
                          severity="error"
                          sx={{
                            mb: 3,
                            borderRadius: 3,
                            background: 'rgba(244, 67, 54, 0.08)',
                            border: `1px solid rgba(244, 67, 54, 0.2)`,
                            '& .MuiAlert-icon': {
                              color: '#d32f2f',
                            },
                          }}
                        >
                          {error}
                        </Alert>
                      </motion.div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={loading || !formData.chapter || !formData.pageNumber || !formData.content}
                        endIcon={!loading && <ArrowForward />}
                        sx={{
                          py: 2,
                          borderRadius: 3,
                          background: `linear-gradient(135deg, ${colors.text}, ${colors.accent})`,
                          color: 'white',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          boxShadow: `0 8px 32px ${colors.text}20`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.text})`,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 12px 40px ${colors.accent}30`,
                          },
                          '&:disabled': {
                            background: colors.subtle,
                            color: colors.textSecondary,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {loading ? (
                          <>
                            <CircularProgress size={20} sx={{ mr: 1 }} />
                            Generating Content...
                          </>
                        ) : (
                          'Generate Learning Materials'
                        )}
                      </Button>
                    </motion.div>
                  </form>
                ) : (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box textAlign="center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <Box
                          sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.text})`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mx: 'auto',
                            mb: 3,
                            boxShadow: `0 8px 32px ${colors.accent}30`,
                          }}
                        >
                          <AutoAwesome sx={{ fontSize: 32, color: 'white' }} />
                        </Box>
                      </motion.div>

                      <Typography
                        variant="h4"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          mb: 2,
                        }}
                      >
                        Content Generated Successfully!
                      </Typography>

                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.textSecondary,
                          mb: 4,
                          lineHeight: 1.6,
                        }}
                      >
                        Your content has been transformed into interactive learning materials including AI-generated summaries, detailed explanations, and assessment quizzes.
                      </Typography>

                      {success && (
                        <Alert
                          severity="success"
                          sx={{
                            mb: 4,
                            borderRadius: 3,
                            background: 'rgba(76, 175, 80, 0.08)',
                            border: `1px solid rgba(76, 175, 80, 0.2)`,
                            '& .MuiAlert-icon': {
                              color: '#4caf50',
                            },
                          }}
                        >
                          {success}
                        </Alert>
                      )}

                      <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Create />}
                          onClick={handleCreateNew}
                          sx={{
                            borderColor: colors.accent,
                            color: colors.accent,
                            borderRadius: 3,
                            px: 3,
                            textTransform: 'none',
                            fontWeight: 600,
                            '&:hover': {
                              borderColor: colors.text,
                              background: colors.hover,
                            },
                          }}
                        >
                          Create New Content
                        </Button>

                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          onClick={handleViewContent}
                          sx={{
                            background: `linear-gradient(135deg, ${colors.text}, ${colors.accent})`,
                            borderRadius: 3,
                            px: 4,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: `0 8px 32px ${colors.text}20`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${colors.accent}, ${colors.text})`,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 12px 40px ${colors.accent}30`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          View Content
                        </Button>
                      </Box>
                    </Box>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContentCreator;
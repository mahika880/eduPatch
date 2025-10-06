import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import {
  AutoAwesome,
  Send,
  Create,
  ArrowForward,
  Psychology,
  School,
  Lightbulb,
} from '@mui/icons-material';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

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

  // Scroll-based parallax
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  // Premium EduPatch Color Palette
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    accentSecondary: '#6366F1',
    subtle: '#E8E8E8',
    glassBg: 'rgba(255, 255, 255, 0.1)',
    hover: 'rgba(41, 151, 255, 0.08)',
    gradient: 'linear-gradient(135deg, #2997FF 0%, #6366F1 100%)',
    glow: '0 0 30px rgba(41, 151, 255, 0.3)',
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
        background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <motion.div style={{ y: y1, opacity }}>
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '10%',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41, 151, 255, 0.1) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </motion.div>

      <motion.div style={{ y: y2, opacity }}>
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>

      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          style={{
            position: 'absolute',
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: colors.accent,
            boxShadow: `0 0 10px ${colors.accent}`,
          }}
        />
      ))}

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Left Side - AI Illustration */}
        <Box
          sx={{
            flex: 1,
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            p: 8,
            position: 'relative',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            {/* AI Brain Illustration */}
            <Box
              sx={{
                position: 'relative',
                width: '400px',
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Box
                  sx={{
                    width: '350px',
                    height: '350px',
                    borderRadius: '50%',
                    border: `2px solid ${colors.accent}20`,
                    position: 'absolute',
                  }}
                />
              </motion.div>

              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Box
                  sx={{
                    width: '280px',
                    height: '280px',
                    borderRadius: '50%',
                    border: `1px solid ${colors.accentSecondary}30`,
                    position: 'absolute',
                  }}
                />
              </motion.div>

              {/* Central AI Icon */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Box
                  sx={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: colors.gradient,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: colors.glow,
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <Psychology sx={{ fontSize: 60, color: 'white' }} />
                </Box>
              </motion.div>

              {/* Floating Elements */}
              {[
                { icon: <Lightbulb />, delay: 0, x: -180, y: -80 },
                { icon: <School />, delay: 1, x: 180, y: -60 },
                { icon: <AutoAwesome />, delay: 2, x: 0, y: -160 },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1, 0.8],
                    y: [item.y, item.y - 10, item.y],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: item.delay,
                  }}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    x: item.x,
                    y: item.y,
                  }}
                >
                  <Box
                    sx={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${colors.accent}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: colors.accent,
                    }}
                  >
                    {item.icon}
                  </Box>
                </motion.div>
              ))}
            </Box>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  textAlign: 'center',
                  mt: 4,
                  mb: 2,
                  fontSize: '2rem',
                  letterSpacing: '-0.02em',
                }}
              >
                AI-Powered Learning
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: colors.textSecondary,
                  textAlign: 'center',
                  maxWidth: '300px',
                  lineHeight: 1.6,
                  opacity: 0.8,
                }}
              >
                Transform static content into dynamic, interactive learning experiences with intelligent AI processing.
              </Typography>
            </motion.div>
          </motion.div>
        </Box>

        {/* Right Side - Form */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: { xs: 'center', lg: 'flex-start' },
            p: { xs: 4, lg: 8 },
            minHeight: '100vh',
          }}
        >
          <Box sx={{ width: '100%', maxWidth: '500px' }}>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                  fontWeight: 700,
                  color: 'white',
                  mb: 3,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                Create
                <br />
                <Box component="span" sx={{ color: colors.accent }}>
                  Content
                </Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: colors.textSecondary,
                  fontWeight: 400,
                  mb: 6,
                  fontSize: '1.2rem',
                  lineHeight: 1.5,
                  opacity: 0.9,
                }}
              >
                Transform your educational content into immersive learning experiences with AI-powered intelligence.
              </Typography>
            </motion.div>

            {!result ? (
              <form onSubmit={handleSubmit}>
                {/* Chapter Title Input */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <TextField
                    fullWidth
                    label="Chapter Title"
                    name="chapter"
                    value={formData.chapter}
                    onChange={handleInputChange}
                    required
                    variant="standard"
                    sx={{
                      mb: 4,
                      '& .MuiInput-root': {
                        '&:before': {
                          borderBottom: `2px solid ${colors.textSecondary}40`,
                        },
                        '&:hover:before': {
                          borderBottom: `2px solid ${colors.accent} !important`,
                        },
                        '&:after': {
                          borderBottom: `2px solid ${colors.accent}`,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: colors.textSecondary,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: colors.accent,
                        },
                      },
                      '& .MuiInput-input': {
                        color: 'white',
                        fontSize: '1.2rem',
                        padding: '12px 0',
                      },
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Create sx={{ color: colors.textSecondary, mr: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </motion.div>

                {/* Page Number Input */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <TextField
                    fullWidth
                    label="Page Number"
                    name="pageNumber"
                    type="number"
                    value={formData.pageNumber}
                    onChange={handleInputChange}
                    required
                    variant="standard"
                    sx={{
                      mb: 4,
                      '& .MuiInput-root': {
                        '&:before': {
                          borderBottom: `2px solid ${colors.textSecondary}40`,
                        },
                        '&:hover:before': {
                          borderBottom: `2px solid ${colors.accent} !important`,
                        },
                        '&:after': {
                          borderBottom: `2px solid ${colors.accent}`,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: colors.textSecondary,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: colors.accent,
                        },
                      },
                      '& .MuiInput-input': {
                        color: 'white',
                        fontSize: '1.2rem',
                        padding: '12px 0',
                      },
                    }}
                  />
                </motion.div>

                {/* Content Input */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <TextField
                    fullWidth
                    label="Educational Content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={6}
                    placeholder="Paste your textbook content here. Our AI will generate summaries, explanations, and interactive quizzes."
                    variant="standard"
                    sx={{
                      mb: 6,
                      '& .MuiInput-root': {
                        '&:before': {
                          borderBottom: `2px solid ${colors.textSecondary}40`,
                        },
                        '&:hover:before': {
                          borderBottom: `2px solid ${colors.accent} !important`,
                        },
                        '&:after': {
                          borderBottom: `2px solid ${colors.accent}`,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: colors.textSecondary,
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        '&.Mui-focused': {
                          color: colors.accent,
                        },
                      },
                      '& .MuiInput-input': {
                        color: 'white',
                        fontSize: '1rem',
                        lineHeight: 1.6,
                        padding: '12px 0',
                      },
                    }}
                  />
                </motion.div>

                {/* Error Alert */}
                {error && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      severity="error"
                      sx={{
                        mb: 4,
                        borderRadius: 2,
                        background: 'rgba(244, 67, 54, 0.1)',
                        border: `1px solid rgba(244, 67, 54, 0.3)`,
                        color: 'white',
                        '& .MuiAlert-icon': {
                          color: '#ff6b6b',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </motion.div>
                )}

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.02,
                      boxShadow: colors.glow,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      disabled={loading || !formData.chapter || !formData.pageNumber || !formData.content}
                      sx={{
                        py: 2.5,
                        px: 4,
                        borderRadius: 2,
                        background: colors.gradient,
                        color: 'white',
                        fontSize: '1.2rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: '0 8px 32px rgba(41, 151, 255, 0.3)',
                        border: 'none',
                        position: 'relative',
                        overflow: 'hidden',
                        '&:hover': {
                          background: colors.gradient,
                          boxShadow: '0 12px 40px rgba(41, 151, 255, 0.5)',
                        },
                        '&:disabled': {
                          background: colors.textSecondary,
                          color: colors.text,
                          boxShadow: 'none',
                        },
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover::before': {
                          left: '100%',
                        },
                      }}
                      endIcon={
                        <motion.div
                          animate={loading ? { rotate: 360 } : { x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {loading ? (
                            <CircularProgress size={20} sx={{ color: 'white' }} />
                          ) : (
                            <ArrowForward />
                          )}
                        </motion.div>
                      }
                    >
                      {loading ? 'Generating Content...' : 'Generate Learning Materials'}
                    </Button>
                  </motion.div>
                </motion.div>
              </form>
            ) : (
              /* Success State */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <Box textAlign="center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  >
                    <Box
                      sx={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: colors.gradient,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 4,
                        boxShadow: colors.glow,
                        position: 'relative',
                      }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <AutoAwesome sx={{ fontSize: 50, color: 'white' }} />
                      </motion.div>

                      {/* Success particles */}
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: Math.cos((i / 8) * Math.PI * 2) * 80,
                            y: Math.sin((i / 8) * Math.PI * 2) * 80,
                          }}
                          transition={{
                            duration: 1.5,
                            delay: 0.5 + i * 0.1,
                          }}
                          style={{
                            position: 'absolute',
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: colors.accent,
                            boxShadow: `0 0 10px ${colors.accent}`,
                          }}
                        />
                      ))}
                    </Box>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <Typography
                      variant="h3"
                      sx={{
                        color: 'white',
                        fontWeight: 700,
                        mb: 3,
                        fontSize: '2.5rem',
                      }}
                    >
                      Content Generated!
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        color: colors.textSecondary,
                        mb: 4,
                        lineHeight: 1.6,
                        opacity: 0.9,
                      }}
                    >
                      Your content has been transformed into interactive learning materials with AI-generated summaries, detailed explanations, and assessment quizzes.
                    </Typography>

                    {success && (
                      <Alert
                        severity="success"
                        sx={{
                          mb: 4,
                          borderRadius: 2,
                          background: 'rgba(76, 175, 80, 0.1)',
                          border: `1px solid rgba(76, 175, 80, 0.3)`,
                          color: 'white',
                          '& .MuiAlert-icon': {
                            color: '#4caf50',
                          },
                        }}
                      >
                        {success}
                      </Alert>
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <Box display="flex" gap={3} justifyContent="center" flexWrap="wrap">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="outlined"
                          size="large"
                          startIcon={<Create />}
                          onClick={handleCreateNew}
                          sx={{
                            borderColor: colors.accent,
                            color: 'white',
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&:hover': {
                              borderColor: colors.accent,
                              background: 'rgba(41, 151, 255, 0.1)',
                              boxShadow: `0 0 20px ${colors.accent}50`,
                            },
                          }}
                        >
                          Create New Content
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={<Send />}
                          onClick={handleViewContent}
                          sx={{
                            background: colors.gradient,
                            borderRadius: 2,
                            px: 4,
                            py: 1.5,
                            textTransform: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            boxShadow: colors.glow,
                            '&:hover': {
                              background: colors.gradient,
                              boxShadow: '0 0 40px rgba(41, 151, 255, 0.6)',
                            },
                          }}
                        >
                          View Content
                        </Button>
                      </motion.div>
                    </Box>
                  </motion.div>
                </Box>
              </motion.div>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ContentCreator;
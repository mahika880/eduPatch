import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Container,
  Paper,
  Grid,
  Fade,
  Slide,
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  School,
  Download,
  Psychology,
  Lightbulb,
  AutoAwesome,
  CloudDownload,
  WifiOff,
  ArrowBack,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { motion } from 'framer-motion';

const TextbookViewer = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

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
    // Check if content is cached offline
    const cachedContent = localStorage.getItem(`page_${pageId}`);
    if (cachedContent) {
      setPage(JSON.parse(cachedContent));
      setLoading(false);
    } else {
      fetchPage();
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

  const fetchPage = async () => {
    try {
      const response = await apiService.getPageById(pageId);
      setPage(response.data);
      
      // Cache content for offline access
      localStorage.setItem(`page_${pageId}`, JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to load page content.');
    } finally {
      setLoading(false);
    }
  };

  const downloadForOffline = () => {
    if (page) {
      // Already cached in localStorage
      alert('Content saved for offline access!');
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
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

        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.subtle}`,
            boxShadow: `0 4px 20px ${colors.shadow}`,
          }}
        >
          <Toolbar>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/admin/dashboard')}
              sx={{
                color: colors.text,
                mr: 2,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  background: colors.hover,
                },
              }}
            >
              Back
            </Button>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: colors.buttonBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <School sx={{ fontSize: 24, color: colors.buttonText }} />
            </Box>
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 600 }}>
              EduPatch - Loading...
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="60vh"
        >
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
              Loading content...
            </Typography>
          </motion.div>
        </Box>
      </Box>
    );
  }

  if (error || !page) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
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

        <AppBar
          position="static"
          elevation={0}
          sx={{
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
            borderBottom: `1px solid ${colors.subtle}`,
            boxShadow: `0 4px 20px ${colors.shadow}`,
          }}
        >
          <Toolbar>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate('/admin/dashboard')}
              sx={{
                color: colors.text,
                mr: 2,
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  background: colors.hover,
                },
              }}
            >
              Back
            </Button>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: colors.buttonBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <School sx={{ fontSize: 24, color: colors.buttonText }} />
            </Box>
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 600 }}>
              EduPatch - Error
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Alert
              severity="error"
              sx={{
                mb: 2,
                borderRadius: 3,
                background: 'rgba(244, 67, 54, 0.08)',
                border: `1px solid rgba(244, 67, 54, 0.2)`,
                color: colors.text,
                '& .MuiAlert-icon': {
                  color: '#d32f2f',
                },
              }}
            >
              {error || 'Page not found'}
            </Alert>
          </motion.div>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.primary,
        position: 'relative',
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

      {/* Clean Header */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: colors.glassBg,
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.subtle}`,
          boxShadow: `0 4px 20px ${colors.shadow}`,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => navigate('/admin/dashboard')}
            sx={{
              color: colors.text,
              mr: 2,
              textTransform: 'none',
              fontWeight: 500,
              '&:hover': {
                background: colors.hover,
              },
            }}
          >
            Back
          </Button>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: colors.buttonBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <School sx={{ fontSize: 24, color: colors.buttonText }} />
          </Box>
          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              color: colors.text,
              fontWeight: 600,
            }}
          >
            EduPatch - {page.chapter}
          </Typography>

          {isOffline && (
            <Chip
              icon={<WifiOff />}
              label="Offline Mode"
              sx={{
                background: colors.hover,
                color: colors.text,
                border: `1px solid ${colors.accent}30`,
                mr: 2,
              }}
              size="small"
            />
          )}

          <Button
            startIcon={<CloudDownload />}
            onClick={downloadForOffline}
            sx={{
              color: colors.buttonBg,
              fontWeight: 600,
              borderRadius: 2,
              px: 3,
              py: 1,
              textTransform: 'none',
              border: `1px solid ${colors.buttonBg}`,
              '&:hover': {
                background: colors.buttonBg,
                color: colors.buttonText,
                transform: 'translateY(-2px)',
                boxShadow: `0 8px 25px ${colors.shadow}`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Save Offline
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        {/* Quick Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Quiz />}
              onClick={() => navigate(`/quiz/${pageId}`)}
              size="large"
              sx={{
                py: 2.5,
                px: 6,
                borderRadius: 3,
                background: colors.buttonBg,
                color: colors.buttonText,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: `0 8px 32px ${colors.shadow}`,
                '&:hover': {
                  background: colors.buttonBg,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 40px ${colors.shadow}`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Take Interactive Quiz
            </Button>
          </Box>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card
            elevation={0}
            sx={{
              background: colors.glassBg,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              borderRadius: 4,
              boxShadow: `0 20px 40px ${colors.shadow}`,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: { xs: 4, md: 6 } }}>
              {/* Header Section */}
              <Box display="flex" alignItems="center" mb={5}>
                <Box
                  sx={{
                    width: 70,
                    height: 70,
                    borderRadius: 3,
                    background: colors.buttonBg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: `0 12px 30px ${colors.shadow}`,
                  }}
                >
                  <MenuBook sx={{ fontSize: 36, color: colors.buttonText }} />
                </Box>
                <Box>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                      color: colors.text,
                      fontWeight: 700,
                      mb: 2,
                      lineHeight: 1.2,
                      fontSize: { xs: '2rem', md: '2.5rem' },
                    }}
                  >
                    {page.chapter}
                  </Typography>
                  <Chip
                    label={`Page ${page.pageNumber}`}
                    sx={{
                      background: colors.accent,
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 2,
                      py: 0.5,
                    }}
                  />
                </Box>
              </Box>

              <Divider
                sx={{
                  my: 5,
                  background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                  height: 1,
                  border: 'none',
                }}
              />

              {/* Content Section */}
              <Box mb={6}>
                <Box display="flex" alignItems="center" mb={4}>
                  <MenuBook sx={{ color: colors.accent, mr: 2, fontSize: '2rem' }} />
                  <Typography
                    variant="h4"
                    sx={{
                      color: colors.text,
                      fontWeight: 600,
                      fontSize: '1.5rem',
                    }}
                  >
                    Content
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 5,
                    background: colors.secondary,
                    border: `1px solid ${colors.subtle}`,
                    borderRadius: 3,
                    boxShadow: `0 8px 24px ${colors.shadow}`,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                      color: colors.text,
                    }}
                  >
                    {page.content}
                  </Typography>
                </Paper>
              </Box>

              {/* AI Summary Section */}
              {page.summary && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box mb={6}>
                    <Box display="flex" alignItems="center" mb={4}>
                      <AutoAwesome sx={{ color: colors.accent, mr: 2, fontSize: '2rem' }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          fontSize: '1.5rem',
                        }}
                      >
                        AI-Generated Summary
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        background: colors.buttonBg,
                        borderRadius: 3,
                        overflow: 'hidden',
                        boxShadow: `0 12px 30px ${colors.shadow}`,
                      }}
                    >
                      <Box sx={{ p: 5 }}>
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.buttonText,
                            lineHeight: 1.7,
                            fontSize: '1.1rem',
                          }}
                        >
                          {page.summary}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </motion.div>
              )}

              {/* Detailed Explanation Section */}
              {page.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box mb={6}>
                    <Box display="flex" alignItems="center" mb={4}>
                      <Psychology sx={{ color: colors.accent, mr: 2, fontSize: '2rem' }} />
                      <Typography
                        variant="h4"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          fontSize: '1.5rem',
                        }}
                      >
                        Detailed Explanation
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 5,
                        background: colors.secondary,
                        border: `1px solid ${colors.subtle}`,
                        borderRadius: 3,
                        boxShadow: `0 8px 24px ${colors.shadow}`,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{
                          lineHeight: 1.7,
                          fontSize: '1.1rem',
                          color: colors.text,
                        }}
                      >
                        {page.explanation}
                      </Typography>
                    </Paper>
                  </Box>
                </motion.div>
              )}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Box sx={{ textAlign: 'center', mt: 6 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 6,
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      borderRadius: 4,
                      mb: 4,
                      boxShadow: `0 12px 30px ${colors.shadow}`,
                    }}
                  >
                    <Lightbulb sx={{ fontSize: 48, color: colors.accent, mb: 3 }} />
                    <Typography
                      variant="h4"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 3,
                        fontSize: '1.8rem',
                      }}
                    >
                      Ready to Test Your Knowledge?
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: colors.textSecondary,
                        mb: 4,
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                      }}
                    >
                      Take our interactive quiz to reinforce your understanding of this content
                    </Typography>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Quiz />}
                      onClick={() => navigate(`/quiz/${pageId}`)}
                      sx={{
                        py: 2.5,
                        px: 6,
                        borderRadius: 3,
                        background: colors.buttonBg,
                        color: colors.buttonText,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        boxShadow: `0 8px 32px ${colors.shadow}`,
                        '&:hover': {
                          background: colors.buttonBg,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 40px ${colors.shadow}`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Quiz Now
                    </Button>
                  </Paper>
                </Box>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </Box>
  );
};

export default TextbookViewer;
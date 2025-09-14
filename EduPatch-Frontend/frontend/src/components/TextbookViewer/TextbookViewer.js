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
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const TextbookViewer = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
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
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: `0 4px 20px ${colors.primary}20`,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <School sx={{ fontSize: 24, color: colors.primary }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
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
          <CircularProgress 
            size={60}
            sx={{ color: colors.secondary, mb: 3 }}
          />
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading content...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (error || !page) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)`,
        }}
      >
        <AppBar 
          position="static" 
          elevation={0}
          sx={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
            boxShadow: `0 4px 20px ${colors.primary}20`,
          }}
        >
          <Toolbar>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 2,
              }}
            >
              <School sx={{ fontSize: 24, color: colors.primary }} />
            </Box>
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 600 }}>
              EduPatch - Error
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert 
            severity="error" 
            sx={{ 
              mb: 2,
              borderRadius: 3,
              background: 'rgba(244, 67, 54, 0.1)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
            }}
          >
            {error || 'Page not found'}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 50%, ${colors.accent}20 100%)`,
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
      {/* Professional Header */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          backdropFilter: 'blur(20px)',
          boxShadow: `0 4px 20px ${colors.primary}20`,
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: `0 4px 15px ${colors.accent}40`,
            }}
          >
            <School sx={{ fontSize: 24, color: colors.primary }} />
          </Box>
          <Typography 
            variant="h6" 
            sx={{ 
              flexGrow: 1,
              color: 'white',
              fontWeight: 700,
              textShadow: `0 2px 8px ${colors.primary}60`,
            }}
          >
            EduPatch - {page.chapter}
          </Typography>
          
          {isOffline && (
            <Chip 
              icon={<WifiOff />}
              label="Offline Mode" 
              sx={{
                background: `${colors.accent}30`,
                color: 'white',
                border: `1px solid ${colors.accent}60`,
                mr: 2,
              }}
              size="small" 
            />
          )}
          
          <Button
            color="inherit"
            startIcon={<CloudDownload />}
            onClick={downloadForOffline}
            sx={{
              color: 'white',
              fontWeight: 600,
              borderRadius: 2,
              px: 2,
              py: 1,
              textTransform: 'none',
              background: `${colors.accent}20`,
              border: `1px solid ${colors.accent}40`,
              '&:hover': {
                background: `${colors.accent}30`,
                transform: 'translateY(-1px)',
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
        <Fade in={true} timeout={800}>
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<Quiz />}
              onClick={() => navigate(`/quiz/${pageId}`)}
              size="large"
              sx={{
                py: 2,
                px: 4,
                borderRadius: 3,
                background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: `0 8px 25px ${colors.secondary}40`,
                '&:hover': {
                  background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 12px 35px ${colors.secondary}50`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Take Interactive Quiz
            </Button>
          </Box>
        </Fade>

        {/* Main Content Card */}
        <Slide direction="up" in={true} timeout={1000}>
          <Card 
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 3,
              boxShadow: `0 8px 40px ${colors.primary}12`,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Header Section */}
              <Box display="flex" alignItems="center" mb={4}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 2,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 3,
                    boxShadow: `0 8px 25px ${colors.primary}30`,
                  }}
                >
                  <MenuBook sx={{ fontSize: 32, color: 'white' }} />
                </Box>
                <Box>
                  <Typography 
                    variant="h3" 
                    component="h1"
                    sx={{
                      color: colors.primary,
                      fontWeight: 700,
                      mb: 1,
                      lineHeight: 1.2,
                    }}
                  >
                    {page.chapter}
                  </Typography>
                  <Chip 
                    label={`Page ${page.pageNumber}`} 
                    sx={{
                      background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                      color: colors.primary,
                      fontWeight: 600,
                      fontSize: '0.9rem',
                    }}
                  />
                </Box>
              </Box>

              <Divider 
                sx={{ 
                  my: 4,
                  background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
                  height: 2,
                  border: 'none',
                }} 
              />

              {/* Content Section */}
              <Box mb={5}>
                <Box display="flex" alignItems="center" mb={3}>
                  <MenuBook sx={{ color: colors.secondary, mr: 2 }} />
                  <Typography 
                    variant="h4" 
                    sx={{
                      color: colors.primary,
                      fontWeight: 600,
                    }}
                  >
                    Content
                  </Typography>
                </Box>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}30)`,
                    border: `1px solid ${colors.accent}40`,
                    borderRadius: 3,
                  }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      lineHeight: 1.8, 
                      fontSize: '1.1rem',
                      color: colors.primary,
                    }}
                  >
                    {page.content}
                  </Typography>
                </Paper>
              </Box>

              {/* AI Summary Section */}
              {page.summary && (
                <Fade in={true} timeout={1200}>
                  <Box mb={5}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <AutoAwesome sx={{ color: colors.secondary, mr: 2 }} />
                      <Typography 
                        variant="h4" 
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                        }}
                      >
                        AI-Generated Summary
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                        borderRadius: 3,
                        overflow: 'hidden',
                      }}
                    >
                      <Box sx={{ p: 4 }}>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: 'white',
                            lineHeight: 1.7,
                            fontSize: '1.1rem',
                            textShadow: `0 1px 3px ${colors.primary}40`,
                          }}
                        >
                          {page.summary}
                        </Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Fade>
              )}

              {/* Detailed Explanation Section */}
              {page.explanation && (
                <Fade in={true} timeout={1400}>
                  <Box mb={5}>
                    <Box display="flex" alignItems="center" mb={3}>
                      <Psychology sx={{ color: colors.secondary, mr: 2 }} />
                      <Typography 
                        variant="h4" 
                        sx={{
                          color: colors.primary,
                          fontWeight: 600,
                        }}
                      >
                        Detailed Explanation
                      </Typography>
                    </Box>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 4,
                        background: `${colors.accent}15`,
                        border: `1px solid ${colors.accent}60`,
                        borderRadius: 3,
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          lineHeight: 1.7,
                          fontSize: '1.1rem',
                          color: colors.primary,
                        }}
                      >
                        {page.explanation}
                      </Typography>
                    </Paper>
                  </Box>
                </Fade>
              )}

              {/* Call to Action */}
              <Fade in={true} timeout={1600}>
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      background: `linear-gradient(135deg, ${colors.light}60, ${colors.accent}30)`,
                      border: `2px solid ${colors.accent}60`,
                      borderRadius: 3,
                      mb: 3,
                    }}
                  >
                    <Lightbulb sx={{ fontSize: 48, color: colors.secondary, mb: 2 }} />
                    <Typography 
                      variant="h5" 
                      sx={{
                        color: colors.primary,
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      Ready to Test Your Knowledge?
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{
                        color: colors.secondary,
                        mb: 3,
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
                        py: 2,
                        px: 4,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: `0 8px 25px ${colors.primary}40`,
                        '&:hover': {
                          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 12px 35px ${colors.primary}50`,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Start Quiz Now
                    </Button>
                  </Paper>
                </Box>
              </Fade>
            </CardContent>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default TextbookViewer;
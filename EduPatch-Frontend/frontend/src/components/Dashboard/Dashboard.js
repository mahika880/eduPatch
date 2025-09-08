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
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Visibility,
  AutoAwesome,
  TrendingUp,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await apiService.getAllPages();
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching pages:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
        sx={{
          background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
          borderRadius: 3,
          margin: 2,
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60} 
            sx={{ 
              color: '#FFFFFF',
              mb: 2,
            }} 
          />
          <Typography variant="h6" sx={{ color: '#FFFFFF' }}>
            Loading your content...
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF0F5 0%, #FFE4E1 100%)',
      py: 3
    }}>
      <Container maxWidth="xl">
        {/* Welcome Header */}
        <Box 
          sx={{
            background: 'linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)',
            borderRadius: 4,
            p: 4,
            mb: 4,
            color: '#FFFFFF',
            boxShadow: '0 8px 32px rgba(255, 182, 193, 0.4)',
          }}
        >
          <Typography 
            variant="h3" 
            gutterBottom
            align="center"
            sx={{ 
              fontWeight: 700,
              color: '#FFFFFF',
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            💖 Welcome Back, Admin!
          </Typography>
          <Typography 
            variant="h6" 
            align="center" 
            sx={{ 
              opacity: 0.9,
              fontWeight: 300,
              mb: 3,
            }}
          >
            Your AI-Powered Learning Platform
          </Typography>
          
          {/* Stats Cards */}
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  {pages.length}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Total Content
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  {pages.length * 5}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  AI Quizzes
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  100%
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  AI Generated
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: 2,
                p: 2,
                textAlign: 'center',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                backdropFilter: 'blur(10px)'
              }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#FFFFFF' }}>
                  24/7
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Available
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Content Grid */}
        {pages.length === 0 ? (
          <Card 
            sx={{
              textAlign: 'center',
              p: 6,
              background: 'linear-gradient(135deg, #FFCCCB 0%, #FFB6C1 100%)',
              color: '#8B008B',
              borderRadius: 4,
              boxShadow: '0 8px 32px rgba(255, 182, 193, 0.3)',
            }}
          >
            <AutoAwesome sx={{ fontSize: 80, mb: 2, opacity: 0.8, color: '#8B008B' }} />
            <Typography variant="h4" gutterBottom fontWeight={600} sx={{ color: '#8B008B' }}>
              Ready to Create Amazing Content?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.8 }}>
              Start by creating your first AI-powered educational content!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/admin/create')}
              sx={{
                background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
                color: '#FFFFFF',
                px: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 600,
                '&:hover': {
                  background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 24px rgba(255, 105, 180, 0.4)',
                },
              }}
            >
              Create Your First Content
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {pages.map((page, index) => (
              <Grid item xs={12} md={6} lg={4} key={page.pageId}>
                <Card 
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'linear-gradient(135deg, #FFFFFF 0%, #FFF0F5 100%)',
                    borderRadius: 3,
                    boxShadow: '0 8px 32px rgba(255, 182, 193, 0.2)',
                    border: '1px solid rgba(255, 182, 193, 0.2)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 16px 48px rgba(255, 182, 193, 0.3)',
                    },
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '4px',
                      background: `linear-gradient(90deg, 
                        ${index % 3 === 0 ? '#FFB6C1, #FFC0CB' : 
                          index % 3 === 1 ? '#FF69B4, #FFB6C1' : 
                          '#DDA0DD, #FFCCCB'})`,
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box display="flex" alignItems="center" mb={2}>
                      <MenuBook 
                        sx={{ 
                          mr: 1, 
                          color: index % 3 === 0 ? '#FF69B4' : 
                                 index % 3 === 1 ? '#FFB6C1' : '#DDA0DD'
                        }} 
                      />
                      <Typography 
                        variant="h6" 
                        component="h2" 
                        fontWeight={600}
                        sx={{ color: '#8B008B' }}
                      >
                        {page.chapter}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={`Page ${page.pageNumber}`} 
                      size="small" 
                      sx={{
                        mb: 2,
                        backgroundColor: index % 3 === 0 ? '#FFE4E1' : 
                                       index % 3 === 1 ? '#FFCCCB' : '#F0E6FF',
                        color: '#8B008B',
                        fontWeight: 600,
                      }}
                    />
                    
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      sx={{ lineHeight: 1.6, color: '#8B008B', opacity: 0.8 }}
                    >
                      {page.content.substring(0, 150)}...
                    </Typography>
                    
                    {page.summary && (
                      <Box 
                        sx={{ 
                          mt: 2, 
                          p: 2, 
                          background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
                          borderRadius: 2,
                          color: '#FFFFFF',
                        }}
                      >
                        <Typography variant="body2" fontWeight={600}>
                          <AutoAwesome sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                          AI Summary: {page.summary.substring(0, 100)}...
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  
                  <CardActions sx={{ p: 3, pt: 0, gap: 1 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/page/${page.pageId}`)}
                      sx={{ 
                        borderRadius: 2,
                        borderColor: '#FF69B4',
                        color: '#FF69B4',
                        '&:hover': {
                          borderColor: '#FFB6C1',
                          backgroundColor: 'rgba(255, 105, 180, 0.1)',
                        }
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<Quiz />}
                      onClick={() => navigate(`/quiz/${page.pageId}`)}
                      sx={{ 
                        borderRadius: 2,
                        borderColor: '#FFB6C1',
                        color: '#FFB6C1',
                        '&:hover': {
                          borderColor: '#FF69B4',
                          backgroundColor: 'rgba(255, 182, 193, 0.1)',
                        }
                      }}
                    >
                      Take Quiz
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      startIcon={<QrCode />}
                      onClick={() => window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/pages/${page.pageId}/qrcode`, '_blank')}
                      sx={{ 
                        borderRadius: 2,
                        borderColor: '#DDA0DD',
                        color: '#DDA0DD',
                        '&:hover': {
                          borderColor: '#DA70D6',
                          backgroundColor: 'rgba(221, 160, 221, 0.1)',
                        }
                      }}
                    >
                      QR Code
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Floating Action Button */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            zIndex: 1000,
          }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/admin/create')}
            sx={{
              borderRadius: '50px',
              px: 3,
              py: 1.5,
              background: 'linear-gradient(135deg, #FF69B4 0%, #FFB6C1 100%)',
              color: '#FFFFFF',
              boxShadow: '0 8px 32px rgba(255, 105, 180, 0.4)',
              fontWeight: 600,
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: '0 12px 40px rgba(255, 105, 180, 0.5)',
                background: 'linear-gradient(135deg, #FFB6C1 0%, #FF69B4 100%)',
              },
            }}
          >
            <AutoAwesome sx={{ mr: 1 }} />
            Create Content
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;
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
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
  };

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
        minHeight="100vh"
        sx={{
          background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
        }}
      >
        <Box textAlign="center">
          <CircularProgress 
            size={60} 
            sx={{ color: colors.primary, mb: 2 }} 
          />
          <Typography variant="h6" sx={{ color: colors.primary }}>
            Loading your dashboard...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 100%)`,
      p: 3
    }}>
      <Container maxWidth="xl">
        {/* Welcome Header */}
        <Card sx={{
          mb: 4,
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          color: 'white',
          borderRadius: 3,
        }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
              Welcome back, Admin! 👋
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Your AI-powered learning platform
            </Typography>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card sx={{ mb: 4, p: 3, borderRadius: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: colors.primary }}>
            🚀 Quick Actions
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<MenuBook />}
                onClick={() => navigate('/admin/create')}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  background: colors.primary,
                  '&:hover': { background: colors.secondary }
                }}
              >
                Create Content
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Quiz />}
                onClick={() => navigate('/admin/create')}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  background: colors.secondary,
                  '&:hover': { background: colors.primary }
                }}
              >
                Generate Quiz
              </Button>
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<QrCode />}
                sx={{
                  py: 2,
                  borderRadius: 3,
                  background: colors.accent,
                  color: colors.primary,
                  '&:hover': { background: colors.light }
                }}
              >
                Scan QR Code
              </Button>
            </Grid>
          </Grid>
        </Card>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { title: 'Total Content', value: pages.length, icon: <MenuBook /> },
            { title: 'AI Quizzes', value: pages.length * 5, icon: <Quiz /> },
            { title: 'Success Rate', value: '98%', icon: <AutoAwesome /> },
            { title: 'AI Generated', value: '100%', icon: <AutoAwesome /> },
          ].map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <Card sx={{ p: 3, borderRadius: 3, textAlign: 'center' }}>
                <Box sx={{ color: colors.primary, mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.secondary }}>
                  {stat.title}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Content Grid */}
        {pages.length === 0 ? (
          <Card sx={{ textAlign: 'center', p: 6, borderRadius: 3 }}>
            <AutoAwesome sx={{ fontSize: 80, mb: 2, color: colors.accent }} />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: colors.primary }}>
              Ready to Create Amazing Content?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, color: colors.secondary }}>
              Start by creating your first AI-powered educational content!
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/admin/create')}
              sx={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
                px: 4,
                py: 1.5,
                borderRadius: 3,
              }}
            >
              Create Your First Content
            </Button>
          </Card>
        ) : (
          <Grid container spacing={3}>
            {pages.map((page) => (
              <Grid item xs={12} md={6} lg={4} key={page.pageId}>
                <Card sx={{ borderRadius: 3, height: '100%' }}>
                  <CardContent>
                    <Box display="flex" alignItems="center" mb={2}>
                      <MenuBook sx={{ mr: 1, color: colors.secondary }} />
                      <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary }}>
                        {page.chapter}
                      </Typography>
                    </Box>
                    
                    <Chip 
                      label={`Page ${page.pageNumber}`} 
                      size="small" 
                      sx={{ mb: 2, backgroundColor: colors.light, color: colors.primary }}
                    />
                    
                    <Typography variant="body2" sx={{ color: colors.secondary, mb: 2 }}>
                      {page.content.substring(0, 150)}...
                    </Typography>
                    
                    {page.summary && (
                      <Box sx={{ p: 2, background: colors.lightest, borderRadius: 2 }}>
                        <Typography variant="caption" sx={{ color: colors.primary }}>
                          <AutoAwesome sx={{ fontSize: 14, mr: 1 }} />
                          AI Summary: {page.summary.substring(0, 60)}...
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  
                  <CardActions>
                    <Button
                      size="small"
                      startIcon={<Visibility />}
                      onClick={() => navigate(`/page/${page.pageId}`)}
                      sx={{ color: colors.primary }}
                    >
                      View
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Quiz />}
                      onClick={() => navigate(`/quiz/${page.pageId}`)}
                      sx={{ color: colors.secondary }}
                    >
                      Quiz
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Dashboard;
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
  Snackbar,
  Alert,
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Visibility,
  AutoAwesome,
  Create,
  CloudDownload,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';

const Dashboard = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
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

  // QR Code download handler
  const handleDownloadQR = async (pageId, chapterName) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://edupatch.onrender.com'}/pages/${pageId}/qrcode`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `qr-${chapterName.replace(/\s+/g, '-')}-${pageId}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        
        setSnackbar({
          open: true,
          message: `QR Code for "${chapterName}" downloaded successfully! 📱`,
          severity: 'success'
        });
      } else {
        throw new Error('Failed to download QR code');
      }
    } catch (error) {
      console.error('Error downloading QR code:', error);
      setSnackbar({
        open: true,
        message: 'Failed to download QR code. Please try again.',
        severity: 'error'
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
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
    <Container maxWidth="xl" sx={{ p: 3 }}>
      {/* Welcome Header */}
      <Card sx={{
        mb: 4,
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        color: 'white',
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          transform: 'translate(50px, -50px)',
        }
      }}>
        <CardContent sx={{ p: 4, position: 'relative', zIndex: 1 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
            Welcome back, Admin! 👋
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, mb: 2 }}>
            Your AI-powered learning platform is ready
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8 }}>
            {pages.length} content pieces created • {pages.length * 5} AI quizzes generated
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
              startIcon={<Create />}
              onClick={() => navigate('/admin/create')}
              sx={{
                py: 2,
                borderRadius: 3,
                background: colors.primary,
                '&:hover': { 
                  background: colors.secondary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${colors.primary}40`,
                },
                transition: 'all 0.3s ease',
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
              onClick={() => navigate('/admin/quizzes')}
              sx={{
                py: 2,
                borderRadius: 3,
                background: colors.secondary,
                '&:hover': { 
                  background: colors.primary,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${colors.secondary}40`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Manage Quizzes
            </Button>
          </Grid>
          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CloudDownload />}
              onClick={() => navigate('/admin/cache')}
              sx={{
                py: 2,
                borderRadius: 3,
                background: colors.accent,
                color: colors.primary,
                '&:hover': { 
                  background: colors.light,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 8px 25px ${colors.accent}40`,
                },
                transition: 'all 0.3s ease',
              }}
            >
              Offline Cache
            </Button>
          </Grid>
        </Grid>
      </Card>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { title: 'Total Content', value: pages.length, icon: <MenuBook />, color: colors.primary },
          { title: 'AI Quizzes', value: pages.length * 5, icon: <Quiz />, color: colors.secondary },
          { title: 'Success Rate', value: '98%', icon: <AutoAwesome />, color: colors.accent },
          { title: 'AI Generated', value: '100%', icon: <AutoAwesome />, color: colors.primary },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card sx={{ 
              p: 3, 
              borderRadius: 3, 
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: `0 10px 30px ${stat.color}20`,
              }
            }}>
              <Box sx={{ 
                color: stat.color, 
                mb: 2,
                p: 2,
                borderRadius: '50%',
                background: `${stat.color}10`,
                display: 'inline-flex',
              }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: colors.primary, mb: 1 }}>
                {stat.value}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.secondary, fontWeight: 500 }}>
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
            startIcon={<Create />}
            onClick={() => navigate('/admin/create')}
            sx={{
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              px: 4,
              py: 1.5,
              borderRadius: 3,
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: `0 10px 30px ${colors.primary}40`,
              },
              transition: 'all 0.3s ease',
            }}
          >
            Create Your First Content
          </Button>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {pages.map((page, index) => (
            <Grid item xs={12} md={6} lg={4} key={page.pageId}>
              <Card sx={{ 
                borderRadius: 3, 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: `0 10px 30px ${colors.primary}15`,
                }
              }}>
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
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => navigate(`/page/${page.pageId}`)}
                    sx={{ 
                      color: colors.primary,
                      '&:hover': {
                        background: `${colors.primary}10`,
                      }
                    }}
                  >
                    View
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Quiz />}
                    onClick={() => navigate(`/quiz/${page.pageId}`)}
                    sx={{ 
                      color: colors.secondary,
                      '&:hover': {
                        background: `${colors.secondary}10`,
                      }
                    }}
                  >
                    Quiz
                  </Button>
                  <Button
                    size="small"
                    startIcon={<QrCode />}
                    onClick={() => handleDownloadQR(page.pageId, page.chapter)}
                    sx={{ 
                      color: colors.accent,
                      '&:hover': {
                        color: colors.primary,
                        background: `${colors.accent}20`,
                      }
                    }}
                  >
                    QR
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Success/Error Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ 
            borderRadius: 2,
            '& .MuiAlert-icon': {
              fontSize: '1.5rem'
            }
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Dashboard;
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
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  QrCode,
  Visibility,
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
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h1" gutterBottom align="center">
        📚 EduPatch Dashboard
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Your AI-Powered Learning Platform
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {pages.map((page) => (
          <Grid item xs={12} md={6} lg={4} key={page.pageId}>
            <Card>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <MenuBook color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="h2">
                    {page.chapter}
                  </Typography>
                </Box>
                
                <Chip 
                  label={`Page ${page.pageNumber}`} 
                  size="small" 
                  color="secondary" 
                  sx={{ mb: 2 }}
                />
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {page.content.substring(0, 150)}...
                </Typography>
                
                {page.summary && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                    <Typography variant="body2" color="white">
                      <strong>AI Summary:</strong> {page.summary.substring(0, 100)}...
                    </Typography>
                  </Box>
                )}
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Visibility />}
                  onClick={() => navigate(`/page/${page.pageId}`)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  startIcon={<Quiz />}
                  onClick={() => navigate(`/quiz/${page.pageId}`)}
                >
                  Take Quiz
                </Button>
                <Button
                  size="small"
                  startIcon={<QrCode />}
                  onClick={() => window.open(`${process.env.REACT_APP_API_URL || 'http://localhost:8080'}/pages/${page.pageId}/qrcode`, '_blank')}
                >
                  QR Code
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {pages.length === 0 && (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="text.secondary">
            No content available yet.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 2 }}
            onClick={() => navigate('/create')}
          >
            Create Your First Content
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
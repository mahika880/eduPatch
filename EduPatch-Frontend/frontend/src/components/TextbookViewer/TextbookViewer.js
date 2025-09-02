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
  Container,  // Add this import
} from '@mui/material';
import {
  MenuBook,
  Quiz,
  School,
  Download,
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
      <Box>
        <AppBar position="static" color="primary">
          <Toolbar>
            <School sx={{ mr: 2 }} />
            <Typography variant="h6">
              EduPatch - Loading...
            </Typography>
          </Toolbar>
        </AppBar>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error || !page) {
    return (
      <Box>
        <AppBar position="static" color="primary">
          <Toolbar>
            <School sx={{ mr: 2 }} />
            <Typography variant="h6">
              EduPatch - Error
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error || 'Page not found'}
          </Alert>
        </Container>
      </Box>
    );
  }

  return (
    <Box>
      {/* Student-friendly header */}
      <AppBar position="static" color="primary">
        <Toolbar>
          <School sx={{ mr: 2 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            EduPatch - {page.chapter}
          </Typography>
          {isOffline && (
            <Chip label="Offline Mode" color="secondary" size="small" />
          )}
          <Button
            color="inherit"
            startIcon={<Download />}
            onClick={downloadForOffline}
            size="small"
          >
            Save Offline
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Quiz />}
            onClick={() => navigate(`/quiz/${pageId}`)}
            size="large"
          >
            Take Quiz
          </Button>
        </Box>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Box display="flex" alignItems="center" mb={2}>
              <MenuBook color="primary" sx={{ mr: 2, fontSize: 32 }} />
              <Box>
                <Typography variant="h4" component="h1">
                  {page.chapter}
                </Typography>
                <Chip 
                  label={`Page ${page.pageNumber}`} 
                  color="secondary" 
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom color="primary">
              📖 Content
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 4 }}>
              {page.content}
            </Typography>

            {page.summary && (
              <>
                <Typography variant="h5" gutterBottom color="primary">
                  🤖 AI-Generated Summary
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'primary.light', borderRadius: 2, mb: 4 }}>
                  <Typography variant="body1" color="white" sx={{ lineHeight: 1.6 }}>
                    {page.summary}
                  </Typography>
                </Box>
              </>
            )}

            {page.explanation && (
              <>
                <Typography variant="h5" gutterBottom color="primary">
                  💡 Detailed Explanation
                </Typography>
                <Box sx={{ p: 3, bgcolor: 'grey.100', borderRadius: 2, mb: 4 }}>
                  <Typography variant="body1" sx={{ lineHeight: 1.6 }}>
                    {page.explanation}
                  </Typography>
                </Box>
              </>
            )}

            <Box sx={{ textAlign: 'center', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Quiz />}
                onClick={() => navigate(`/quiz/${pageId}`)}
              >
                Test Your Knowledge
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TextbookViewer;
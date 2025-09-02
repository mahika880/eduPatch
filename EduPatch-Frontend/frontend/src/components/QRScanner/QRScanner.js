import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Alert,
  TextField,
} from '@mui/material';
import {
  QrCodeScanner,
  Link as LinkIcon,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QRScanner = () => {
  const [manualUrl, setManualUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleManualSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Extract page ID from URL
      const urlPattern = /\/pages\/([a-zA-Z0-9]+)/;
      const match = manualUrl.match(urlPattern);
      
      if (match && match[1]) {
        const pageId = match[1];
        navigate(`/page/${pageId}`);
      } else {
        setError('Invalid URL format. Please enter a valid EduPatch page URL.');
      }
    } catch (err) {
      setError('Failed to process URL. Please try again.');
    }
  };

  return (
    <Box>
      <Typography variant="h2" gutterBottom align="center">
        📱 QR Code Scanner
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" paragraph>
        Scan QR codes from textbooks to access content
      </Typography>

      <Card sx={{ maxWidth: 600, mx: 'auto', mb: 3 }}>
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <QrCodeScanner sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            Camera Scanner
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Camera-based QR scanning will be available in the mobile app version.
            For now, you can manually enter the page URL below.
          </Typography>
          <Alert severity="info" sx={{ mt: 2 }}>
            📱 <strong>Mobile App Coming Soon!</strong> Full QR scanning functionality will be available in our mobile application.
          </Alert>
        </CardContent>
      </Card>

      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <LinkIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">
              Manual URL Entry
            </Typography>
          </Box>
          
          <Typography variant="body2" color="text.secondary" paragraph>
            Enter the full URL from a QR code or page link:
          </Typography>
          
          <form onSubmit={handleManualSubmit}>
            <TextField
              fullWidth
              label="Page URL"
              value={manualUrl}
              onChange={(e) => setManualUrl(e.target.value)}
              placeholder="e.g., http://localhost:8080/pages/68b41a71a1c67d931884d637"
              margin="normal"
              required
            />
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={<Search />}
              sx={{ mt: 3 }}
              disabled={!manualUrl.trim()}
            >
              Access Content
            </Button>
          </form>
          
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>How to use:</strong>
              <br />1. Get a QR code URL from the dashboard or content creator
              <br />2. Paste the complete URL above
              <br />3. Click "Access Content" to view the page
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QRScanner;
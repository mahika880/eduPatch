import React, { useState } from 'react';
import {
  Typography,
  Box,
  Button,
  Alert,
  TextField,
  Container,
  InputAdornment,
} from '@mui/material';
import {
  QrCodeScanner,
  Link as LinkIcon,
  Search,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Landing Page Consistent Color Palette
const colors = {
  primary: '#FFFFFF',
  secondary: '#FAFAFA',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  accentSecondary: '#4F46E5',
  subtle: '#F1F5F9',
  hover: 'rgba(41, 151, 255, 0.08)',
  shadow: 'rgba(0, 0, 0, 0.1)',
  buttonBg: '#000000',
  buttonText: '#FFFFFF',
  glassBg: 'rgba(255, 255, 255, 0.8)',
};

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
          right: 0,
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.hover} 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.6,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.accent}10 0%, transparent 70%)`,
          borderRadius: '50%',
          opacity: 0.4,
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
                  QR Code Scanner
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
                  Access educational content instantly by scanning QR codes or entering URLs
                </Typography>
              </Box>
            </motion.div>

            {/* Camera Scanner Card */}
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
                  mb: 4,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
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
                      mx: 'auto',
                      mb: 3,
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                    }}
                  >
                    <QrCodeScanner sx={{ fontSize: 36, color: colors.buttonText }} />
                  </Box>
                </motion.div>

                <Typography
                  variant="h5"
                  sx={{
                    color: colors.text,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  Camera Scanner
                </Typography>

                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textSecondary,
                    mb: 4,
                    lineHeight: 1.6,
                  }}
                >
                  Camera-based QR scanning will be available in our mobile app version.
                  For now, you can manually enter the page URL below.
                </Typography>

                <Alert
                  severity="info"
                  sx={{
                    borderRadius: 3,
                    background: 'rgba(41, 151, 255, 0.08)',
                    border: `1px solid rgba(41, 151, 255, 0.2)`,
                    '& .MuiAlert-icon': {
                      color: colors.accent,
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    📱 <strong>Mobile App Coming Soon!</strong> Full QR scanning functionality will be available in our mobile application.
                  </Typography>
                </Alert>
              </Box>
            </motion.div>

            {/* Manual URL Entry Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
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
                <Box display="flex" alignItems="center" mb={4}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: colors.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                    }}
                  >
                    <LinkIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 0.5,
                      }}
                    >
                      Manual URL Entry
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                      }}
                    >
                      Enter the full URL from a QR code or page link
                    </Typography>
                  </Box>
                </Box>

                <form onSubmit={handleManualSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <TextField
                      fullWidth
                      label="Page URL"
                      value={manualUrl}
                      onChange={(e) => setManualUrl(e.target.value)}
                      placeholder="e.g., http://localhost:8080/pages/68b41a71a1c67d931884d637"
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
                            <Search sx={{ color: colors.textSecondary }} />
                          </InputAdornment>
                        ),
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
                      disabled={!manualUrl.trim()}
                      endIcon={!manualUrl.trim() ? null : <ArrowForward />}
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
                      {manualUrl.trim() ? 'Access Content' : 'Enter URL to Continue'}
                    </Button>
                  </motion.div>
                </form>

                {/* Instructions */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box
                    sx={{
                      mt: 4,
                      p: 3,
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      borderRadius: 3,
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      How to use:
                    </Typography>
                    <Box component="ul" sx={{ m: 0, pl: 3 }}>
                      <Typography component="li" variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                        Get a QR code URL from the dashboard or content creator
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: colors.textSecondary, mb: 1 }}>
                        Paste the complete URL in the field above
                      </Typography>
                      <Typography component="li" variant="body2" sx={{ color: colors.textSecondary }}>
                        Click "Access Content" to view the page
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default QRScanner;
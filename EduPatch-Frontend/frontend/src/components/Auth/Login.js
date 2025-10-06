import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
  Container,
} from '@mui/material';
import {
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  School,
  Login as LoginIcon,
  Google,
  Facebook,
  ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = ({ onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Modern EduPatch Color Palette
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    subtle: '#E8E8E8',
    glassBg: 'rgba(255, 255, 255, 0.7)',
    hover: 'rgba(41, 151, 255, 0.08)',
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('Attempting login with:', { email: formData.email, password: formData.password });

    const result = await login(formData.email, formData.password);
    
    console.log('Login result:', result);
    
    if (result.success) {
      console.log('Login successful, navigating to dashboard');
      navigate('/admin/dashboard');
    } else {
      console.error('Login failed:', result.error);
      setError(result.error || 'Login failed. Please check your credentials.');
    }
    
    setLoading(false);
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
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 0% 0%, ${colors.accent}08 0%, transparent 30%),
            radial-gradient(circle at 100% 100%, ${colors.accent}05 0%, transparent 30%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
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
          <Box sx={{ width: '100%', maxWidth: 480 }}>
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Box textAlign="center" mb={6}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '24px',
                      background: `linear-gradient(135deg, ${colors.accent}, #64B5F6)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 24px',
                      boxShadow: `0 20px 40px ${colors.accent}30`,
                    }}
                  >
                    <School sx={{ fontSize: 40, color: 'white' }} />
                  </Box>
                </motion.div>

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
                  Welcome Back
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
                  Sign in to access your EduPatch dashboard and continue creating amazing learning experiences.
                </Typography>
              </Box>
            </motion.div>

            {/* Login Form */}
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
                  boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
                }}
              >
                <form onSubmit={handleSubmit}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
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
                            <Email sx={{ color: colors.textSecondary }} />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      sx={{
                        mb: 4,
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
                            <Lock sx={{ color: colors.textSecondary }} />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff sx={{ color: colors.textSecondary }} /> : <Visibility sx={{ color: colors.textSecondary }} />}
                            </IconButton>
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
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading || !formData.email || !formData.password}
                      endIcon={!loading && <ArrowForward />}
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
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1 }} />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                    <Link
                      component="button"
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: colors.accent,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Forgot Password?
                    </Link>
                    <Link
                      component="button"
                      variant="body2"
                      onClick={onSwitchToRegister}
                      sx={{
                        color: colors.textSecondary,
                        textDecoration: 'none',
                        fontSize: '0.9rem',
                        '&:hover': {
                          color: colors.accent,
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      Create Account
                    </Link>
                  </Box>
                </motion.div>

                {/* Social Login */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Box sx={{ mt: 4 }}>
                    <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          px: 2,
                          background: colors.primary,
                          display: 'inline-block',
                          fontSize: '0.85rem',
                        }}
                      >
                        or continue with
                      </Typography>
                    </Box>

                    <Box display="flex" justifyContent="center" gap={2}>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: `1px solid ${colors.subtle}`,
                            '&:hover': {
                              background: 'white',
                              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <svg width="24" height="24" viewBox="0 0 24 24">
                            <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </IconButton>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <IconButton
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 3,
                            background: 'rgba(255, 255, 255, 0.9)',
                            border: `1px solid ${colors.subtle}`,
                            '&:hover': {
                              background: 'white',
                              boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <Facebook sx={{
                            color: '#1877f2',
                            fontSize: 24,
                          }} />
                        </IconButton>
                      </motion.div>
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

export default Login;
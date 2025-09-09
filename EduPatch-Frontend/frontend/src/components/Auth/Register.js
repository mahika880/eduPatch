import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  CircularProgress,
  Link,
  Divider,
  InputAdornment,
  IconButton,
  Fade,
  Slide,
} from '@mui/material';
import {
  Email,
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  School,
  PersonAdd,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'ADMIN', // Fixed to ADMIN only
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Sunset Color Palette - Using darker colors for better contrast
  const colors = {
    primary: '#493129',      // Dark Brown - main background
    secondary: '#8b597b',    // Purple - accents
    accent: '#e1c3d0',       // Light Pink - highlights
    light: '#f5e6d3',       // Cream - text
    lightest: '#faf5f0',    // Very Light Cream - bright text
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    const userData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: 'ADMIN',
    };

    const result = await register(userData);
    
    if (result.success) {
      setSuccess('Registration successful! Please login to continue.');
      setTimeout(() => {
        onSwitchToLogin();
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Using darker background for better contrast
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 30% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Fade in={true} timeout={800}>
        <Card 
          sx={{ 
            maxWidth: 480, 
            width: '100%', 
            mx: 2,
            // Enhanced glassmorphism with better opacity
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)',
            }
          }}
        >
          <CardContent sx={{ p: 5 }}>
            <Slide direction="down" in={true} timeout={1000}>
              <Box textAlign="center" mb={4}>
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: `0 10px 30px ${colors.primary}60`,
                  }}
                >
                  <School sx={{ fontSize: 40, color: colors.primary }} />
                </Box>
                
                {/* High Contrast Join Us Text */}
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{
                    color: colors.lightest,
                    fontWeight: 700,
                    textShadow: `2px 2px 8px ${colors.primary}`,
                    letterSpacing: '1px',
                    mb: 1,
                  }}
                >
                  Join Us
                </Typography>
                
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: colors.light,
                    fontWeight: 400,
                    textShadow: `1px 1px 4px ${colors.primary}`,
                  }}
                >
                  Create your admin account
                </Typography>
              </Box>
            </Slide>

            <Slide direction="up" in={true} timeout={1200}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: `1px solid ${colors.accent}40`,
                      color: colors.lightest,
                      '&:hover': {
                        border: `1px solid ${colors.accent}60`,
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        border: `1px solid ${colors.accent}`,
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: `0 0 20px ${colors.accent}40`,
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.lightest,
                      fontWeight: 500,
                      '&::placeholder': {
                        color: colors.light,
                        opacity: 1,
                        fontWeight: 400,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Person sx={{ color: colors.light }} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: `1px solid ${colors.accent}40`,
                      color: colors.lightest,
                      '&:hover': {
                        border: `1px solid ${colors.accent}60`,
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        border: `1px solid ${colors.accent}`,
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: `0 0 20px ${colors.accent}40`,
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.lightest,
                      fontWeight: 500,
                      '&::placeholder': {
                        color: colors.light,
                        opacity: 1,
                        fontWeight: 400,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: colors.light }} />
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  placeholder="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: `1px solid ${colors.accent}40`,
                      color: colors.lightest,
                      '&:hover': {
                        border: `1px solid ${colors.accent}60`,
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        border: `1px solid ${colors.accent}`,
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: `0 0 20px ${colors.accent}40`,
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.lightest,
                      fontWeight: 500,
                      '&::placeholder': {
                        color: colors.light,
                        opacity: 1,
                        fontWeight: 400,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: colors.light }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: colors.light }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <TextField
                  fullWidth
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: `1px solid ${colors.accent}40`,
                      color: colors.lightest,
                      '&:hover': {
                        border: `1px solid ${colors.accent}60`,
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '&.Mui-focused': {
                        border: `1px solid ${colors.accent}`,
                        background: 'rgba(255, 255, 255, 0.25)',
                        boxShadow: `0 0 20px ${colors.accent}40`,
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: colors.lightest,
                      fontWeight: 500,
                      '&::placeholder': {
                        color: colors.light,
                        opacity: 1,
                        fontWeight: 400,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: colors.light }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                          sx={{ color: colors.light }}
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                {error && (
                  <Fade in={true}>
                    <Alert 
                      severity="error" 
                      sx={{ 
                        mb: 3,
                        background: 'rgba(244, 67, 54, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(244, 67, 54, 0.4)',
                        borderRadius: 2,
                        color: '#ffebee',
                        fontWeight: 500,
                        '& .MuiAlert-icon': {
                          color: '#ffcdd2',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}
                
                {success && (
                  <Fade in={true}>
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 3,
                        background: 'rgba(76, 175, 80, 0.15)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(76, 175, 80, 0.4)',
                        borderRadius: 2,
                        color: '#e8f5e8',
                        fontWeight: 500,
                        '& .MuiAlert-icon': {
                          color: '#c8e6c9',
                        },
                      }}
                    >
                      {success}
                    </Alert>
                  </Fade>
                )}
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: colors.primary }} /> : <PersonAdd />}
                  disabled={loading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
                  sx={{ 
                    py: 2,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                    color: colors.primary,
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: `0 10px 30px ${colors.accent}60`,
                    border: `1px solid ${colors.light}`,
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.light}, ${colors.lightest})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 40px ${colors.accent}80`,
                    },
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Creating Account...' : 'CREATE ADMIN ACCOUNT'}
                </Button>
              </form>
            </Slide>
            
            <Divider 
              sx={{ 
                my: 3,
                '&::before, &::after': {
                  borderColor: colors.accent,
                },
              }} 
            />
            
            {/* High Contrast Sign In Link */}
            <Fade in={true} timeout={1500}>
              <Box textAlign="center">
                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: colors.light,
                    fontWeight: 500,
                    textShadow: `1px 1px 3px ${colors.primary}`,
                  }}
                >
                  Already have an admin account?{' '}
                  <Link
                    component="button"
                    variant="body2"
                    onClick={onSwitchToLogin}
                    sx={{ 
                      color: colors.lightest,
                      textDecoration: 'none',
                      fontWeight: 700,
                      textShadow: `1px 1px 3px ${colors.primary}`,
                      '&:hover': {
                        textDecoration: 'underline',
                        color: colors.accent,
                      },
                    }}
                  >
                    Sign in here
                  </Link>
                </Typography>
              </Box>
            </Fade>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Register;
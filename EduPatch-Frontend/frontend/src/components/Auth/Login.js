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
  Visibility,
  VisibilityOff,
  School,
  Login as LoginIcon,
  Google,
  Facebook,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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

  // Sunset Color Palette
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.accent} 100%)`,
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
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${colors.accent}30 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to top, ${colors.primary}40, transparent)`,
          pointerEvents: 'none',
        }
      }}
    >
      <Fade in={true} timeout={800}>
        <Card 
          sx={{ 
            maxWidth: 450, 
            width: '100%', 
            mx: 2,
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
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
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 20px',
                    boxShadow: `0 10px 30px ${colors.primary}40`,
                  }}
                >
                  <School sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  gutterBottom
                  sx={{
                    color: 'white',
                    fontWeight: 300,
                    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                    mb: 1,
                  }}
                >
                  Welcome
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 300,
                  }}
                >
                  Sign in to your admin dashboard
                </Typography>
              </Box>
            </Slide>

            <Slide direction="up" in={true} timeout={1200}>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  sx={{
                    mb: 2,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '&:hover': {
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.15)',
                      },
                      '&.Mui-focused': {
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
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
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: 3,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '&:hover': {
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.15)',
                      },
                      '&.Mui-focused': {
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.2)',
                      },
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                      '&::placeholder': {
                        color: 'rgba(255, 255, 255, 0.7)',
                        opacity: 1,
                      },
                    },
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          sx={{ color: 'rgba(255, 255, 255, 0.7)' }}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                        background: 'rgba(244, 67, 54, 0.1)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(244, 67, 54, 0.3)',
                        borderRadius: 2,
                        color: '#ffcdd2',
                        '& .MuiAlert-icon': {
                          color: '#ffcdd2',
                        },
                      }}
                    >
                      {error}
                    </Alert>
                  </Fade>
                )}
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <LoginIcon />}
                  disabled={loading || !formData.email || !formData.password}
                  sx={{ 
                    py: 2,
                    borderRadius: 3,
                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    boxShadow: `0 10px 30px ${colors.primary}40`,
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    '&:hover': {
                      background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                      transform: 'translateY(-2px)',
                      boxShadow: `0 15px 40px ${colors.primary}60`,
                    },
                    '&:disabled': {
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: 'rgba(255, 255, 255, 0.5)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  {loading ? 'Signing In...' : 'LOGIN'}
                </Button>
              </form>
            </Slide>
            
            {/* Forgot Password & Sign Up Links */}
            <Fade in={true} timeout={1500}>
              <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 3, mb: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Forgot Password ?
                </Link>
                <Link
                  component="button"
                  variant="body2"
                  onClick={onSwitchToRegister}
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Sign Up
                </Link>
              </Box>
            </Fade>
            
            {/* Social Login */}
            <Fade in={true} timeout={1800}>
              <Box>
                <Typography 
                  variant="body2" 
                  align="center" 
                  sx={{ 
                    color: 'rgba(255, 255, 255, 0.7)',
                    mb: 2,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.75rem',
                  }}
                >
                  OR LOGIN WITH
                </Typography>
                
                <Box display="flex" justifyContent="center" gap={2}>
                  <IconButton
                    sx={{
                      width: 50,
                      height: 50,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Google />
                  </IconButton>
                  <IconButton
                    sx={{
                      width: 50,
                      height: 50,
                      background: 'rgba(255, 255, 255, 0.1)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.2)',
                        transform: 'scale(1.1)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <Facebook />
                  </IconButton>
                </Box>
              </Box>
            </Fade>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default Login;
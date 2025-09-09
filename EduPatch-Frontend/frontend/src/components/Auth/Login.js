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

  // Enhanced Color Palette with Animation Colors
  const colors = {
    primary: '#493129',
    secondary: '#8b597b',
    accent: '#e1c3d0',
    light: '#f5e6d3',
    lightest: '#faf5f0',
    // Animation colors
    softPink: '#FFB6C1',
    lavender: '#E6E6FA',
    lightPeach: '#FFDBAC',
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
        position: 'relative',
        overflow: 'hidden',
        // Animated Gradient Background
        background: `linear-gradient(-45deg, ${colors.softPink}, ${colors.lavender}, ${colors.lightPeach}, ${colors.accent})`,
        backgroundSize: '400% 400%',
        animation: 'gradientShift 15s ease infinite',
        // Keyframes for gradient animation
        '@keyframes gradientShift': {
          '0%': {
            backgroundPosition: '0% 50%'
          },
          '50%': {
            backgroundPosition: '100% 50%'
          },
          '100%': {
            backgroundPosition: '0% 50%'
          }
        },
        // Additional overlay effects
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
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          animation: 'float 20s ease-in-out infinite',
        },
        '@keyframes float': {
          '0%, 100%': {
            transform: 'translateY(0px) rotate(0deg)',
          },
          '33%': {
            transform: 'translateY(-10px) rotate(1deg)',
          },
          '66%': {
            transform: 'translateY(5px) rotate(-1deg)',
          }
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '40%',
          background: `linear-gradient(to top, ${colors.primary}20, transparent)`,
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
            // Subtle card animation
            animation: 'cardFloat 6s ease-in-out infinite',
            '@keyframes cardFloat': {
              '0%, 100%': {
                transform: 'translateY(0px)',
              },
              '50%': {
                transform: 'translateY(-5px)',
              }
            },
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
                    // Pulsing animation for logo
                    animation: 'logoPulse 4s ease-in-out infinite',
                    '@keyframes logoPulse': {
                      '0%, 100%': {
                        transform: 'scale(1)',
                        boxShadow: `0 10px 30px ${colors.primary}40`,
                      },
                      '50%': {
                        transform: 'scale(1.05)',
                        boxShadow: `0 15px 40px ${colors.primary}60`,
                      }
                    }
                  }}
                >
                  <School sx={{ fontSize: 40, color: 'white' }} />
                </Box>
                
                {/* Enhanced Welcome Text with Highlight */}
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-block',
                    mb: 1,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      bottom: 0,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '120%',
                      height: '8px',
                      background: `linear-gradient(90deg, transparent, ${colors.accent}60, transparent)`,
                      borderRadius: '4px',
                      zIndex: -1,
                      animation: 'highlightPulse 3s ease-in-out infinite',
                    },
                    '@keyframes highlightPulse': {
                      '0%, 100%': {
                        opacity: 0.6,
                        transform: 'translateX(-50%) scaleX(1)',
                      },
                      '50%': {
                        opacity: 0.8,
                        transform: 'translateX(-50%) scaleX(1.1)',
                      }
                    }
                  }}
                >
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    sx={{
                      color: 'white',
                      fontWeight: 600,
                      textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
                      letterSpacing: '1px',
                      position: 'relative',
                      background: `linear-gradient(135deg, white, ${colors.lightest})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    Welcome
                  </Typography>
                </Box>
                
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
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-focused': {
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
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
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: '1px solid rgba(255, 255, 255, 0.3)',
                        background: 'rgba(255, 255, 255, 0.15)',
                        transform: 'translateY(-2px)',
                      },
                      '&.Mui-focused': {
                        border: '1px solid rgba(255, 255, 255, 0.4)',
                        background: 'rgba(255, 255, 255, 0.2)',
                        boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                        transform: 'translateY(-2px)',
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
                    position: 'relative',
                    overflow: 'hidden',
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
                    // Subtle shimmer effect
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
                      animation: 'shimmer 3s infinite',
                    },
                    '@keyframes shimmer': {
                      '0%': {
                        left: '-100%',
                      },
                      '100%': {
                        left: '100%',
                      }
                    }
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                      transform: 'translateY(-1px)',
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
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: 'white',
                      textDecoration: 'underline',
                      transform: 'translateY(-1px)',
                    },
                  }}
                >
                  Sign Up
                </Link>
              </Box>
            </Fade>
            
            {/* Social Login with Brand Colors */}
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
                  {/* Google Button with Authentic Colors */}
                  <IconButton
                    sx={{
                      width: 50,
                      height: 50,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'scale(1.1) translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(66, 133, 244, 0.3)',
                      },
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <path fill="#4285f4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34a853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#fbbc05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#ea4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </IconButton>
                  
                  {/* Facebook Button with Authentic Colors */}
                  <IconButton
                    sx={{
                      width: 50,
                      height: 50,
                      background: 'rgba(255, 255, 255, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 1)',
                        transform: 'scale(1.1) translateY(-2px)',
                        boxShadow: '0 8px 25px rgba(24, 119, 242, 0.3)',
                      },
                    }}
                  >
                    <Facebook sx={{ 
                      color: '#1877f2', // Official Facebook Blue
                      fontSize: 24,
                    }} />
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
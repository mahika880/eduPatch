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
  Person,
  Visibility,
  VisibilityOff,
  School,
  PersonAdd,
  ArrowForward,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                {/* Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ marginBottom: '32px' }}
                >
                  <Box
                    component="img"
                    src="/images/FullLogo.png"
                    alt="EduPatch Logo"
                    sx={{
                      height: '60px',
                      width: 'auto',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))',
                    }}
                  />
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
                  Join EduPatch
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
                  Create your admin account and start building amazing learning experiences for your students.
                </Typography>
              </Box>
            </motion.div>

            {/* Registration Form */}
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
                      label="Full Name"
                      name="name"
                      value={formData.name}
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
                            <Person sx={{ color: colors.textSecondary }} />
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
                    transition={{ duration: 0.6, delay: 0.5 }}
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

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <TextField
                      fullWidth
                      label="Confirm Password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
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
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff sx={{ color: colors.textSecondary }} /> : <Visibility sx={{ color: colors.textSecondary }} />}
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

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert
                        severity="success"
                        sx={{
                          mb: 3,
                          borderRadius: 3,
                          background: 'rgba(76, 175, 80, 0.08)',
                          border: `1px solid rgba(76, 175, 80, 0.2)`,
                          '& .MuiAlert-icon': {
                            color: '#4caf50',
                          },
                        }}
                      >
                        {success}
                      </Alert>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading || !formData.name || !formData.email || !formData.password || !formData.confirmPassword}
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
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </motion.div>
                </form>

                {/* Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <Box display="flex" justifyContent="center" alignItems="center" sx={{ mt: 3 }}>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        fontSize: '0.9rem',
                      }}
                    >
                      Already have an account?{' '}
                      <Link
                        component="button"
                        variant="body2"
                        onClick={onSwitchToLogin}
                        sx={{
                          color: colors.accent,
                          textDecoration: 'none',
                          fontWeight: 600,
                          '&:hover': {
                            textDecoration: 'underline',
                          },
                        }}
                      >
                        Sign in here
                      </Link>
                    </Typography>
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

export default Register;
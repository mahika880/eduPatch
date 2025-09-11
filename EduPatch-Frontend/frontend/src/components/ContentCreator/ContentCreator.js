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
  Stepper,
  Step,
  StepLabel,
  Container,
  Fade,
  Slide,
  Chip,
  LinearProgress,
  Paper,
  Avatar,
} from '@mui/material';
import { 
  AutoAwesome, 
  Send, 
  Create, 
  Quiz, 
  Visibility,
  CheckCircle,
  Lightbulb,
  Favorite,
  Star,
  Pets,
} from '@mui/icons-material';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const steps = ['Enter Content', 'AI Processing', 'Review & Publish'];

const ContentCreator = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    content: '',
    chapter: '',
    pageNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setActiveStep(1);

    try {
      const response = await apiService.createContent(formData);
      setResult(response.data);
      setActiveStep(2);
    } catch (error) {
      setError('Failed to create content. Please try again.');
      setActiveStep(0);
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = () => {
    navigate(`/page/${result.page.pageId}`);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: `
          radial-gradient(circle at 20% 20%, ${colors.accent}40 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, ${colors.light}60 0%, transparent 50%),
          radial-gradient(circle at 40% 60%, ${colors.secondary}20 0%, transparent 50%),
          linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 100%)
        `,
        position: 'relative',
        overflow: 'hidden',
        py: 6,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='20' cy='20' r='2' fill='${colors.accent.replace('#', '%23')}'/%3E%3Ccircle cx='80' cy='40' r='1.5' fill='${colors.secondary.replace('#', '%23')}'/%3E%3Ccircle cx='40' cy='80' r='1' fill='${colors.primary.replace('#', '%23')}'/%3E%3Ccircle cx='70' cy='70' r='1.2' fill='${colors.accent.replace('#', '%23')}'/%3E%3C/svg%3E")
          `,
          opacity: 0.3,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '"✨"',
          position: 'absolute',
          top: '10%',
          right: '10%',
          fontSize: '2rem',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-10px)' },
          },
        },
      }}
    >
      {/* Floating Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '15%',
          left: '5%',
          fontSize: '1.5rem',
          animation: 'float 4s ease-in-out infinite reverse',
          zIndex: 0,
        }}
      >
        🌸
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          fontSize: '1.2rem',
          animation: 'float 5s ease-in-out infinite',
          zIndex: 0,
        }}
      >
        💫
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '8%',
          fontSize: '1rem',
          animation: 'float 3.5s ease-in-out infinite',
          zIndex: 0,
        }}
      >
        🦋
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Adorable Header Section */}
        <Fade in={true} timeout={800}>
          <Box textAlign="center" mb={6}>
            {/* Cute Avatar with Sparkles */}
            <Box
              sx={{
                position: 'relative',
                display: 'inline-block',
                mb: 3,
              }}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                  boxShadow: `0 20px 40px ${colors.secondary}30`,
                  border: `4px solid ${colors.lightest}`,
                  mx: 'auto',
                }}
              >
                <AutoAwesome sx={{ fontSize: 60, color: 'white' }} />
              </Avatar>
              
              {/* Floating Hearts */}
              <Favorite 
                sx={{
                  position: 'absolute',
                  top: -10,
                  right: -10,
                  color: colors.accent,
                  fontSize: 24,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.2)' },
                  },
                }}
              />
              <Star 
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  left: -15,
                  color: colors.light,
                  fontSize: 20,
                  animation: 'pulse 2.5s ease-in-out infinite',
                }}
              />
            </Box>
            
            {/* Cute Title with Gradient */}
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                fontWeight: 800,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary}, ${colors.accent})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
                textShadow: `0 4px 8px ${colors.primary}20`,
                letterSpacing: '0.5px',
              }}
            >
              ✨ Create Magical AI Content 🌟
            </Typography>
            
            {/* Adorable Subtitle */}
            <Paper
              elevation={0}
              sx={{
                display: 'inline-block',
                background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}60)`,
                border: `2px solid ${colors.accent}60`,
                borderRadius: 25,
                px: 4,
                py: 2,
                maxWidth: 600,
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  color: colors.secondary,
                  fontWeight: 500,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                }}
              >
                <Pets sx={{ color: colors.accent }} />
                Transform your content into engaging summaries & quizzes
                <Pets sx={{ color: colors.accent }} />
              </Typography>
            </Paper>
          </Box>
        </Fade>

        {/* Cute Progress Stepper */}
        <Slide direction="down" in={true} timeout={1000}>
          <Paper 
            elevation={0}
            sx={{ 
              mb: 5,
              background: `linear-gradient(135deg, ${colors.lightest}E6, ${colors.light}80)`,
              backdropFilter: 'blur(20px)',
              border: `3px solid ${colors.accent}80`,
              borderRadius: 25,
              p: 4,
              boxShadow: `0 15px 35px ${colors.primary}15`,
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '4px',
                background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent}, ${colors.light})`,
              },
            }}
          >
            <Stepper 
              activeStep={activeStep} 
              sx={{
                '& .MuiStepLabel-root .Mui-completed': {
                  color: colors.secondary,
                },
                '& .MuiStepLabel-root .Mui-active': {
                  color: colors.primary,
                },
                '& .MuiStepConnector-line': {
                  borderColor: colors.accent,
                  borderWidth: 2,
                },
                '& .MuiStepIcon-root': {
                  fontSize: '2rem',
                },
              }}
            >
              {steps.map((label, index) => (
                <Step key={label}>
                  <StepLabel
                    sx={{
                      '& .MuiStepLabel-label': {
                        color: colors.primary,
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      },
                    }}
                  >
                    {['📝', '🤖', '🎉'][index]} {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Slide>

        {/* Main Cute Content Card */}
        <Slide direction="up" in={true} timeout={1200}>
          <Paper 
            elevation={0}
            sx={{ 
              background: `linear-gradient(135deg, ${colors.lightest}F0, ${colors.light}60)`,
              backdropFilter: 'blur(20px)',
              border: `3px solid ${colors.accent}60`,
              borderRadius: 30,
              overflow: 'hidden',
              boxShadow: `0 25px 50px ${colors.primary}20`,
              position: 'relative',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent}, ${colors.secondary})`,
              },
            }}
          >
            <CardContent sx={{ p: 6 }}>
              {/* Step 1: Adorable Content Input Form */}
              {activeStep === 0 && (
                <Fade in={true} timeout={600}>
                  <Box>
                    {/* Cute Section Header */}
                    <Box 
                      display="flex" 
                      alignItems="center" 
                      justifyContent="center"
                      mb={5}
                    >
                      <Paper
                        elevation={0}
                        sx={{
                          background: `linear-gradient(135deg, ${colors.accent}40, ${colors.light}60)`,
                          border: `2px solid ${colors.accent}`,
                          borderRadius: 20,
                          px: 4,
                          py: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <Create sx={{ color: colors.primary, fontSize: 32 }} />
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            color: colors.primary,
                            fontWeight: 700,
                          }}
                        >
                          📝 Share Your Content With Me! 💕
                        </Typography>
                      </Paper>
                    </Box>
                    
                    <form onSubmit={handleSubmit}>
                      {/* Cute Input Row */}
                      <Box display="flex" gap={3} mb={4}>
                        <TextField
                          fullWidth
                          label="📚 Chapter Title"
                          name="chapter"
                          value={formData.chapter}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Biology Chapter 8 - Cell Division 🧬"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 20,
                              background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}40)`,
                              border: `2px solid ${colors.accent}60`,
                              '& fieldset': {
                                border: 'none',
                              },
                              '&:hover': {
                                background: `linear-gradient(135deg, ${colors.light}60, ${colors.accent}20)`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 25px ${colors.accent}40`,
                              },
                              '&.Mui-focused': {
                                background: `linear-gradient(135deg, ${colors.light}80, ${colors.accent}30)`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 30px ${colors.secondary}30`,
                              },
                              transition: 'all 0.3s ease',
                            },
                            '& .MuiInputLabel-root': {
                              color: colors.secondary,
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: colors.primary,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: colors.primary,
                              fontWeight: 500,
                            },
                          }}
                        />
                        
                        <TextField
                          label="📄 Page Number"
                          name="pageNumber"
                          value={formData.pageNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="156"
                          sx={{
                            minWidth: 180,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 20,
                              background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}40)`,
                              border: `2px solid ${colors.accent}60`,
                              '& fieldset': {
                                border: 'none',
                              },
                              '&:hover': {
                                background: `linear-gradient(135deg, ${colors.light}60, ${colors.accent}20)`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 25px ${colors.accent}40`,
                              },
                              '&.Mui-focused': {
                                background: `linear-gradient(135deg, ${colors.light}80, ${colors.accent}30)`,
                                transform: 'translateY(-2px)',
                                boxShadow: `0 12px 30px ${colors.secondary}30`,
                              },
                              transition: 'all 0.3s ease',
                            },
                            '& .MuiInputLabel-root': {
                              color: colors.secondary,
                              fontWeight: 600,
                              '&.Mui-focused': {
                                color: colors.primary,
                              },
                            },
                            '& .MuiInputBase-input': {
                              color: colors.primary,
                              fontWeight: 500,
                            },
                          }}
                        />
                      </Box>
                      
                      {/* Adorable Content Textarea */}
                      <TextField
                        fullWidth
                        label="✍️ Your Amazing Textbook Content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={12}
                        placeholder="Paste your wonderful textbook content here! 📖✨ I'll create magical summaries, explanations, and fun quiz questions just for you! 🎯💫"
                        sx={{
                          mb: 5,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 25,
                            background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}30)`,
                            border: `3px solid ${colors.accent}80`,
                            '& fieldset': {
                              border: 'none',
                            },
                            '&:hover': {
                              background: `linear-gradient(135deg, ${colors.light}50, ${colors.accent}20)`,
                              boxShadow: `0 10px 30px ${colors.accent}30`,
                            },
                            '&.Mui-focused': {
                              background: `linear-gradient(135deg, ${colors.light}70, ${colors.accent}25)`,
                              boxShadow: `0 15px 40px ${colors.secondary}25`,
                            },
                            transition: 'all 0.3s ease',
                          },
                          '& .MuiInputLabel-root': {
                            color: colors.secondary,
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            '&.Mui-focused': {
                              color: colors.primary,
                            },
                          },
                          '& .MuiInputBase-input': {
                            color: colors.primary,
                            fontWeight: 500,
                            fontSize: '1rem',
                            lineHeight: 1.6,
                          },
                        }}
                      />
                      
                      {/* Cute Feature Preview Cards */}
                      <Box display="flex" gap={3} mb={5}>
                        {[
                          { icon: '💡', title: 'AI Summary', desc: 'Concise & Sweet', color: colors.accent },
                          { icon: '🔍', title: 'Explanation', desc: 'Detailed & Clear', color: colors.secondary },
                          { icon: '🎯', title: 'Quiz Magic', desc: '5 Fun Questions', color: colors.primary },
                        ].map((feature, index) => (
                          <Paper 
                            key={feature.title}
                            elevation={0}
                            sx={{ 
                              flex: 1,
                              background: `linear-gradient(135deg, ${feature.color}20, ${colors.light}40)`,
                              border: `2px solid ${feature.color}60`,
                              borderRadius: 20,
                              p: 3,
                              textAlign: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                transform: 'translateY(-5px) scale(1.02)',
                                boxShadow: `0 15px 35px ${feature.color}30`,
                                background: `linear-gradient(135deg, ${feature.color}30, ${colors.light}50)`,
                              },
                            }}
                          >
                            <Typography variant="h3" sx={{ mb: 1 }}>
                              {feature.icon}
                            </Typography>
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: colors.primary, 
                                fontWeight: 700,
                                mb: 0.5,
                              }}
                            >
                              {feature.title}
                            </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: colors.secondary,
                                fontWeight: 500,
                              }}
                            >
                              {feature.desc}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                      
                      {/* Magical Submit Button */}
                      <Box textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<AutoAwesome />}
                          disabled={!formData.content || !formData.chapter || !formData.pageNumber}
                          sx={{
                            py: 3,
                            px: 6,
                            borderRadius: 25,
                            background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                            fontSize: '1.3rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            boxShadow: `0 15px 35px ${colors.secondary}40`,
                            border: `3px solid ${colors.lightest}`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                              transform: 'translateY(-3px) scale(1.05)',
                              boxShadow: `0 20px 45px ${colors.secondary}50`,
                            },
                            '&:active': {
                              transform: 'translateY(-1px) scale(1.02)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          🚀 Create My Magical Content! ✨
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Fade>
              )}

              {/* Step 2: Adorable AI Processing */}
              {activeStep === 1 && (
                <Fade in={true} timeout={600}>
                  <Box textAlign="center" py={8}>
                    {/* Cute Loading Animation */}
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        mb: 5,
                      }}
                    >
                      <CircularProgress 
                        size={100} 
                        thickness={6}
                        sx={{ 
                          color: colors.secondary,
                          '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                          },
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          animation: 'spin 2s linear infinite',
                          '@keyframes spin': {
                            '0%': { transform: 'translate(-50%, -50%) rotate(0deg)' },
                            '100%': { transform: 'translate(-50%, -50%) rotate(360deg)' },
                          },
                        }}
                      >
                        <Typography variant="h2">🤖</Typography>
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="h3" 
                      sx={{ 
                        mb: 3,
                        color: colors.primary,
                        fontWeight: 700,
                      }}
                    >
                      🌟 AI is Working Its Magic! ✨
                    </Typography>
                    
                    <Paper
                      elevation={0}
                      sx={{
                        display: 'inline-block',
                        background: `linear-gradient(135deg, ${colors.accent}30, ${colors.light}50)`,
                        border: `2px solid ${colors.accent}`,
                        borderRadius: 20,
                        px: 4,
                        py: 2,
                        mb: 4,
                      }}
                    >
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: colors.secondary,
                          fontWeight: 500,
                        }}
                      >
                        🎭 Creating summaries, explanations & quizzes just for you! 💕
                      </Typography>
                    </Paper>
                    
                    <LinearProgress 
                      sx={{
                        width: 400,
                        mx: 'auto',
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: colors.light,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colors.secondary,
                          borderRadius: 6,
                        },
                      }}
                    />
                  </Box>
                </Fade>
              )}

              {/* Step 3: Results & Publish */}
              {activeStep === 2 && result && (
                <Fade in={true} timeout={600}>
                  <Box>
                    {/* Success Alert */}
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 5,
                        borderRadius: 20,
                        background: `linear-gradient(135deg, rgba(76, 175, 80, 0.15), ${colors.light}50)`,
                        border: `3px solid rgba(76, 175, 80, 0.4)`,
                        fontSize: '1.1rem',
                        '& .MuiAlert-icon': {
                          color: '#4caf50',
                          fontSize: '2rem',
                        },
                      }}
                      icon={<Typography variant="h4">🎉</Typography>}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
                        🌟 Magical Content Created Successfully! 🌟
                      </Typography>
                      <Typography variant="body1">
                        Your AI assistant has crafted beautiful summaries, explanations, and {result.quizzes?.length || 5} delightful quiz questions! 💫
                      </Typography>
                    </Alert>
                    
                    {/* Content Preview */}
                    <Box mb={5}>
                      <Box display="flex" alignItems="center" justifyContent="center" mb={4}>
                        <Chip 
                          label={`📄 Page ${formData.pageNumber}`}
                          sx={{ 
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.light})`,
                            color: colors.primary,
                            fontWeight: 700,
                            fontSize: '1rem',
                            px: 2,
                            py: 1,
                            mr: 3,
                          }}
                        />
                        <Typography 
                          variant="h4" 
                          sx={{ 
                            color: colors.primary,
                            fontWeight: 700,
                          }}
                        >
                          📚 {result.page.chapter}
                        </Typography>
                      </Box>
                      
                      {/* AI Summary Card */}
                      <Paper 
                        elevation={0}
                        sx={{ 
                          mb: 4,
                          background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}50)`,
                          border: `3px solid ${colors.accent}80`,
                          borderRadius: 25,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            background: `linear-gradient(90deg, ${colors.secondary}, ${colors.accent})`,
                            p: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              color: 'white',
                              fontWeight: 700,
                            }}
                          >
                            💡 AI-Generated Summary ✨
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: colors.primary,
                              lineHeight: 1.8,
                              fontSize: '1.1rem',
                            }}
                          >
                            {result.page.summary}
                          </Typography>
                        </CardContent>
                      </Paper>
                      
                      {/* AI Explanation Card */}
                      <Paper 
                        elevation={0}
                        sx={{ 
                          mb: 4,
                          background: `linear-gradient(135deg, ${colors.lightest}, ${colors.accent}30)`,
                          border: `3px solid ${colors.secondary}60`,
                          borderRadius: 25,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            background: `linear-gradient(90deg, ${colors.accent}, ${colors.secondary})`,
                            p: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              color: 'white',
                              fontWeight: 700,
                            }}
                          >
                            🔍 Detailed Explanation 📖
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 4 }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: colors.primary,
                              lineHeight: 1.8,
                              fontSize: '1.1rem',
                            }}
                          >
                            {result.page.explanation.substring(0, 400)}...
                          </Typography>
                        </CardContent>
                      </Paper>
                      
                      {/* Quiz Preview */}
                      <Paper 
                        elevation={0}
                        sx={{ 
                          background: `linear-gradient(135deg, ${colors.accent}30, ${colors.light}60)`,
                          border: `3px solid ${colors.primary}60`,
                          borderRadius: 25,
                          overflow: 'hidden',
                        }}
                      >
                        <Box
                          sx={{
                            background: `linear-gradient(90deg, ${colors.primary}, ${colors.secondary})`,
                            p: 2,
                            textAlign: 'center',
                          }}
                        >
                          <Typography 
                            variant="h5" 
                            sx={{ 
                              color: 'white',
                              fontWeight: 700,
                            }}
                          >
                            🎯 Interactive Quiz Ready! 🎮
                          </Typography>
                        </Box>
                        <CardContent sx={{ p: 4, textAlign: 'center' }}>
                          <Typography variant="h2" sx={{ mb: 2 }}>🎪</Typography>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              color: colors.primary,
                              fontWeight: 600,
                            }}
                          >
                            {result.quizzes?.length || 5} Fun & Engaging Quiz Questions Created! 🎊
                          </Typography>
                        </CardContent>
                      </Paper>
                    </Box>
                    
                    {/* Cute Action Buttons */}
                    <Box display="flex" gap={3} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Typography>🔄</Typography>}
                        onClick={() => setActiveStep(0)}
                        sx={{
                          borderColor: colors.accent,
                          color: colors.secondary,
                          borderRadius: 20,
                          px: 4,
                          py: 2,
                          borderWidth: 2,
                          fontWeight: 600,
                          '&:hover': {
                            borderColor: colors.secondary,
                            background: `${colors.accent}30`,
                            transform: 'translateY(-2px)',
                          },
                        }}
                      >
                        Create Another Masterpiece
                      </Button>
                      
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Typography>🚀</Typography>}
                        onClick={handlePublish}
                        sx={{
                          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                          borderRadius: 20,
                          px: 5,
                          py: 2,
                          fontWeight: 700,
                          fontSize: '1.1rem',
                          boxShadow: `0 15px 35px ${colors.secondary}40`,
                          border: `2px solid ${colors.lightest}`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                            transform: 'translateY(-3px) scale(1.05)',
                            boxShadow: `0 20px 45px ${colors.secondary}50`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        ✨ View My Amazing Content! 🌟
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Cute Error Display */}
              {error && (
                <Fade in={true}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mt: 4,
                      borderRadius: 20,
                      background: 'rgba(244, 67, 54, 0.1)',
                      border: '2px solid rgba(244, 67, 54, 0.4)',
                      fontSize: '1.1rem',
                    }}
                    icon={<Typography variant="h5">😔</Typography>}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Oops! Something went wrong! 💔
                    </Typography>
                    <Typography>{error}</Typography>
                  </Alert>
                </Fade>
              )}
            </CardContent>
          </Paper>
        </Slide>
      </Container>
    </Box>
  );
};

export default ContentCreator;
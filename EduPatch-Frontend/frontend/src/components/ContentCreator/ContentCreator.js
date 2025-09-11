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
} from '@mui/material';
import { 
  AutoAwesome, 
  Send, 
  Create, 
  Quiz, 
  Visibility,
  CheckCircle,
  Lightbulb,
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
        borderRadius: '50%',
        background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.lightest} 50%, ${colors.accent} 100%)`,
        position: 'relative',
        overflow: 'hidden',
        py: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 20% 80%, ${colors.primary}10 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${colors.secondary}10 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${colors.accent}20 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <Fade in={true} timeout={800}>
          <Box textAlign="center" mb={6}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                mb: 3,
                boxShadow: `0 15px 35px ${colors.primary}30`,
              }}
            >
              <AutoAwesome sx={{ fontSize: 50, color: 'white' }} />
            </Box>
            
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{
                fontWeight: 700,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                mb: 2,
              }}
            >
              ✨ Create AI-Powered Content
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Transform your textbook content into engaging summaries, explanations, and interactive quizzes with AI
            </Typography>
          </Box>
        </Fade>

        {/* Progress Stepper */}
        <Slide direction="down" in={true} timeout={1000}>
          <Card 
            sx={{ 
              mb: 4,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 4,
              boxShadow: `0 10px 30px ${colors.primary}15`,
            }}
          >
            <CardContent sx={{ p: 4 }}>
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
                  },
                }}
              >
                {steps.map((label, index) => (
                  <Step key={label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          color: colors.primary,
                          fontWeight: 600,
                        },
                      }}
                    >
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Slide>

        {/* Main Content Card */}
        <Slide direction="up" in={true} timeout={1200}>
          <Card 
            sx={{ 
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 4,
              boxShadow: `0 20px 40px ${colors.primary}20`,
              overflow: 'hidden',
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Step 1: Content Input Form */}
              {activeStep === 0 && (
                <Fade in={true} timeout={600}>
                  <Box>
                    <Box display="flex" alignItems="center" mb={4}>
                      <Create sx={{ color: colors.primary, mr: 2, fontSize: 32 }} />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: colors.primary,
                          fontWeight: 600,
                        }}
                      >
                        📝 Enter Your Content
                      </Typography>
                    </Box>
                    
                    <form onSubmit={handleSubmit}>
                      <Box display="flex" gap={3} mb={3}>
                        <TextField
                          fullWidth
                          label="Chapter Title"
                          name="chapter"
                          value={formData.chapter}
                          onChange={handleInputChange}
                          required
                          placeholder="e.g., Biology Chapter 8 - Cell Division"
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              background: colors.lightest,
                              '&:hover fieldset': {
                                borderColor: colors.accent,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colors.secondary,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: colors.secondary,
                            },
                          }}
                        />
                        
                        <TextField
                          label="Page Number"
                          name="pageNumber"
                          value={formData.pageNumber}
                          onChange={handleInputChange}
                          required
                          placeholder="156"
                          sx={{
                            minWidth: 150,
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 3,
                              background: colors.lightest,
                              '&:hover fieldset': {
                                borderColor: colors.accent,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colors.secondary,
                              },
                            },
                            '& .MuiInputLabel-root.Mui-focused': {
                              color: colors.secondary,
                            },
                          }}
                        />
                      </Box>
                      
                      <TextField
                        fullWidth
                        label="Textbook Content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={10}
                        placeholder="Paste your textbook content here. The AI will generate a summary, detailed explanation, and quiz questions based on this content."
                        sx={{
                          mb: 4,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 3,
                            background: colors.lightest,
                            '&:hover fieldset': {
                              borderColor: colors.accent,
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: colors.secondary,
                            },
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: colors.secondary,
                          },
                        }}
                      />
                      
                      {/* Feature Preview Cards */}
                      <Box display="flex" gap={2} mb={4}>
                        {[
                          { icon: <Lightbulb />, title: 'AI Summary', desc: 'Concise overview' },
                          { icon: <AutoAwesome />, title: 'Explanation', desc: 'Detailed breakdown' },
                          { icon: <Quiz />, title: 'Quiz Questions', desc: '5 interactive questions' },
                        ].map((feature, index) => (
                          <Card 
                            key={feature.title}
                            sx={{ 
                              flex: 1,
                              background: `linear-gradient(135deg, ${colors.accent}20, ${colors.light}40)`,
                              border: `1px solid ${colors.accent}60`,
                              borderRadius: 3,
                            }}
                          >
                            <CardContent sx={{ textAlign: 'center', py: 2 }}>
                              <Box sx={{ color: colors.secondary, mb: 1 }}>
                                {feature.icon}
                              </Box>
                              <Typography variant="subtitle2" sx={{ color: colors.primary, fontWeight: 600 }}>
                                {feature.title}
                              </Typography>
                              <Typography variant="caption" sx={{ color: colors.secondary }}>
                                {feature.desc}
                              </Typography>
                            </CardContent>
                          </Card>
                        ))}
                      </Box>
                      
                      <Box textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<AutoAwesome />}
                          disabled={!formData.content || !formData.chapter || !formData.pageNumber}
                          sx={{
                            py: 2,
                            px: 4,
                            borderRadius: 3,
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            fontSize: '1.1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: `0 10px 30px ${colors.primary}40`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                              transform: 'translateY(-2px)',
                              boxShadow: `0 15px 40px ${colors.primary}60`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          🚀 Generate AI Content
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Fade>
              )}

              {/* Step 2: AI Processing */}
              {activeStep === 1 && (
                <Fade in={true} timeout={600}>
                  <Box textAlign="center" py={6}>
                    <Box
                      sx={{
                        position: 'relative',
                        display: 'inline-block',
                        mb: 4,
                      }}
                    >
                      <CircularProgress 
                        size={80} 
                        thickness={4}
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
                        }}
                      >
                        <AutoAwesome sx={{ fontSize: 32, color: colors.primary }} />
                      </Box>
                    </Box>
                    
                    <Typography 
                      variant="h4" 
                      sx={{ 
                        mb: 2,
                        color: colors.primary,
                        fontWeight: 600,
                      }}
                    >
                      🤖 AI is analyzing your content...
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: colors.secondary,
                        mb: 4,
                        maxWidth: 400,
                        mx: 'auto',
                      }}
                    >
                      Our AI is generating a comprehensive summary, detailed explanation, and interactive quiz questions
                    </Typography>
                    
                    <LinearProgress 
                      sx={{
                        width: 300,
                        mx: 'auto',
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: colors.light,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colors.secondary,
                          borderRadius: 4,
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
                    <Alert 
                      severity="success" 
                      sx={{ 
                        mb: 4,
                        borderRadius: 3,
                        background: `linear-gradient(135deg, rgba(76, 175, 80, 0.1), ${colors.light}40)`,
                        border: `1px solid rgba(76, 175, 80, 0.3)`,
                        '& .MuiAlert-icon': {
                          color: '#4caf50',
                        },
                      }}
                      icon={<CheckCircle />}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        🎉 Content created successfully!
                      </Typography>
                      <Typography variant="body2">
                        AI has generated a summary, explanation, and {result.quizzes?.length || 5} quiz questions.
                      </Typography>
                    </Alert>
                    
                    {/* Content Preview */}
                    <Box mb={4}>
                      <Box display="flex" alignItems="center" mb={3}>
                        <Chip 
                          label={`Page ${formData.pageNumber}`}
                          sx={{ 
                            background: colors.accent,
                            color: colors.primary,
                            fontWeight: 600,
                            mr: 2,
                          }}
                        />
                        <Typography 
                          variant="h5" 
                          sx={{ 
                            color: colors.primary,
                            fontWeight: 600,
                          }}
                        >
                          📄 {result.page.chapter}
                        </Typography>
                      </Box>
                      
                      {/* AI Summary Card */}
                      <Card 
                        sx={{ 
                          mb: 3,
                          background: `linear-gradient(135deg, ${colors.lightest}, ${colors.light}40)`,
                          border: `1px solid ${colors.accent}60`,
                          borderRadius: 3,
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <Lightbulb sx={{ color: colors.secondary, mr: 1 }} />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: colors.primary,
                                fontWeight: 600,
                              }}
                            >
                              ✨ AI-Generated Summary
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: colors.primary,
                              lineHeight: 1.6,
                            }}
                          >
                            {result.page.summary}
                          </Typography>
                        </CardContent>
                      </Card>
                      
                      {/* AI Explanation Card */}
                      <Card 
                        sx={{ 
                          mb: 3,
                          background: `linear-gradient(135deg, ${colors.lightest}, ${colors.accent}20)`,
                          border: `1px solid ${colors.accent}60`,
                          borderRadius: 3,
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <AutoAwesome sx={{ color: colors.secondary, mr: 1 }} />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: colors.primary,
                                fontWeight: 600,
                              }}
                            >
                              🔍 AI-Generated Explanation
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: colors.primary,
                              lineHeight: 1.6,
                            }}
                          >
                            {result.page.explanation.substring(0, 300)}...
                          </Typography>
                        </CardContent>
                      </Card>
                      
                      {/* Quiz Preview */}
                      <Card 
                        sx={{ 
                          background: `linear-gradient(135deg, ${colors.accent}20, ${colors.light}40)`,
                          border: `1px solid ${colors.accent}60`,
                          borderRadius: 3,
                        }}
                      >
                        <CardContent sx={{ p: 3 }}>
                          <Box display="flex" alignItems="center" mb={2}>
                            <Quiz sx={{ color: colors.secondary, mr: 1 }} />
                            <Typography 
                              variant="h6" 
                              sx={{ 
                                color: colors.primary,
                                fontWeight: 600,
                              }}
                            >
                              🎯 Interactive Quiz Ready
                            </Typography>
                          </Box>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              color: colors.primary,
                            }}
                          >
                            {result.quizzes?.length || 5} engaging quiz questions have been generated to test comprehension.
                          </Typography>
                        </CardContent>
                      </Card>
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box display="flex" gap={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Visibility />}
                        onClick={() => setActiveStep(0)}
                        sx={{
                          borderColor: colors.accent,
                          color: colors.secondary,
                          borderRadius: 3,
                          px: 3,
                          '&:hover': {
                            borderColor: colors.secondary,
                            background: `${colors.accent}20`,
                          },
                        }}
                      >
                        Create Another
                      </Button>
                      
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        onClick={handlePublish}
                        sx={{
                          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                          borderRadius: 3,
                          px: 4,
                          fontWeight: 600,
                          boxShadow: `0 10px 30px ${colors.secondary}40`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                            transform: 'translateY(-2px)',
                            boxShadow: `0 15px 40px ${colors.secondary}60`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        🚀 View Published Content
                      </Button>
                    </Box>
                  </Box>
                </Fade>
              )}

              {/* Error Display */}
              {error && (
                <Fade in={true}>
                  <Alert 
                    severity="error" 
                    sx={{ 
                      mt: 3,
                      borderRadius: 3,
                      background: 'rgba(244, 67, 54, 0.1)',
                      border: '1px solid rgba(244, 67, 54, 0.3)',
                    }}
                  >
                    {error}
                  </Alert>
                </Fade>
              )}
            </CardContent>
          </Card>
        </Slide>
      </Container>
    </Box>
  );
};

export default ContentCreator;
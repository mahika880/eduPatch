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
  Grid,
} from '@mui/material';
import { 
  AutoAwesome, 
  Send, 
  Create, 
  Quiz, 
  Visibility,
  CheckCircle,
  Lightbulb,
  Analytics,
  Psychology,
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
        background: `linear-gradient(135deg, ${colors.lightest} 0%, ${colors.light} 50%, ${colors.accent}20 100%)`,
        position: 'relative',
        py: 4,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, ${colors.accent}15 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, ${colors.secondary}10 0%, transparent 50%)
          `,
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Professional Header */}
        <Fade in={true} timeout={800}>
          <Box textAlign="center" mb={6}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                mb: 3,
                boxShadow: `0 8px 32px ${colors.primary}25`,
              }}
            >
              <AutoAwesome sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            
            <Typography 
              variant="h3" 
              gutterBottom
              sx={{
                fontWeight: 600,
                color: colors.primary,
                mb: 2,
                letterSpacing: '-0.5px',
              }}
            >
              AI-Powered Content Creator
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.secondary,
                fontWeight: 400,
                maxWidth: 600,
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Transform your educational content into comprehensive summaries, detailed explanations, and interactive assessments
            </Typography>
          </Box>
        </Fade>

        {/* Professional Progress Stepper */}
        <Slide direction="down" in={true} timeout={1000}>
          <Card 
            elevation={0}
            sx={{ 
              mb: 4,
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}60`,
              borderRadius: 3,
              boxShadow: `0 4px 20px ${colors.primary}08`,
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
                          fontWeight: 500,
                          fontSize: '1rem',
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
            elevation={0}
            sx={{ 
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.accent}40`,
              borderRadius: 3,
              boxShadow: `0 8px 40px ${colors.primary}12`,
            }}
          >
            <CardContent sx={{ p: 5 }}>
              {/* Step 1: Content Input Form */}
              {activeStep === 0 && (
                <Fade in={true} timeout={600}>
                  <Box>
                    <Box mb={4}>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: colors.primary,
                          fontWeight: 600,
                          mb: 1,
                        }}
                      >
                        Content Input
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: colors.secondary,
                          mb: 4,
                        }}
                      >
                        Provide your educational content and let our AI generate comprehensive learning materials
                      </Typography>
                    </Box>
                    
                    <form onSubmit={handleSubmit}>
                      <Grid container spacing={3} mb={3}>
                        <Grid item xs={12} md={8}>
                          <TextField
                            fullWidth
                            label="Chapter Title"
                            name="chapter"
                            value={formData.chapter}
                            onChange={handleInputChange}
                            required
                            placeholder="e.g., Introduction to Cellular Biology"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
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
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                          <TextField
                            fullWidth
                            label="Page Number"
                            name="pageNumber"
                            value={formData.pageNumber}
                            onChange={handleInputChange}
                            required
                            placeholder="156"
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
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
                        </Grid>
                      </Grid>
                      
                      <TextField
                        fullWidth
                        label="Educational Content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        multiline
                        rows={12}
                        placeholder="Paste your textbook content here. Our AI will analyze and generate comprehensive learning materials including summaries, explanations, and quiz questions."
                        sx={{
                          mb: 4,
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
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
                      
                      {/* Feature Cards */}
                      <Grid container spacing={3} mb={4}>
                        {[
                          { 
                            icon: <Lightbulb />, 
                            title: 'AI Summary', 
                            desc: 'Concise key points extraction',
                            color: colors.accent 
                          },
                          { 
                            icon: <Psychology />, 
                            title: 'Detailed Explanation', 
                            desc: 'Comprehensive content breakdown',
                            color: colors.secondary 
                          },
                          { 
                            icon: <Quiz />, 
                            title: 'Interactive Quiz', 
                            desc: 'Assessment questions generation',
                            color: colors.primary 
                          },
                        ].map((feature, index) => (
                          <Grid item xs={12} md={4} key={feature.title}>
                            <Card 
                              elevation={0}
                              sx={{ 
                                background: `${feature.color}08`,
                                border: `1px solid ${feature.color}30`,
                                borderRadius: 2,
                                p: 3,
                                height: '100%',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-2px)',
                                  boxShadow: `0 8px 25px ${feature.color}20`,
                                  border: `1px solid ${feature.color}50`,
                                },
                              }}
                            >
                              <Box sx={{ color: feature.color, mb: 2 }}>
                                {feature.icon}
                              </Box>
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  color: colors.primary, 
                                  fontWeight: 600,
                                  mb: 1,
                                }}
                              >
                                {feature.title}
                              </Typography>
                              <Typography 
                                variant="body2" 
                                sx={{ 
                                  color: colors.secondary,
                                  lineHeight: 1.5,
                                }}
                              >
                                {feature.desc}
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                      
                      <Box textAlign="center">
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<AutoAwesome />}
                          disabled={!formData.content || !formData.chapter || !formData.pageNumber}
                          sx={{
                            py: 1.5,
                            px: 4,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            fontSize: '1rem',
                            fontWeight: 600,
                            textTransform: 'none',
                            boxShadow: `0 4px 20px ${colors.primary}30`,
                            '&:hover': {
                              background: `linear-gradient(135deg, ${colors.secondary}, ${colors.primary})`,
                              transform: 'translateY(-1px)',
                              boxShadow: `0 6px 25px ${colors.primary}40`,
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          Generate AI Content
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
                        <Analytics sx={{ fontSize: 32, color: colors.primary }} />
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
                      Processing Content
                    </Typography>
                    
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: colors.secondary,
                        mb: 4,
                        maxWidth: 400,
                        mx: 'auto',
                        lineHeight: 1.6,
                      }}
                    >
                      Our AI is analyzing your content and generating comprehensive learning materials
                    </Typography>
                    
                    <LinearProgress 
                      sx={{
                        width: 300,
                        mx: 'auto',
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: colors.light,
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: colors.secondary,
                          borderRadius: 3,
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
                        borderRadius: 2,
                        background: `rgba(76, 175, 80, 0.08)`,
                        border: `1px solid rgba(76, 175, 80, 0.3)`,
                        '& .MuiAlert-icon': {
                          color: '#4caf50',
                        },
                      }}
                      icon={<CheckCircle />}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                        Content Generated Successfully
                      </Typography>
                      <Typography variant="body2">
                        AI has generated comprehensive learning materials including summary, explanation, and {result.quizzes?.length || 2} quiz questions.
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
                          {result.page.chapter}
                        </Typography>
                      </Box>
                      
                      <Grid container spacing={3}>
                        {/* AI Summary */}
                        <Grid item xs={12}>
                          <Card 
                            elevation={0}
                            sx={{ 
                              background: `${colors.accent}08`,
                              border: `1px solid ${colors.accent}40`,
                              borderRadius: 2,
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
                                  AI-Generated Summary
                                </Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: colors.primary,
                                  lineHeight: 1.7,
                                }}
                              >
                                {result.page.summary}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        
                        {/* AI Explanation */}
                        <Grid item xs={12}>
                          <Card 
                            elevation={0}
                            sx={{ 
                              background: `${colors.secondary}08`,
                              border: `1px solid ${colors.secondary}40`,
                              borderRadius: 2,
                            }}
                          >
                            <CardContent sx={{ p: 3 }}>
                              <Box display="flex" alignItems="center" mb={2}>
                                <Psychology sx={{ color: colors.secondary, mr: 1 }} />
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    color: colors.primary,
                                    fontWeight: 600,
                                  }}
                                >
                                  Detailed Explanation
                                </Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: colors.primary,
                                  lineHeight: 1.7,
                                }}
                              >
                                {result.page.explanation.substring(0, 300)}...
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                        
                        {/* Quiz Preview */}
                        <Grid item xs={12}>
                          <Card 
                            elevation={0}
                            sx={{ 
                              background: `${colors.primary}08`,
                              border: `1px solid ${colors.primary}40`,
                              borderRadius: 2,
                            }}
                          >
                            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                              <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
                                <Quiz sx={{ color: colors.primary, mr: 1 }} />
                                <Typography 
                                  variant="h6" 
                                  sx={{ 
                                    color: colors.primary,
                                    fontWeight: 600,
                                  }}
                                >
                                  Interactive Quiz Ready
                                </Typography>
                              </Box>
                              <Typography 
                                variant="body1" 
                                sx={{ 
                                  color: colors.secondary,
                                }}
                              >
                                {result.quizzes?.length || 5} assessment questions have been generated to evaluate comprehension.
                              </Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      </Grid>
                    </Box>
                    
                    {/* Action Buttons */}
                    <Box display="flex" gap={2} justifyContent="center">
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<Create />}
                        onClick={() => setActiveStep(0)}
                        sx={{
                          borderColor: colors.accent,
                          color: colors.secondary,
                          borderRadius: 2,
                          px: 3,
                          '&:hover': {
                            borderColor: colors.secondary,
                            background: `${colors.accent}10`,
                          },
                        }}
                      >
                        Create New Content
                      </Button>
                      
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        onClick={handlePublish}
                        sx={{
                          background: `linear-gradient(135deg, ${colors.secondary}, ${colors.accent})`,
                          borderRadius: 2,
                          px: 4,
                          fontWeight: 600,
                          boxShadow: `0 4px 20px ${colors.secondary}30`,
                          '&:hover': {
                            background: `linear-gradient(135deg, ${colors.accent}, ${colors.secondary})`,
                            transform: 'translateY(-1px)',
                            boxShadow: `0 6px 25px ${colors.secondary}40`,
                          },
                          transition: 'all 0.3s ease',
                        }}
                      >
                        View Published Content
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
                      borderRadius: 2,
                      background: 'rgba(244, 67, 54, 0.08)',
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
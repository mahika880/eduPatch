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
import { motion } from 'framer-motion';

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

  // First, update the color scheme to match the dashboard theme
  const colors = {
    primary: '#FFFFFF',
    secondary: '#F5F5F7',
    text: '#1D1D1F',
    textSecondary: '#86868B',
    accent: '#2997FF',
    subtle: '#E8E8E8',
    navBackground: 'rgba(255, 255, 255, 0.8)',
    glassBg: 'rgba(255, 255, 255, 0.7)',
    hover: 'rgba(41, 151, 255, 0.08)',
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
        background: colors.primary,
        position: 'relative',
        pt: { xs: 8, md: 12 }, // Added padding for navbar
        pb: 8,
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
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                fontWeight: 700,
                color: colors.text,
                mb: 2,
                letterSpacing: '-0.5px',
              }}
            >
              Content Creator
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Create interactive learning experiences with intelligent content generation
            </Typography>
          </Box>
        </motion.div>

        {/* Stepper Card */}
        <Card 
          elevation={0}
          sx={{ 
            mb: 4,
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.subtle}`,
            borderRadius: 3,
          }}
        >
          {/* Professional Progress Stepper */}
          <Slide direction="down" in={true} timeout={1000}>
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
          </Slide>
        </Card>

        {/* Main Content Card */}
        <Card 
          elevation={0}
          sx={{ 
            background: colors.glassBg,
            backdropFilter: 'blur(20px)',
            border: `1px solid ${colors.subtle}`,
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            {/* Step 1: Content Input Form */}
            {activeStep === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
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
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={8}>
                        <TextField
                          fullWidth
                          label="Chapter Title"
                          name="chapter"
                          value={formData.chapter}
                          onChange={handleInputChange}
                          required
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2,
                              backgroundColor: 'rgba(255, 255, 255, 0.8)',
                              '&:hover fieldset': {
                                borderColor: colors.accent,
                              },
                              '&.Mui-focused fieldset': {
                                borderColor: colors.accent,
                              },
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
                    <Grid container spacing={3} sx={{ mt: 4 }}>
                      {[
                        {
                          icon: <AutoAwesome />,
                          title: 'AI Generation',
                          description: 'Intelligent content processing'
                        },
                        {
                          icon: <Psychology />,
                          title: 'Smart Analysis',
                          description: 'Deep learning algorithms'
                        },
                        {
                          icon: <Quiz />,
                          title: 'Auto Assessment',
                          description: 'Automatic quiz generation'
                        }
                      ].map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                          <motion.div
                            whileHover={{ y: -5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Card
                              elevation={0}
                              sx={{
                                p: 3,
                                height: '100%',
                                background: 'rgba(255, 255, 255, 0.5)',
                                backdropFilter: 'blur(10px)',
                                border: `1px solid ${colors.subtle}`,
                                borderRadius: 2,
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  background: 'rgba(255, 255, 255, 0.8)',
                                  borderColor: colors.accent,
                                }
                              }}
                            >
                              <Box sx={{ color: colors.accent, mb: 2 }}>
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
                          </motion.div>
                        </Grid>
                      ))}
                    </Grid>
                    
                    {/* Submit Button */}
                    <Box sx={{ textAlign: 'center', mt: 6 }}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          startIcon={<AutoAwesome />}
                          sx={{
                            bgcolor: colors.text,
                            color: 'white',
                            py: 1.5,
                            px: 4,
                            borderRadius: '50px',
                            fontSize: '1.1rem',
                            textTransform: 'none',
                            '&:hover': {
                              bgcolor: colors.accent,
                            }
                          }}
                        >
                          Generate Content
                        </Button>
                      </motion.div>
                    </Box>
                  </form>
                </Box>
              </motion.div>
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
                      AI has generated comprehensive learning materials including summary, explanation, and {result.quizzes?.length || 5} quiz questions.
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
      </Container>
    </Box>
  );
};

export default ContentCreator;
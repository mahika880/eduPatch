import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import {
  School,
  Psychology,
  Assessment,
  QrCodeScanner,
  AutoAwesome,
  Group,
  Security,
  Speed,
  SmartToy,
  Book,
  EmojiObjects,
  TrendingUp,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 40, color: colors.accent }} />,
      title: 'AI-Powered Content Generation',
      description: 'Leverage advanced Gemini AI to create comprehensive educational content, summaries, and explanations automatically.',
    },
    {
      icon: <Assessment sx={{ fontSize: 40, color: colors.accentSecondary }} />,
      title: 'Smart Assessment Creation',
      description: 'Generate intelligent quizzes and assessments that adapt to student learning patterns and difficulty levels.',
    },
    {
      icon: <QrCodeScanner sx={{ fontSize: 40, color: colors.success }} />,
      title: 'QR Code Integration',
      description: 'Seamlessly connect physical textbooks with digital content through QR codes for enhanced learning experiences.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 40, color: colors.warning }} />,
      title: 'Intelligent Summarization',
      description: 'Transform complex educational content into clear, concise summaries that improve student comprehension.',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: colors.error }} />,
      title: 'Secure & Private',
      description: 'Enterprise-grade security ensures that educational content and student data remain protected and private.',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: colors.accent }} />,
      title: 'Lightning Fast',
      description: 'Optimized performance ensures quick content generation and seamless user experiences across all devices.',
    },
  ];

  const stats = [
    { value: '10,000+', label: 'Content Pieces Generated', icon: <Book /> },
    { value: '500+', label: 'Active Educators', icon: <School /> },
    { value: '95%', label: 'Student Engagement', icon: <TrendingUp /> },
    { value: '24/7', label: 'AI Availability', icon: <SmartToy /> },
  ];

  const team = [
    {
      name: 'AI-Powered Platform',
      role: 'Content Generation Engine',
      description: 'Built with Google Gemini AI for intelligent content creation',
    },
    {
      name: 'Modern Tech Stack',
      role: 'Full-Stack Development',
      description: 'React frontend with Spring Boot backend and MongoDB',
    },
    {
      name: 'Educational Focus',
      role: 'Learning Innovation',
      description: 'Designed specifically for modern educational needs',
    },
  ];

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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h1"
              sx={{
                color: colors.text,
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '4rem' },
                letterSpacing: '-0.02em',
              }}
            >
              About EduPatch
            </Typography>
            <Typography
              variant="h4"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.5rem',
              }}
            >
              Revolutionizing Education Through AI-Powered Content Creation and Interactive Learning
            </Typography>
          </Box>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card
            sx={{
              mb: 8,
              borderRadius: 4,
              background: `rgba(255, 255, 255, 0.8)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              boxShadow: `0 20px 40px ${colors.shadow}`,
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box textAlign="center" mb={4}>
                <EmojiObjects sx={{ fontSize: 60, color: colors.accent, mb: 3 }} />
                <Typography
                  variant="h3"
                  sx={{
                    color: colors.text,
                    fontWeight: 700,
                    mb: 3,
                    fontSize: '2.5rem',
                  }}
                >
                  Our Mission
                </Typography>
              </Box>
              <Typography
                variant="h5"
                sx={{
                  color: colors.textSecondary,
                  lineHeight: 1.8,
                  fontSize: '1.25rem',
                  textAlign: 'center',
                  maxWidth: '900px',
                  mx: 'auto',
                }}
              >
                EduPatch is dedicated to transforming education by harnessing the power of artificial intelligence.
                We empower educators to create engaging, personalized learning experiences while maintaining the
                human touch that makes education meaningful. Our platform bridges the gap between traditional
                teaching methods and cutting-edge technology.
              </Typography>
            </CardContent>
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      textAlign: 'center',
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${stat.value.includes('95') ? colors.success : colors.accent}20`,
                        borderColor: stat.value.includes('95') ? colors.success : colors.accent,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: stat.value.includes('95') ? colors.success + '20' : colors.accent + '20',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: `0 8px 24px ${stat.value.includes('95') ? colors.success : colors.accent}30`,
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { color: stat.value.includes('95') ? colors.success : colors.accent, fontSize: 28 } })}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 800,
                        color: colors.text,
                        mb: 1,
                        fontSize: '2.5rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: colors.textSecondary,
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}
                    >
                      {stat.label}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                color: colors.text,
                fontWeight: 700,
                mb: 3,
                fontSize: '3rem',
              }}
            >
              Powerful Features
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Discover the innovative tools that make EduPatch the future of education
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={feature.title}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      height: '100%',
                      borderRadius: 4,
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${colors.accent}20`,
                        borderColor: colors.accent,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Box sx={{ mb: 3 }}>
                        {feature.icon}
                      </Box>
                      <Typography
                        variant="h5"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          mb: 3,
                          fontSize: '1.25rem',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.textSecondary,
                          lineHeight: 1.6,
                          fontSize: '1rem',
                        }}
                      >
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Technology Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Card
            sx={{
              mt: 8,
              mb: 8,
              borderRadius: 4,
              background: `rgba(255, 255, 255, 0.8)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              boxShadow: `0 20px 40px ${colors.shadow}`,
            }}
          >
            <CardContent sx={{ p: 6 }}>
              <Box textAlign="center" mb={6}>
                <SmartToy sx={{ fontSize: 60, color: colors.accent, mb: 3 }} />
                <Typography
                  variant="h3"
                  sx={{
                    color: colors.text,
                    fontWeight: 700,
                    mb: 3,
                    fontSize: '2.5rem',
                  }}
                >
                  Built with Modern Technology
                </Typography>
              </Box>

              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      label="Google Gemini AI"
                      sx={{
                        mb: 2,
                        background: colors.accent + '20',
                        color: colors.accent,
                        fontSize: '1rem',
                        py: 1,
                        px: 2,
                      }}
                    />
                    <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                      Advanced AI model for intelligent content generation, summarization, and assessment creation.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      label="React & Spring Boot"
                      sx={{
                        mb: 2,
                        background: colors.accentSecondary + '20',
                        color: colors.accentSecondary,
                        fontSize: '1rem',
                        py: 1,
                        px: 2,
                      }}
                    />
                    <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                      Modern full-stack architecture ensuring scalability, security, and exceptional user experience.
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box textAlign="center">
                    <Chip
                      label="MongoDB & QR Integration"
                      sx={{
                        mb: 2,
                        background: colors.success + '20',
                        color: colors.success,
                        fontSize: '1rem',
                        py: 1,
                        px: 2,
                      }}
                    />
                    <Typography variant="body1" sx={{ color: colors.textSecondary, lineHeight: 1.6 }}>
                      NoSQL database with seamless QR code generation for connecting physical and digital learning.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                color: colors.text,
                fontWeight: 700,
                mb: 3,
                fontSize: '3rem',
              }}
            >
              Meet Our Technology
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {team.map((member, index) => (
              <Grid item xs={12} md={4} key={member.name}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 1.4 + index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ y: -8 }}
                >
                  <Card
                    sx={{
                      borderRadius: 4,
                      background: colors.secondary,
                      border: `1px solid ${colors.subtle}`,
                      boxShadow: `0 8px 32px ${colors.shadow}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: `0 20px 40px ${colors.accent}20`,
                        borderColor: colors.accent,
                      },
                    }}
                  >
                    <CardContent sx={{ p: 4, textAlign: 'center' }}>
                      <Avatar
                        sx={{
                          width: 80,
                          height: 80,
                          bgcolor: colors.accent,
                          mx: 'auto',
                          mb: 3,
                          fontSize: '2rem',
                        }}
                      >
                        {member.name.charAt(0)}
                      </Avatar>
                      <Typography
                        variant="h5"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          mb: 1,
                          fontSize: '1.25rem',
                        }}
                      >
                        {member.name}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: colors.accent,
                          fontWeight: 500,
                          mb: 3,
                        }}
                      >
                        {member.role}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.textSecondary,
                          lineHeight: 1.6,
                        }}
                      >
                        {member.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <Box
            sx={{
              mt: 8,
              p: 6,
              borderRadius: 4,
              background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentSecondary} 100%)`,
              textAlign: 'center',
              color: 'white',
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: '2.5rem',
              }}
            >
              Ready to Transform Education?
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                opacity: 0.9,
                fontSize: '1.25rem',
                lineHeight: 1.6,
              }}
            >
              Join thousands of educators who are already using EduPatch to create engaging, AI-powered learning experiences.
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/admin/login')}
              sx={{
                background: 'white',
                color: colors.accent,
                borderRadius: 3,
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                '&:hover': {
                  background: 'white',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Get Started Today
            </Button>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
};

export default About;
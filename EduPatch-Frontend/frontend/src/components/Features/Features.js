import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  AutoAwesome,
  QrCodeScanner,
  Assessment,
  LibraryBooks,
  Analytics,
  IntegrationInstructions,
  ArrowForward,
  PlayArrow,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Nike-inspired Color Palette with EduPatch theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#FAFAFA',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  dark: '#000000',
  lightGray: '#F5F5F7',
};

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: colors.accent }} />,
      title: 'AI Content Generation',
      subtitle: 'Intelligent Creation',
      description: 'Transform your teaching materials with AI-powered content generation. Create comprehensive summaries, explanations, and educational content in seconds.',
      image: '/images/25f8062b86de97d7ee996c982d926320.jpg',
      reverse: false,
    },
    {
      icon: <QrCodeScanner sx={{ fontSize: 48, color: colors.accent }} />,
      title: 'QR Code Integration',
      subtitle: 'Seamless Connection',
      description: 'Bridge the gap between physical textbooks and digital learning. Generate QR codes that instantly connect students to interactive content.',
      image: '/images/bdb0266036e0239b97f0b82bcadd3045.jpg',
      reverse: true,
    },
    {
      icon: <Assessment sx={{ fontSize: 48, color: colors.accent }} />,
      title: 'Smart Assessments',
      subtitle: 'Adaptive Testing',
      description: 'Create intelligent quizzes that adapt to student performance. Track progress, identify knowledge gaps, and personalize learning paths.',
      image: '/images/ChatGPT Image Oct 7, 2025, 07_13_13 PM.png',
      reverse: false,
    },
    {
      icon: <LibraryBooks sx={{ fontSize: 48, color: colors.accent }} />,
      title: 'Content Library',
      subtitle: 'Organized Excellence',
      description: 'Manage all your educational content in one centralized location. Search, filter, and organize materials with powerful management tools.',
      image: '/images/HeroImage.png',
      reverse: true,
    },
  ];

  const capabilities = [
    {
      icon: <Analytics sx={{ fontSize: 32, color: colors.accent }} />,
      title: 'Real-time Analytics',
      description: 'Track student engagement and learning outcomes with comprehensive analytics.',
    },
    {
      icon: <IntegrationInstructions sx={{ fontSize: 32, color: colors.accent }} />,
      title: 'Seamless Integration',
      description: 'Works with your existing tools and platforms for a unified educational experience.',
    },
  ];

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.lightGray} 100%)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 80%, ${colors.accent}10 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${colors.accent}8 0%, transparent 50%)
            `,
            opacity: 0.8,
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '4rem', md: '6rem', lg: '8rem' },
                fontWeight: 900,
                color: colors.text,
                lineHeight: 0.9,
                mb: 3,
                letterSpacing: '-0.02em',
              }}
            >
              Features
            </Typography>

            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '2rem' },
                fontWeight: 300,
                color: colors.textSecondary,
                mb: 6,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              Powerful tools designed for modern education
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                onClick={() => navigate('/admin/create')}
                endIcon={<ArrowForward />}
                sx={{
                  background: colors.dark,
                  color: colors.primary,
                  borderRadius: 0,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: colors.text,
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
              >
                Try Features
              </Button>

              <Button
                variant="outlined"
                onClick={() => navigate('/admin/about')}
                sx={{
                  borderColor: colors.accent,
                  color: colors.accent,
                  borderRadius: 0,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: colors.accent,
                    color: colors.primary,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '3rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PlayArrow
              sx={{
                fontSize: '2.5rem',
                color: colors.textSecondary,
                transform: 'rotate(90deg)',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.2))',
              }}
            />
          </motion.div>
        </motion.div>
      </Box>

      {/* Features Showcase */}
      {features.map((feature, index) => (
        <Box
          key={feature.title}
          sx={{
            py: { xs: 8, md: 16 },
            background: index % 2 === 0 ? colors.primary : colors.lightGray,
          }}
        >
          <Container maxWidth="lg">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Grid container spacing={8} alignItems="center" direction={feature.reverse ? 'row-reverse' : 'row'}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: { xs: 4, md: 0 } }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: { xs: '2.5rem', md: '3.5rem' },
                        fontWeight: 700,
                        color: colors.text,
                        mb: 2,
                        lineHeight: 1.1,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: colors.accent,
                        mb: 3,
                      }}
                    >
                      {feature.subtitle}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontSize: '1.1rem',
                        color: colors.textSecondary,
                        lineHeight: 1.7,
                        mb: 4,
                      }}
                    >
                      {feature.description}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => navigate('/admin/create')}
                      sx={{
                        borderColor: colors.accent,
                        color: colors.accent,
                        borderRadius: 0,
                        px: 4,
                        py: 1.5,
                        fontSize: '1rem',
                        fontWeight: 600,
                        textTransform: 'none',
                        '&:hover': {
                          background: colors.accent,
                          color: colors.primary,
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      Explore Feature
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    component="img"
                    src={feature.image}
                    alt={feature.title}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: 2,
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    }}
                  />
                </Grid>
              </Grid>
            </motion.div>
          </Container>
        </Box>
      ))}

      {/* Capabilities Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, background: colors.primary }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                color: colors.text,
                textAlign: 'center',
                mb: 4,
              }}
            >
              Built for Excellence
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 300,
                color: colors.textSecondary,
                textAlign: 'center',
                mb: 8,
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              Advanced capabilities that power modern education
            </Typography>

            <Grid container spacing={6}>
              {capabilities.map((capability, index) => (
                <Grid item xs={12} md={6} key={capability.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        borderRadius: 0,
                        border: `1px solid ${colors.lightGray}`,
                        boxShadow: 'none',
                        '&:hover': {
                          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                          transform: 'translateY(-4px)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box sx={{ mb: 3 }}>
                          {capability.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          sx={{
                            fontSize: '1.5rem',
                            fontWeight: 600,
                            color: colors.text,
                            mb: 2,
                          }}
                        >
                          {capability.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            color: colors.textSecondary,
                            lineHeight: 1.6,
                          }}
                        >
                          {capability.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 12, md: 20 },
          background: colors.dark,
          color: colors.primary,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 4,
                lineHeight: 1.1,
              }}
            >
              Ready to Transform
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                mb: 6,
                lineHeight: 1.1,
              }}
            >
              Your Teaching?
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: '1.25rem',
                fontWeight: 300,
                mb: 8,
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Experience the power of AI-driven education. Start creating today.
            </Typography>

            <Button
              variant="contained"
              onClick={() => navigate('/admin/create')}
              sx={{
                background: colors.primary,
                color: colors.dark,
                borderRadius: 0,
                px: 8,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                '&:hover': {
                  background: colors.lightGray,
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 20px rgba(255,255,255,0.2)',
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 6, background: colors.primary }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                fontSize: '0.9rem',
              }}
            >
              © 2024 EduPatch. Empowering education through innovation.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Features;
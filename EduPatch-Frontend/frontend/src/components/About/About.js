import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import {
  PlayArrow,
  ChevronRight,
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

const About = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
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
              radial-gradient(circle at 20% 80%, ${colors.accent}15 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, ${colors.accent}10 0%, transparent 50%)
            `,
            opacity: 0.6,
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
                fontSize: { xs: '3rem', md: '6rem', lg: '8rem' },
                fontWeight: 900,
                color: colors.text,
                lineHeight: 0.9,
                mb: 4,
                letterSpacing: '-0.02em',
              }}
            >
              EDU
              <Box component="span" sx={{ color: colors.accent }}>PATCH</Box>
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
              Revolutionizing education through AI-powered innovation
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/admin/create')}
              endIcon={<ChevronRight />}
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
              Start Creating
            </Button>
          </motion.div>
        </Container>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <PlayArrow
              sx={{
                fontSize: '2rem',
                color: colors.textSecondary,
                transform: 'rotate(90deg)',
              }}
            />
          </motion.div>
        </motion.div>
      </Box>

      {/* Mission Section */}
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
                mb: 6,
                lineHeight: 1.1,
              }}
            >
              Our Mission
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.5rem' },
                fontWeight: 300,
                color: colors.textSecondary,
                textAlign: 'center',
                maxWidth: '800px',
                mx: 'auto',
                lineHeight: 1.6,
                mb: 8,
              }}
            >
              To democratize education by empowering educators with cutting-edge AI technology,
              creating personalized learning experiences that adapt to every student's unique journey.
            </Typography>

            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/admin/content')}
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
                    borderColor: colors.accent,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Explore Content
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Innovation Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, background: colors.lightGray }}>
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
              Innovation
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 700,
                color: colors.accent,
                textAlign: 'center',
                mb: 8,
                lineHeight: 1.1,
              }}
            >
              Meets Education
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 8 }}>
              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: colors.text,
                    mb: 4,
                  }}
                >
                  AI-Powered Learning
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
                  Our platform leverages Google Gemini AI to create intelligent, adaptive content
                  that evolves with each student's learning pace and style.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    color: colors.textSecondary,
                    lineHeight: 1.7,
                  }}
                >
                  From automated content generation to smart assessments, we make education
                  more efficient, engaging, and effective.
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: colors.text,
                    mb: 4,
                  }}
                >
                  Seamless Integration
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
                  QR code technology bridges the gap between physical textbooks and digital
                  learning experiences, creating a unified educational ecosystem.
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    color: colors.textSecondary,
                    lineHeight: 1.7,
                  }}
                >
                  Print QR codes, scan with mobile devices, and instantly access rich,
                  interactive content that brings textbooks to life.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Impact Section */}
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
                mb: 8,
              }}
            >
              The Impact
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 6 }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 2,
                  }}
                >
                  10,000+
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Content Pieces Created
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 2,
                  }}
                >
                  500+
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Active Educators
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: '3rem',
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 2,
                  }}
                >
                  95%
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Student Engagement
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Technology Section */}
      <Box sx={{ py: { xs: 8, md: 16 }, background: colors.lightGray }}>
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
                mb: 8,
              }}
            >
              Built for the Future
            </Typography>

            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 6 }}>
              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: colors.text,
                    mb: 3,
                  }}
                >
                  Google Gemini AI
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  Advanced AI model powering intelligent content generation,
                  summarization, and adaptive assessments.
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: colors.text,
                    mb: 3,
                  }}
                >
                  Modern Architecture
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  React frontend with Spring Boot backend, ensuring
                  scalability, security, and exceptional performance.
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center', p: 4 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    color: colors.text,
                    mb: 3,
                  }}
                >
                  QR Integration
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: colors.textSecondary,
                    lineHeight: 1.6,
                  }}
                >
                  Seamless connection between physical textbooks and
                  digital content through advanced QR technology.
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box
        sx={{
          py: { xs: 8, md: 16 },
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
              Ready to Make
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
              Education Better?
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
              Join the revolution. Start creating AI-powered educational content today.
            </Typography>

            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/admin/create')}
                sx={{
                  background: colors.primary,
                  color: colors.dark,
                  borderRadius: 0,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: colors.lightGray,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Creating
              </Button>

              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/admin/login')}
                sx={{
                  borderColor: colors.primary,
                  color: colors.primary,
                  borderRadius: 0,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  '&:hover': {
                    background: colors.primary,
                    color: colors.dark,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Sign In
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, background: colors.primary, borderTop: `1px solid ${colors.lightGray}` }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant="body2"
              sx={{
                color: colors.textSecondary,
                fontWeight: 500,
              }}
            >
              © 2024 EduPatch. Revolutionizing education through AI-powered innovation.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
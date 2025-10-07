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
      {/* Hero Section with Image */}
      <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <Box
          component="img"
          src="/images/HeroImage.png"
          alt="EduPatch Hero"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 100%)`,
          }}
        />

        <Container maxWidth="lg" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '4rem', md: '8rem', lg: '10rem' },
                  fontWeight: 900,
                  color: colors.primary,
                  lineHeight: 0.85,
                  mb: 2,
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                EDU
                <Box component="span" sx={{ color: colors.accent }}>PATCH</Box>
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: '1.25rem', md: '1.5rem' },
                  fontWeight: 300,
                  color: colors.primary,
                  mb: 6,
                  maxWidth: '500px',
                  mx: 'auto',
                  lineHeight: 1.4,
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                AI-powered education for the future
              </Typography>
            </motion.div>
          </Box>
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
                color: colors.primary,
                transform: 'rotate(90deg)',
                filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))',
              }}
            />
          </motion.div>
        </motion.div>
      </Box>

      {/* Mission Section - Image + Text */}
      <Box sx={{ display: 'flex', minHeight: '80vh' }}>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Box
            component="img"
            src="/images/25f8062b86de97d7ee996c982d926320.jpg"
            alt="Students learning"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 8 },
            background: colors.primary,
          }}
        >
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  color: colors.text,
                  mb: 4,
                  lineHeight: 1.1,
                }}
              >
                Our Mission
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                  mb: 6,
                }}
              >
                To democratize education by empowering educators with cutting-edge AI technology,
                creating personalized learning experiences that adapt to every student's unique journey.
              </Typography>

              <Button
                variant="outlined"
                onClick={() => navigate('/admin/content')}
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
                Explore Content
              </Button>
            </motion.div>
          </Container>
        </Box>
      </Box>

      {/* Innovation Section - Text + Image */}
      <Box sx={{ display: 'flex', minHeight: '80vh' }}>
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 4, md: 8 },
            background: colors.primary,
          }}
        >
          <Container maxWidth="sm">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3rem' },
                  fontWeight: 700,
                  color: colors.text,
                  mb: 4,
                  lineHeight: 1.1,
                }}
              >
                Innovation
                <Box component="span" sx={{ color: colors.accent }}> Meets </Box>
                Education
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                  mb: 4,
                }}
              >
                AI-powered learning that adapts to every student.
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  fontSize: '1rem',
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                  mb: 6,
                }}
              >
                From automated content generation to smart assessments,
                we make education more efficient, engaging, and effective.
              </Typography>
            </motion.div>
          </Container>
        </Box>
        <Box sx={{ flex: 1, position: 'relative' }}>
          <Box
            component="img"
            src="/images/ChatGPT Image Oct 7, 2025, 07_13_13 PM.png"
            alt="AI-powered education innovation"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </Box>
      </Box>

      {/* Impact Section - Minimal Stats */}
      <Box sx={{ py: { xs: 12, md: 20 }, background: colors.primary }}>
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
                mb: 12,
              }}
            >
              The Impact
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 6, md: 12 } }}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 1,
                  }}
                >
                  10,000+
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Content Pieces
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 1,
                  }}
                >
                  500+
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Educators
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 900,
                    color: colors.accent,
                    mb: 1,
                  }}
                >
                  95%
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: colors.textSecondary,
                  }}
                >
                  Engagement
                </Typography>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Technology Section - Full Width Image */}
      <Box sx={{ position: 'relative', height: '70vh', overflow: 'hidden' }}>
        <Box
          component="img"
          src="/images/HeroImage.png"
          alt="Technology"
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 100%)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Container maxWidth="md" sx={{ textAlign: 'center' }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2rem', md: '3.5rem' },
                  fontWeight: 700,
                  color: colors.primary,
                  mb: 4,
                  lineHeight: 1.1,
                }}
              >
                Built for the Future
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: colors.primary,
                  mb: 6,
                  lineHeight: 1.6,
                  opacity: 0.9,
                }}
              >
                Google Gemini AI • Modern Architecture • QR Integration
              </Typography>
            </motion.div>
          </Container>
        </Box>
      </Box>

      {/* CTA Section - Minimal */}
      <Box sx={{ py: { xs: 12, md: 20 }, background: colors.primary }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 700,
                  color: colors.text,
                  mb: 4,
                  lineHeight: 1.1,
                }}
              >
                Ready to Make
                <Box component="span" sx={{ color: colors.accent }}> Education </Box>
                Better?
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 300,
                  color: colors.textSecondary,
                  mb: 8,
                  lineHeight: 1.6,
                }}
              >
                Join the revolution. Start creating AI-powered educational content today.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
              <Button
                variant="contained"
                onClick={() => navigate('/admin/create')}
                sx={{
                  background: colors.dark,
                  color: colors.primary,
                  borderRadius: 0,
                  px: 8,
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
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Footer - Ultra Minimal */}
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
              © 2024 EduPatch
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
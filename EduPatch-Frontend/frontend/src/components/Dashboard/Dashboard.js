import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Grid,
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  ArrowForward,
  Star,
  AutoAwesome,
  Psychology,
  Speed,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Subtle color theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
};

const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <Box
      sx={{
        p: 4,
        height: '100%',
        background: colors.secondary,
        borderRadius: '24px',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
          background: '#fff',
        }
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          background: colors.subtle,
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: colors.text }}>
        {title}
      </Typography>
      <Typography variant="body1" sx={{ color: colors.textSecondary }}>
        {description}
      </Typography>
    </Box>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      {/* Navbar */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${colors.subtle}`,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <School sx={{ color: colors.text, mr: 1 }} />
            <Typography 
              variant="h6" 
              sx={{ 
                color: colors.text,
                fontWeight: 600,
                letterSpacing: '-0.5px'
              }}
            >
              EduPatch
            </Typography>
          </Box>

          {/* Navigation Links - Desktop */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 4 }}>
              {['Features', 'How it Works', 'Pricing', 'Contact'].map((item) => (
                <Button
                  key={item}
                  sx={{
                    color: colors.text,
                    textTransform: 'none',
                    fontSize: '1rem',
                    '&:hover': {
                      color: colors.accent,
                      background: 'transparent',
                    }
                  }}
                >
                  {item}
                </Button>
              ))}
            </Box>
          )}

          <Button
            variant="contained"
            sx={{
              bgcolor: colors.text,
              color: 'white',
              textTransform: 'none',
              px: 3,
              py: 1,
              borderRadius: '50px',
              '&:hover': {
                bgcolor: colors.accent,
              }
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ pt: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" sx={{ mb: 8 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '2.5rem', md: '4.5rem' },
                fontWeight: 700,
                color: colors.text,
                lineHeight: 1.1,
                mb: 3,
                letterSpacing: '-0.5px'
              }}
            >
              Transform Learning<br />
              with AI-Powered Education
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                color: colors.textSecondary,
                mb: 4,
                fontWeight: 400,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Create interactive learning experiences with intelligent content generation 
              and smart assessment tools.
            </Typography>
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: colors.text,
                color: 'white',
                textTransform: 'none',
                px: 4,
                py: 2,
                borderRadius: '50px',
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: colors.accent,
                }
              }}
            >
              Start Creating
            </Button>
          </Box>
        </motion.div>

        {/* Hero Image/Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Box
            sx={{
              width: '100%',
              height: { xs: '300px', md: '500px' },
              borderRadius: '24px',
              overflow: 'hidden',
              background: colors.secondary,
              position: 'relative'
            }}
          >
            {/* Add your hero image or animation here */}
          </Box>
        </motion.div>
      </Container>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              color: colors.text,
              mb: 8
            }}
          >
            Features that set us apart
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<AutoAwesome sx={{ fontSize: 30, color: colors.accent }} />}
              title="AI-Powered Learning"
              description="Personalized learning paths adapted to each student's unique needs and pace."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<Psychology sx={{ fontSize: 30, color: colors.accent }} />}
              title="Smart Assessment"
              description="Real-time feedback and adaptive testing to ensure comprehensive understanding."
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FeatureCard
              icon={<Speed sx={{ fontSize: 30, color: colors.accent }} />}
              title="Progress Tracking"
              description="Detailed analytics and insights to monitor learning progress effectively."
            />
          </Grid>
        </Grid>
      </Container>

      {/* How it Works Section */}
      <Box sx={{ background: colors.secondary, py: 15 }}>
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: { xs: '2rem', md: '3.5rem' },
                fontWeight: 700,
                color: colors.text,
                mb: 8
              }}
            >
              How EduPatch Works
            </Typography>

            <Box sx={{ position: 'relative' }}>
              {/* Timeline dots and line */}
              <Box
                sx={{
                  position: 'absolute',
                  left: '50%',
                  top: 0,
                  bottom: 0,
                  width: 2,
                  background: colors.subtle,
                  display: { xs: 'none', md: 'block' }
                }}
              />

              {/* Timeline steps */}
              {[
                {
                  title: 'Create Your Course',
                  description: 'Set up your learning materials with our intuitive course builder.'
                },
                {
                  title: 'Add Interactive Content',
                  description: 'Enhance engagement with AI-generated quizzes and assignments.'
                },
                {
                  title: 'Track Progress',
                  description: 'Monitor student performance and adjust content accordingly.'
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start',
                      mb: 8,
                      px: { xs: 0, md: 8 }
                    }}
                  >
                    <Box sx={{ maxWidth: '400px' }}>
                      <Typography
                        variant="h4"
                        sx={{
                          color: colors.text,
                          fontWeight: 600,
                          mb: 2
                        }}
                      >
                        {step.title}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.textSecondary
                        }}
                      >
                        {step.description}
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Section */}
      <Container maxWidth="lg" sx={{ py: 15 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 700,
              color: colors.text,
              mb: 4
            }}
          >
            Ready to Transform Your Teaching?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: colors.textSecondary,
              mb: 4,
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Join hundreds of educators using EduPatch to enhance their teaching and engage students like never before.
          </Typography>
          <Box textAlign="center">
            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: colors.text,
                color: 'white',
                textTransform: 'none',
                px: 4,
                py: 2,
                borderRadius: '50px',
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: colors.accent,
                }
              }}
            >
              Contact Sales
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Footer */}
      <Box sx={{ background: colors.secondary, py: 10 }}>
        <Container maxWidth="lg">
          <Typography
            variant="body1"
            align="center"
            sx={{ color: colors.textSecondary }}
          >
            © 2023 EduPatch. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
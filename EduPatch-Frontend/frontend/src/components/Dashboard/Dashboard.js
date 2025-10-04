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
  TextField,
  Paper,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  School,
  ArrowForward,
  Star,
  AutoAwesome,
  Psychology,
  Speed,
  Send,
  Email,
  Phone,
  LocationOn,
  LinkedIn,
  Twitter,
  Instagram,
  GitHub,
  Dashboard,
  Book,
  People,
  Assessment,
  Settings,
  Add,
} from '@mui/icons-material';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Subtle color theme
const colors = {
  primary: '#FFFFFF',
  secondary: '#F5F5F7',
  text: '#1D1D1F',
  textSecondary: '#86868B',
  accent: '#2997FF',
  subtle: '#E8E8E8',
  navBackground: 'rgba(255, 255, 255, 0.8)',
  sidebarBackground: '#FFFFFF',
  hover: 'rgba(41, 151, 255, 0.1)',
  activeLink: '#2997FF',
  divider: 'rgba(0, 0, 0, 0.06)'
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

const useScrollDirection = () => {
  const [scrollDir, setScrollDir] = useState("up");

  useEffect(() => {
    let lastScroll = window.pageYOffset;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;
      setScrollDir(scrollY > lastScroll ? "down" : "up");
      lastScroll = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDir);
    return () => window.removeEventListener("scroll", updateScrollDir);
  }, []);

  return scrollDir;
};

// Replace the existing Navbar with this enhanced version
const Navbar = ({ isMobile, mobileMenuOpen, setMobileMenuOpen }) => {
  const { scrollY } = useScroll();
  const scrollDir = useScrollDirection();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.9)"]
  );

  const navY = useTransform(
    scrollY,
    [0, 100],
    [0, scrollDir === "up" ? 0 : -100]
  );

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: navBackground,
        y: navY,
        backdropFilter: 'blur(10px)',
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
    >
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          background: 'transparent',
          borderBottom: `1px solid ${colors.subtle}`,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: 'space-between', py: 2 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
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
            </motion.div>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 4 }}>
                {['Features', 'How it Works', 'Contact'].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    <Button
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
                  </motion.div>
                ))}
              </Box>
            )}

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: colors.text,
                  color: 'white',
                  textTransform: 'none',
                  px: 3,
                  py: 1,
                  borderRadius: '50px',
                  boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                  '&:hover': {
                    bgcolor: colors.accent,
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(41,151,255,0.35)',
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Get Started
              </Button>
            </motion.div>

            {isMobile && (
              <IconButton
                onClick={() => setMobileMenuOpen(true)}
                sx={{ color: colors.text }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </motion.div>
  );
};

// Add this new Footer component before the main return
const Footer = () => (
  <Box sx={{ background: colors.secondary, py: 10 }}>
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Box display="flex" alignItems="center" mb={3}>
            <School sx={{ color: colors.text, mr: 1 }} />
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 600 }}>
              EduPatch
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ color: colors.textSecondary, mb: 3 }}>
            Transforming education through AI-powered learning experiences.
          </Typography>
          <Box display="flex" gap={2}>
            {[LinkedIn, Twitter, Instagram, GitHub].map((Icon, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconButton sx={{ color: colors.text }}>
                  <Icon />
                </IconButton>
              </motion.div>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={4}>
            {['Product', 'Company', 'Resources'].map((section, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Typography variant="subtitle1" sx={{ color: colors.text, fontWeight: 600, mb: 2 }}>
                  {section}
                </Typography>
                <Box display="flex" flexDirection="column" gap={1}>
                  {['Link 1', 'Link 2', 'Link 3'].map((link, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                    >
                      <Button
                        sx={{
                          color: colors.textSecondary,
                          textTransform: 'none',
                          justifyContent: 'flex-start',
                          p: 0
                        }}
                      >
                        {link}
                      </Button>
                    </motion.div>
                  ))}
                </Box>
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ my: 4 }} />
          <Typography variant="body2" align="center" sx={{ color: colors.textSecondary }}>
            © 2023 EduPatch. All rights reserved.
          </Typography>
        </Grid>
      </Grid>
    </Container>
  </Box>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ background: colors.primary, minHeight: '100vh' }}>
      {/* Update Navbar props */}
      <Navbar 
        isMobile={isMobile} 
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

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
            Get in Touch
          </Typography>
          <Typography
            variant="h6"
            align="center"
            sx={{
              color: colors.textSecondary,
              mb: 8,
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto'
            }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </Typography>

          <Grid container spacing={6}>
            {/* Contact Information */}
            <Grid item xs={12} md={4}>
              <Box sx={{ mb: { xs: 4, md: 0 } }}>
                {[  // Fix starts here
                  {
                    icon: <Email />, 
                    text: 'hello@edupatch.com'
                  },
                  {
                    icon: <Phone />, 
                    text: '+1 (555) 000-0000'
                  },
                  {
                    icon: <LocationOn />, 
                    text: 'Mumbai, Maharashtra'
                  }
                ].map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3
                    }}
                  >
                    <Box
                      sx={{
                        mr: 2,
                        width: 45,
                        height: 45,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: colors.subtle,
                        color: colors.accent
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: colors.text }}
                    >
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Contact Form */}
            <Grid item xs={12} md={8}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '24px',
                  bgcolor: colors.secondary
                }}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          bgcolor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          bgcolor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          bgcolor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Message"
                      multiline
                      rows={4}
                      variant="outlined"
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: '12px',
                          bgcolor: 'white'
                        }
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<Send />}
                      fullWidth
                      sx={{
                        bgcolor: colors.text,
                        color: 'white',
                        textTransform: 'none',
                        py: 2,
                        borderRadius: '12px',
                        fontSize: '1.1rem',
                        '&:hover': {
                          bgcolor: colors.accent,
                        }
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

// Add this styled component for the sidebar
const StyledSidebar = styled(motion.div)(({ theme }) => ({
  position: 'fixed',
  left: 0,
  top: 0,
  bottom: 0,
  width: 280,
  background: colors.sidebarBackground,
  borderRight: `1px solid ${colors.divider}`,
  zIndex: 1200,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)'
}));

// Add this component for sidebar items
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <motion.div
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
  >
    <Button
      fullWidth
      startIcon={<Icon />}
      onClick={onClick}
      sx={{
        py: 2,
        px: 3,
        justifyContent: 'flex-start',
        color: active ? colors.activeLink : colors.text,
        bgcolor: active ? colors.hover : 'transparent',
        '&:hover': {
          bgcolor: colors.hover,
        },
        borderRadius: '12px',
        mx: 1,
        transition: 'all 0.3s ease'
      }}
    >
      <Typography
        sx={{
          fontWeight: active ? 600 : 400,
          fontSize: '0.95rem'
        }}
      >
        {label}
      </Typography>
    </Button>
  </motion.div>
);

// Modify your existing Sidebar component
const Sidebar = ({ open, onClose }) => {
  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -280, opacity: 0 }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <StyledSidebar
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Box sx={{ p: 3, pb: 2 }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Box display="flex" alignItems="center" sx={{ mb: 4 }}>
                  <School sx={{ color: colors.accent, mr: 1, fontSize: 28 }} />
                  <Typography variant="h6" sx={{ fontWeight: 600, color: colors.text }}>
                    EduPatch
                  </Typography>
                </Box>
              </motion.div>

              <Box sx={{ mb: 4 }}>
                {[  // Correct array syntax with square brackets
                  {
                    icon: Dashboard, 
                    label: 'Overview', 
                    active: true 
                  },
                  { 
                    icon: Book, 
                    label: 'Courses' 
                  },
                  { 
                    icon: People, 
                    label: 'Students' 
                  },
                  { 
                    icon: Assessment, 
                    label: 'Analytics' 
                  },
                  { 
                    icon: Settings, 
                    label: 'Settings' 
                  }
                ].map((item, index) => (
                  <Box key={index} sx={{ mb: 1 }}>
                    <SidebarItem {...item} />
                  </Box>
                ))}
              </Box>
            </Box>

            <Box sx={{ mt: 'auto', p: 3 }}>
              <motion.div whileHover={{ y: -2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={<Add />}
                  sx={{
                    bgcolor: colors.text,
                    color: 'white',
                    textTransform: 'none',
                    py: 1.5,
                    borderRadius: '12px',
                    '&:hover': {
                      bgcolor: colors.accent,
                    },
                    transition: 'all 0.3s ease'
                  }}
                >
                  New Course
                </Button>
              </motion.div>
            </Box>
          </StyledSidebar>

          {/* Backdrop for mobile */}
          <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              zIndex: 1100,
              display: { md: 'none' }
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};

// Update your navbar's background and blur effect
const navbarStyles = {
  background: colors.navBackground,
  backdropFilter: 'blur(10px)',
  borderBottom: `1px solid ${colors.divider}`,
  transition: 'all 0.3s ease'
};

export default LandingPage;
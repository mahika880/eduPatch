import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { ArrowForward } from '@mui/icons-material';

const Hero = () => {
  return (
    <Container maxWidth="lg">
      <Box
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        sx={{
          textAlign: 'center',
          py: { xs: 12, md: 20 },
          maxWidth: '900px',
          mx: 'auto'
        }}
      >
        <Typography 
          variant="h1" 
          sx={{ 
            fontSize: { xs: '2.5rem', md: '4.5rem' },
            fontWeight: 700,
            lineHeight: 1.1,
            mb: 3,
            letterSpacing: '-0.5px'
          }}
        >
          Transform Learning with{' '}
          <Box 
            component="span" 
            sx={{ 
              color: 'primary.main',
              background: 'linear-gradient(90deg, #2997FF 0%, #2663FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            AI-Powered
          </Box>{' '}
          Education
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            color: 'text.secondary',
            mb: 6,
            fontWeight: 400,
            maxWidth: '700px',
            mx: 'auto'
          }}
        >
          Create interactive learning experiences with intelligent content generation and smart assessment tools.
        </Typography>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: 'text.primary',
              color: 'white',
              textTransform: 'none',
              px: 4,
              py: 2,
              borderRadius: '50px',
              fontSize: '1.1rem',
              boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: 'primary.main',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 20px rgba(41,151,255,0.35)',
              },
              transition: 'all 0.3s ease'
            }}
          >
            Start Creating
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default Hero;
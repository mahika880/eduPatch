import React, { useState, useEffect } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  CardActions,
  CircularProgress,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
  Alert,
} from '@mui/material';
import {
  Search,
  Visibility,
  Edit,
  Delete,
  Add,
  MenuBook,
  Psychology,
  Assessment,
  AutoAwesome,
  FilterList,
  QrCode,
} from '@mui/icons-material';
import { apiService } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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

const ContentLibrary = () => {
  const [pages, setPages] = useState([]);
  const [filteredPages, setFilteredPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContent();
  }, []);

  useEffect(() => {
    filterContent();
  }, [pages, searchTerm, selectedCategory]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllPages();
      setPages(response.data);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContent = () => {
    let filtered = pages;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(page =>
        page.chapter.toLowerCase().includes(searchTerm.toLowerCase()) ||
        page.summary?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category (you can extend this based on content types)
    if (selectedCategory !== 'all') {
      // For now, just filter by whether it has quizzes or not
      filtered = filtered.filter(page => {
        // This is a placeholder - you might want to add categories to your backend
        return selectedCategory === 'with-quizzes' ? page.hasQuizzes : true;
      });
    }

    setFilteredPages(filtered);
  };

  const handleViewContent = (pageId) => {
    navigate(`/page/${pageId}`);
  };

  const handleEditContent = (pageId) => {
    // You might want to implement edit functionality
    console.log('Edit content:', pageId);
  };

  const handleDeleteContent = async (pageId) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      try {
        // You'll need to implement delete endpoint in backend
        console.log('Delete content:', pageId);
        // Refresh content after deletion
        fetchContent();
      } catch (error) {
        console.error('Error deleting content:', error);
      }
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: colors.primary,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
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
        }}
      >
        <Box textAlign="center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background: colors.buttonBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 3,
                boxShadow: `0 20px 40px ${colors.shadow}`,
              }}
            >
              <CircularProgress size={40} sx={{ color: colors.buttonText }} />
            </Box>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h6" sx={{ color: colors.text, fontWeight: 500 }}>
              Loading your content library...
            </Typography>
          </motion.div>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.primary,
        position: 'relative',
        py: 4,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '800px',
          height: '800px',
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
          width: '600px',
          height: '600px',
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

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={6}>
            <Typography
              variant="h2"
              sx={{
                color: colors.text,
                fontWeight: 800,
                mb: 3,
                fontSize: { xs: '2.5rem', md: '3.5rem' },
                letterSpacing: '-0.02em',
              }}
            >
              Content Library
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: colors.textSecondary,
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
                fontSize: '1.25rem',
              }}
            >
              Browse and manage all your AI-generated educational content in one place
            </Typography>
          </Box>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Box
            sx={{
              background: `rgba(255, 255, 255, 0.8)`,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${colors.subtle}`,
              borderRadius: 4,
              p: 4,
              mb: 6,
              boxShadow: `0 8px 32px ${colors.shadow}`,
            }}
          >
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  placeholder="Search content by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search sx={{ color: colors.textSecondary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover fieldset': {
                        borderColor: colors.accent,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: colors.accent,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: colors.accent,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label="All Content"
                    onClick={() => setSelectedCategory('all')}
                    sx={{
                      background: selectedCategory === 'all' ? colors.accent : colors.secondary,
                      color: selectedCategory === 'all' ? 'white' : colors.text,
                      '&:hover': {
                        background: selectedCategory === 'all' ? colors.accent : colors.hover,
                      },
                    }}
                  />
                  <Chip
                    label="With Quizzes"
                    onClick={() => setSelectedCategory('with-quizzes')}
                    sx={{
                      background: selectedCategory === 'with-quizzes' ? colors.accent : colors.secondary,
                      color: selectedCategory === 'with-quizzes' ? 'white' : colors.text,
                      '&:hover': {
                        background: selectedCategory === 'with-quizzes' ? colors.accent : colors.hover,
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Grid container spacing={4} sx={{ mb: 8 }}>
            {[
              {
                title: 'Total Content',
                value: pages.length,
                icon: <MenuBook />,
                color: colors.accent,
                subtitle: 'Created pieces'
              },
              {
                title: 'Educational Pages',
                value: filteredPages.length,
                icon: <AutoAwesome />,
                color: colors.accentSecondary,
                subtitle: 'Active content'
              },
              {
                title: 'AI Generated',
                value: '100%',
                icon: <Psychology />,
                color: colors.success,
                subtitle: 'Intelligent content'
              },
              {
                title: 'Interactive',
                value: pages.filter(p => p.hasQuizzes).length,
                icon: <Assessment />,
                color: colors.warning,
                subtitle: 'With assessments'
              },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={stat.title}>
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
                        boxShadow: `0 20px 40px ${stat.color}20`,
                        borderColor: stat.color,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        borderRadius: 3,
                        background: stat.color,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: `0 8px 24px ${stat.color}30`,
                      }}
                    >
                      {React.cloneElement(stat.icon, { sx: { color: 'white', fontSize: 28 } })}
                    </Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: 800,
                        color: colors.text,
                        mb: 1,
                        fontSize: '2rem'
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: colors.text,
                        fontWeight: 600,
                        mb: 1,
                        fontSize: '1rem'
                      }}
                    >
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: colors.textSecondary,
                        fontWeight: 500,
                        fontSize: '0.9rem'
                      }}
                    >
                      {stat.subtitle}
                    </Typography>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Content Grid */}
        {filteredPages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Card
              sx={{
                textAlign: 'center',
                p: 8,
                borderRadius: 4,
                background: colors.secondary,
                border: `1px solid ${colors.subtle}`,
                boxShadow: `0 20px 40px ${colors.shadow}`,
              }}
            >
              <Box
                sx={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: colors.buttonBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 4,
                  boxShadow: `0 20px 40px ${colors.shadow}`,
                }}
              >
                <MenuBook sx={{ fontSize: 60, color: colors.buttonText }} />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  color: colors.text,
                  mb: 3,
                  fontSize: '1.8rem'
                }}
              >
                {searchTerm ? 'No Content Found' : 'No Content Available'}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: colors.textSecondary,
                  fontSize: '1.1rem',
                  maxWidth: '400px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                {searchTerm
                  ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                  : 'Start creating educational content to build your library.'}
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={() => navigate('/admin/create')}
                sx={{
                  background: colors.buttonBg,
                  color: colors.buttonText,
                  borderRadius: 3,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  boxShadow: `0 8px 32px ${colors.shadow}`,
                  '&:hover': {
                    background: colors.buttonBg,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 12px 40px ${colors.shadow}`,
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Create Content
              </Button>
            </Card>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Grid container spacing={4}>
              {filteredPages.map((page, index) => (
                <Grid item xs={12} md={6} lg={4} key={page.pageId}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 1 + index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -8 }}
                  >
                    <Card
                      sx={{
                        borderRadius: 4,
                        height: '100%',
                        transition: 'all 0.3s ease',
                        background: colors.secondary,
                        border: `1px solid ${colors.subtle}`,
                        boxShadow: `0 8px 32px ${colors.shadow}`,
                        '&:hover': {
                          boxShadow: `0 20px 40px ${colors.accent}20`,
                          borderColor: colors.accent,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        {/* Content Header */}
                        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                          <Chip
                            label={`Page ${page.pageNumber}`}
                            size="small"
                            sx={{
                              background: colors.accent,
                              color: 'white',
                              fontWeight: 600,
                              fontSize: '0.75rem',
                              px: 2,
                              py: 0.5,
                            }}
                          />
                          <Box
                            sx={{
                              width: 36,
                              height: 36,
                              borderRadius: 2,
                              background: colors.buttonBg,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <AutoAwesome sx={{ color: colors.buttonText, fontSize: 18 }} />
                          </Box>
                        </Box>

                        {/* Title */}
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.text,
                            fontWeight: 600,
                            mb: 3,
                            lineHeight: 1.4,
                            fontSize: '1.1rem',
                            minHeight: 70,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {page.chapter}
                        </Typography>

                        {/* Summary Preview */}
                        {page.summary && (
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.textSecondary,
                              mb: 3,
                              lineHeight: 1.6,
                              fontSize: '0.9rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                            }}
                          >
                            {page.summary}
                          </Typography>
                        )}

                        {/* Content Stats */}
                        <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                          <Chip
                            label="AI Generated"
                            size="small"
                            sx={{
                              background: colors.success + '20',
                              color: colors.success,
                              fontSize: '0.7rem',
                              height: 24,
                            }}
                          />
                          {page.hasQuizzes && (
                            <Chip
                              label="Interactive"
                              size="small"
                              sx={{
                                background: colors.warning + '20',
                                color: colors.warning,
                                fontSize: '0.7rem',
                                height: 24,
                              }}
                            />
                          )}
                          <Chip
                            icon={<QrCode sx={{ fontSize: '0.9rem !important' }} />}
                            label="QR Code"
                            size="small"
                            sx={{
                              background: colors.accent + '20',
                              color: colors.accent,
                              fontSize: '0.7rem',
                              height: 24,
                              '& .MuiChip-icon': {
                                color: colors.accent,
                              },
                            }}
                          />
                        </Box>
                      </CardContent>

                      <CardActions sx={{ justifyContent: 'space-between', px: 4, pb: 4, pt: 0 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Button
                            size="small"
                            startIcon={<Visibility />}
                            onClick={() => handleViewContent(page.pageId)}
                            sx={{
                              color: colors.text,
                              borderRadius: 2,
                              px: 3,
                              textTransform: 'none',
                              fontWeight: 600,
                              border: `1px solid ${colors.subtle}`,
                              '&:hover': {
                                background: colors.hover,
                                borderColor: colors.accent,
                              },
                              transition: 'all 0.3s ease',
                            }}
                          >
                            View
                          </Button>
                        </motion.div>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Tooltip title="Edit Content">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleEditContent(page.pageId)}
                                sx={{
                                  background: colors.accent,
                                  color: 'white',
                                  '&:hover': {
                                    background: colors.accentSecondary,
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Edit sx={{ fontSize: 16 }} />
                              </IconButton>
                            </motion.div>
                          </Tooltip>
                          <Tooltip title="Delete Content">
                            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteContent(page.pageId)}
                                sx={{
                                  background: colors.error,
                                  color: 'white',
                                  '&:hover': {
                                    background: '#dc2626',
                                  },
                                  transition: 'all 0.3s ease',
                                }}
                              >
                                <Delete sx={{ fontSize: 16 }} />
                              </IconButton>
                            </motion.div>
                          </Tooltip>
                        </Box>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </Container>
    </Box>
  );
};

export default ContentLibrary;
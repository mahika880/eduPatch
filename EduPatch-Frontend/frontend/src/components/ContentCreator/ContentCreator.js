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
} from '@mui/material';
import { AutoAwesome, Send } from '@mui/icons-material';
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
    <Box>
      <Typography variant="h2" gutterBottom align="center">
        ✨ Create AI-Powered Content
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Card sx={{ maxWidth: 800, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          {activeStep === 0 && (
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Chapter Title"
                name="chapter"
                value={formData.chapter}
                onChange={handleInputChange}
                margin="normal"
                required
                placeholder="e.g., Biology Chapter 8 - Cell Division"
              />
              
              <TextField
                fullWidth
                label="Page Number"
                name="pageNumber"
                value={formData.pageNumber}
                onChange={handleInputChange}
                margin="normal"
                required
                placeholder="e.g., 156"
              />
              
              <TextField
                fullWidth
                label="Textbook Content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                margin="normal"
                required
                multiline
                rows={8}
                placeholder="Paste your textbook content here. The AI will generate a summary, detailed explanation, and quiz questions based on this content."
              />
              
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={<AutoAwesome />}
                  disabled={!formData.content || !formData.chapter || !formData.pageNumber}
                >
                  Generate AI Content
                </Button>
              </Box>
            </form>
          )}

          {activeStep === 1 && (
            <Box textAlign="center" py={4}>
              <CircularProgress size={60} />
              <Typography variant="h6" sx={{ mt: 2 }}>
                AI is analyzing your content...
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Generating summary, explanation, and quiz questions
              </Typography>
            </Box>
          )}

          {activeStep === 2 && result && (
            <Box>
              <Alert severity="success" sx={{ mb: 3 }}>
                Content created successfully! AI has generated a summary, explanation, and {result.quizzes?.length || 1} quiz questions.
              </Alert>
              
              <Typography variant="h6" gutterBottom>
                📄 {result.page.chapter}
              </Typography>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary">
                  AI-Generated Summary:
                </Typography>
                <Typography variant="body2">
                  {result.page.summary}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                <Typography variant="subtitle2" color="primary">
                  AI-Generated Explanation:
                </Typography>
                <Typography variant="body2">
                  {result.page.explanation.substring(0, 200)}...
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Send />}
                  onClick={handlePublish}
                >
                  View Published Content
                </Button>
              </Box>
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ContentCreator;
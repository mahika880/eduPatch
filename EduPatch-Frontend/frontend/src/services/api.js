import axios from 'axios';

// This connects React to your Spring Boot backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include user ID in headers
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.id) {
      config.headers['X-User-ID'] = user.id;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// All your API endpoints
export const apiService = {
  // Authentication (connects to UserController)
  registerUser: (data) => api.post('/user/register', data),
  loginUser: (data) => api.post('/user/login', data),
  
  // Content creation (connects to DemoController)
  createContent: (data) => api.post('/demo/workflow', data),
  
  // Pages (connects to TextBookPageController)
  getAllPages: () => api.get('/pages'),
  getPageById: (pageId) => api.get(`/pages/${pageId}`),
  getQRCode: (pageId) => api.get(`/pages/${pageId}/qrcode`, { responseType: 'blob' }),
  
  // Quizzes (connects to QuizController)
  getQuizzesByPage: (pageId) => api.get(`/quizzes/${pageId}`),
};

export default api;
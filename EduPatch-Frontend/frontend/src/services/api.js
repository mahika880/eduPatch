import axios from 'axios';

// This connects React to your Spring Boot backend
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,  // Points to your Spring Boot server
  headers: {
    'Content-Type': 'application/json',
  },
});

// All your API endpoints
export const apiService = {
  // Authentication (connects to UserController)
  registerUser: (data) => api.post('/user/register', data),
  loginUser: (data) => api.post('/user/login', data),
  
  // User Profile Management
  getUserById: (userId) => api.get(`/user/id/${userId}`),
  updateProfile: (userId, profileData) => api.put(`/user/profile/${userId}`, profileData),
  changePassword: (userId, passwordData) => api.put(`/user/password/${userId}`, passwordData),
  updateSettings: (userId, settingsData) => api.put(`/user/settings/${userId}`, settingsData),
  exportUserData: (userId) => api.get(`/user/export/${userId}`),
  
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
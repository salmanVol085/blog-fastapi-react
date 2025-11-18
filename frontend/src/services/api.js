import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle 401 errors (unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  register: async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
  },
  
  login: async (email, password) => {
    const formData = new FormData();
    formData.append('username', email); // FastAPI OAuth2 uses 'username' field
    formData.append('password', password);
    
    const response = await api.post('/users/login', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  getMe: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },
};

// Blogs API
export const blogsAPI = {
  getAll: async () => {
    const response = await api.get('/feed/');
    return response.data;
  },
  
  getById: async (id) => {
    const response = await api.get(`/blogs/${id}`);
    return response.data;
  },
  
  create: async (blogData) => {
    const response = await api.post('/blogs/', blogData);
    return response.data;
  },
  
  update: async (id, blogData) => {
    const response = await api.put(`/blogs/${id}`, blogData);
    return response.data;
  },
  
  delete: async (id) => {
    const response = await api.delete(`/blogs/${id}`);
    return response.data;
  },
  
  share: async (id, recipientEmail) => {
    const response = await api.post(`/blogs/${id}/share?recipient_email=${recipientEmail}`);
    return response.data;
  },
};

// Comments API
export const commentsAPI = {
  getByBlogId: async (blogId) => {
    const response = await api.get(`/comments/blogs/${blogId}`);
    return response.data;
  },
  create: async (blogId, content) => {
    const response = await api.post(`/comments/blogs/${blogId}`, { content });
    return response.data;
  },
};

// Likes API
export const likesAPI = {
  toggle: async (blogId) => {
    const response = await api.post(`/likes/blogs/${blogId}`);
    return response.data;
  },
};

export default api;


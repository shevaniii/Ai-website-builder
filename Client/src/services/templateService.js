import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Add token to requests if available
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

const templateService = {
  // Get all templates
  getAllTemplates: async () => {
    const response = await api.get('/templates');
    return response.data;
  },

  // Get templates by category
  getTemplatesByCategory: async (category) => {
    const response = await api.get(`/templates?category=${category}`);
    return response.data;
  },

  // Get a single template
  getTemplate: async (templateId) => {
    const response = await api.get(`/templates/${templateId}`);
    return response.data;
  },

  // Create project from template
  createProjectFromTemplate: async (templateId, projectName) => {
    const response = await api.post(`/templates/${templateId}/create-project`, {
      name: projectName,
    });
    return response.data;
  },

  // Save project as template
  saveAsTemplate: async (projectId, templateData) => {
    const response = await api.post('/templates', {
      ...templateData,
      sourceProjectId: projectId,
    });
    return response.data;
  },

  // Get featured templates
  getFeaturedTemplates: async () => {
    const response = await api.get('/templates/featured');
    return response.data;
  },

  // Search templates
  searchTemplates: async (query) => {
    const response = await api.get(`/templates/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  // Get template categories
  getCategories: async () => {
    const response = await api.get('/templates/categories');
    return response.data;
  },

  // Like/unlike template
  toggleTemplateLike: async (templateId) => {
    const response = await api.post(`/templates/${templateId}/like`);
    return response.data;
  },

  // Get user's liked templates
  getLikedTemplates: async () => {
    const response = await api.get('/templates/liked');
    return response.data;
  },

  // Get template preview
  getTemplatePreview: async (templateId) => {
    const response = await api.get(`/templates/${templateId}/preview`);
    return response.data;
  },
};

export default templateService;
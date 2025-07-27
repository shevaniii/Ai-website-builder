import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

// Add token from localStorage to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const projectService = {
  // Get all user projects
  getAllProjects: async () => {
    const response = await api.get('/projects');
    return response.data;
  },

  // Get a single project
  getProject: async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  // Create a new project
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  // Update an existing project
  updateProject: async (projectId, updates) => {
    const response = await api.put(`/projects/${projectId}`, updates);
    return response.data;
  },

  // Delete a project
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  // Duplicate a project
  duplicateProject: async (projectId) => {
    const response = await api.post(`/projects/${projectId}/duplicate`);
    return response.data;
  },

  // Save website content for a project
  saveProjectContent: async (projectId, content) => {
    const response = await api.put(`/projects/${projectId}/content`, { content });
    return response.data;
  },

  // ✅ NEW: Publish a project
  publishProject: async (projectId) => {
    const response = await api.post(`/projects/${projectId}/publish`);
    return response.data;
  },

  // ✅ NEW: Unpublish a project
  unpublishProject: async (projectId) => {
    const response = await api.post(`/projects/${projectId}/unpublish`);
    return response.data;
  },

  // ✅ NEW: Rename a project
  renameProject: async (projectId, newName) => {
    const response = await api.put(`/projects/${projectId}/rename`, { name: newName });
    return response.data;
  },

  // ✅ NEW: Get published website URL
  getPublishedUrl: async (projectId) => {
    const response = await api.get(`/projects/${projectId}/url`);
    return response.data;
  },
};

export default projectService;

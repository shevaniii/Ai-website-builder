// src/config/env.js
// Vite uses import.meta.env instead of process.env

const config = {
  // API Configuration
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'AI Website Builder',
  
  // Environment
  NODE_ENV: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  
  // AI Configuration (if needed on frontend)
  AI_ENABLED: import.meta.env.VITE_AI_ENABLED === 'true',
  
  // Other frontend configs
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};

export default config;
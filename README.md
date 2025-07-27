# MERN Website Builder - Setup Guide

## 🚀 Quick Start (Development)

### Prerequisites
- Node.js v16+ and npm v8+
- MongoDB (local or cloud)
- Git

### 1. Clone and Setup
```bash
git clone <your-repo-url>
cd mern-website-builder
npm run install-deps
```

### 2. Environment Configuration

#### Backend (.env in server/)
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/website-builder
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
CLIENT_URL=http://localhost:3000

# AI API (choose one)
OPENAI_API_KEY=your-openai-api-key-here
# OR
GEMINI_API_KEY=your-gemini-api-key-here

# Optional: Cloudinary for image uploads
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Frontend (.env in client/)
```bash
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_APP_NAME=Website Builder
```

### 3. Database Setup
```bash
# Start MongoDB (if using local)
mongod

# Seed templates (optional)
cd server && npm run seed
```

### 4. Start Development Servers
```bash
# From project root - starts both frontend and backend
npm run dev

# Or separately:
npm run server  # Backend on :5000
npm run client  # Frontend on :3000
```

## 🌐 Deployment Guide

### Frontend Deployment (Vercel - Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel

2. **Configure Build Settings**
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/build`
   - Install Command: `cd client && npm install`

3. **Environment Variables**
   ```
   REACT_APP_API_URL=https://your-backend-url.railway.app/api
   ```

### Backend Deployment (Railway - Recommended)

1. **Connect Repository**
   - Connect GitHub repository to Railway
   - Select backend service

2. **Configure Settings**
   - Root Directory: `server`
   - Build Command: `npm install`
   - Start Command: `npm start`

3. **Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-production-jwt-secret
   CLIENT_URL=https://your-frontend-url.vercel.app
   OPENAI_API_KEY=your-openai-api-key
   ```

### Database Deployment (MongoDB Atlas)

1. **Create Cluster**
   - Sign up at MongoDB Atlas
   - Create a free cluster
   - Configure network access (0.0.0.0/0 for development)

2. **Get Connection String**
   - Create database user
   - Get connection string
   - Replace in MONGODB_URI

## 📊 Project Structure Overview

```
mern-website-builder/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Route components
│   │   ├── redux/         # State management
│   │   ├── services/      # API calls
│   │   └── hooks/         # Custom hooks
│   └── public/
├── server/                 # Node.js backend
│   ├── controllers/        # Route handlers
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── middleware/        # Custom middleware
│   └── utils/             # Helper functions
└── shared/                # Shared utilities
```

## 🎯 Key Features Implemented

✅ **Authentication System** - JWT-based auth with registration/login
✅ **Drag & Drop Builder** - Visual component placement with React DnD
✅ **Component Library** - Pre-built UI components (text, images, buttons, containers)
✅ **Real-time Preview** - Live preview of website changes
✅ **Project Management** - Save, load, and manage multiple projects
✅ **Template System** - Pre-designed templates for quick start
✅ **AI Assistant** - Content generation and layout suggestions
✅ **Export Functionality** - Generate clean HTML/CSS/JS code
✅ **Responsive Design** - Mobile-first responsive templates
✅ **Property Panel** - Visual editing of component properties

## 🧪 Testing Checklist

- [ ] User registration and login
- [ ] Create new project
- [ ] Drag components to canvas
- [ ] Edit component properties
- [ ] Save and load projects
- [ ] Use templates
- [ ] AI content generation
- [ ] Export project
- [ ] Responsive preview modes

## 🎤 Demo Script for Interview

1. **Project Overview** (2 min)
   - Explain MERN stack architecture
   - Highlight key features and technologies used

2. **Live Demonstration** (5 min)
   - User authentication flow
   - Creating a new project
   - Drag-and-drop functionality
   - Component editing
   - AI assistant features
   - Template usage
   - Export functionality

3. **Code Walkthrough** (3 min)
   - Show Redux state management
   - Explain drag-and-drop implementation
   - Demonstrate API integration
   - Highlight responsive design approach

4. **Technical Challenges** (2 min)
   - Discuss complex state management
   - Explain real-time preview implementation
   - Talk about AI integration challenges
   - Mention deployment considerations

## 🔧 Troubleshooting

### Common Issues:

**Backend won't start:**
- Check MongoDB connection
- Verify environment variables
- Ensure port 5000 is available

**Frontend build fails:**
- Clear node_modules and reinstall
- Check for TypeScript errors
- Verify environment variables

**AI features not working:**
- Verify API keys are set
- Check API rate limits
- Ensure backend endpoints are accessible

**Drag and drop issues:**
- Check React DnD backend setup
- Verify component types match
- Clear browser cache

## 📈 Performance Optimization

- **Frontend**: Code splitting, lazy loading, image optimization
- **Backend**: Database indexing, response caching, API rate limiting
- **Database**: Proper indexing, query optimization
- **Deployment**: CDN usage, gzipped assets, environment optimization

## 🛡️ Security Features

- JWT token authentication
- Input validation and sanitization
- CORS configuration
- Rate limiting
- Environment variable protection
- SQL injection prevention (NoSQL)
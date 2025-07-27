// server/routes/projects.js
const express = require('express');
const Project = require('../models/Project');
const { auth } = require('../middleware/auth');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// Get all user projects
router.get('/', auth, async (req, res) => {
  try {
    const projects = await Project.find({ user: req.userId })
      .populate('template', 'name thumbnail category')
      .sort({ lastModified: -1 });
    
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get project by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.userId
    }).populate('template', 'name thumbnail category');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new project
router.post('/', [auth, [
  body('title').isLength({ min: 1 }).trim().escape(),
  body('description').optional().isLength({ max: 500 }).trim().escape()
]], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const project = new Project({
      ...req.body,
      user: req.userId
    });

    await project.save();
    await project.populate('template', 'name thumbnail category');

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update project
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { ...req.body, lastModified: new Date() },
      { new: true, runValidators: true }
    ).populate('template', 'name thumbnail category');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.id,
      user: req.userId
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Export project as HTML
router.get('/:id/export', auth, async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      user: req.userId
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Generate HTML/CSS/JS from components
    const html = generateHTML(project);
    const css = generateCSS(project);
    const js = generateJS(project);

    res.json({
      html,
      css,
      js,
      metadata: project.metadata
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper functions for export
function generateHTML(project) {
  const { components, metadata } = project;
  
  const componentHTML = components.map(component => {
    return `<div class="component-${component.type}" id="${component.id}">
      ${component.children ? component.children.map(child => 
        typeof child === 'string' ? child : JSON.stringify(child)
      ).join('') : ''}
    </div>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${metadata.title}</title>
  <meta name="description" content="${metadata.description}">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  ${componentHTML}
  <script src="script.js"></script>
</body>
</html>`;
}

function generateCSS(project) {
  const { components, settings } = project;
  
  let css = `
/* Generated CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: ${settings.font || 'Inter'}, sans-serif;
  color: ${settings.theme === 'dark' ? '#ffffff' : '#000000'};
  background-color: ${settings.theme === 'dark' ? '#1a1a1a' : '#ffffff'};
}
`;

  components.forEach(component => {
    if (component.styles) {
      css += `
.component-${component.type}#${component.id} {`;
      Object.entries(component.styles).forEach(([property, value]) => {
        css += `
  ${property}: ${value};`;
      });
      css += `
}`;
    }
  });

  return css;
}

function generateJS(project) {
  return `
// Generated JavaScript
document.addEventListener('DOMContentLoaded', function() {
  console.log('Website loaded successfully');
  
  // Add any interactive functionality here
  const components = document.querySelectorAll('[class*="component-"]');
  components.forEach(component => {
    component.addEventListener('click', function() {
      console.log('Component clicked:', this.id);
    });
  });
});
`;
}

module.exports = router;

const express = require('express');
const { auth } = require('../middleware/auth');
const { generateContent, generateLayout, optimizeContent } = require('../utils/aiHelpers');

const router = express.Router();

// Generate content based on prompt
router.post('/generate-content', auth, async (req, res) => {
  try {
    const { prompt, type, context } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ message: 'Prompt is required' });
    }

    const content = await generateContent(prompt, type, context);
    res.json({ content });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate layout suggestions
router.post('/generate-layout', auth, async (req, res) => {
  try {
    const { description, components } = req.body;
    
    const layout = await generateLayout(description, components);
    res.json({ layout });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Optimize existing content
router.post('/optimize-content', auth, async (req, res) => {
  try {
    const { content, goals } = req.body;
    
    const optimized = await optimizeContent(content, goals);
    res.json({ optimized });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

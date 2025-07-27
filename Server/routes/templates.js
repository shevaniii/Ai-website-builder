// server/routes/templates.js
const express = require('express');
const Template = require('../models/Template');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Get all templates
router.get('/', async (req, res) => {
  try {
    const { category, isPremium } = req.query;
    const filter = {};
    
    if (category) filter.category = category;
    if (isPremium !== undefined) filter.isPremium = isPremium === 'true';

    const templates = await Template.find(filter).sort({ usage: -1 });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get template by ID
router.get('/:id', async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }
    
    // Increment usage count
    template.usage += 1;
    await template.save();
    
    res.json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new template (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const template = new Template(req.body);
    await template.save();
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
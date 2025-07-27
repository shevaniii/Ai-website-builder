const mongoose = require('mongoose');
const Template = require('../models/Template');
require('dotenv').config();

const templates = [
  {
    name: 'Modern Portfolio',
    description: 'Clean and modern portfolio template perfect for creatives and professionals',
    category: 'portfolio',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    components: [
      {
        id: 'header-1',
        type: 'container',
        props: {},
        styles: { backgroundColor: '#1976d2', color: 'white', padding: '20px' },
        position: { x: 0, y: 0 },
        children: [
          {
            id: 'nav-1',
            type: 'text',
            props: { content: 'John Doe - Portfolio' },
            styles: { fontSize: '24px', fontWeight: 'bold' }
          }
        ]
      },
      {
        id: 'hero-1',
        type: 'container',
        props: {},
        styles: { padding: '60px 20px', textAlign: 'center' },
        position: { x: 0, y: 80 },
        children: [
          {
            id: 'hero-title',
            type: 'heading',
            props: { content: 'Creative Designer & Developer', level: 'h1' },
            styles: { fontSize: '48px', marginBottom: '20px' }
          },
          {
            id: 'hero-desc',
            type: 'text',
            props: { content: 'I create beautiful and functional digital experiences' },
            styles: { fontSize: '18px', color: '#666' }
          }
        ]
      }
    ],
    settings: {
      theme: 'light',
      primaryColor: '#1976d2',
      font: 'Inter'
    },
    isPremium: false
  },
  {
    name: 'Business Landing',
    description: 'Professional landing page template for businesses and startups',
    category: 'business',
    thumbnail: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=300&fit=crop',
    components: [
      {
        id: 'header-2',
        type: 'container',
        props: {},
        styles: { backgroundColor: '#2196f3', color: 'white', padding: '20px' },
        position: { x: 0, y: 0 }
      },
      {
        id: 'hero-2',
        type: 'container',
        props: {},
        styles: { padding: '80px 20px', textAlign: 'center', backgroundColor: '#f5f5f5' },
        position: { x: 0, y: 80 }
      }
    ],
    settings: {
      theme: 'light',
      primaryColor: '#2196f3',
      font: 'Roboto'
    },
    isPremium: true
  },
  {
    name: 'E-commerce Store',
    description: 'Complete e-commerce template with product showcase and shopping features',
    category: 'ecommerce',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    components: [],
    settings: {
      theme: 'light',
      primaryColor: '#4caf50',
      font: 'Open Sans'
    },
    isPremium: true
  },
  {
    name: 'Personal Blog',
    description: 'Minimalist blog template perfect for writers and content creators',
    category: 'blog',
    thumbnail: 'https://images.unsplash.com/photo-1486312338219-ce68e2c6b81d?w=400&h=300&fit=crop',
    components: [],
    settings: {
      theme: 'light',
      primaryColor: '#ff9800',
      font: 'Georgia'
    },
    isPremium: false
  }
];

async function seedTemplates() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/website-builder');
    
    // Clear existing templates
    await Template.deleteMany({});
    
    // Insert new templates
    await Template.insertMany(templates);
    
    console.log('Templates seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding templates:', error);
    process.exit(1);
  }
}

seedTemplates();

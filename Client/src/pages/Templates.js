// client/src/pages/Templates.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Search, Preview, GetApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Templates = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState([
    {
      _id: '1',
      name: 'Modern Portfolio',
      description: 'Clean and modern portfolio template for creatives',
      category: 'portfolio',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPremium: false,
      usage: 145,
    },
    {
      _id: '2',
      name: 'Business Landing',
      description: 'Professional landing page for businesses',
      category: 'business',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPremium: true,
      usage: 89,
    },
    {
      _id: '3',
      name: 'E-commerce Store',
      description: 'Complete e-commerce template with shopping cart',
      category: 'ecommerce',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPremium: true,
      usage: 67,
    },
    {
      _id: '4',
      name: 'Personal Blog',
      description: 'Minimalist blog template for writers',
      category: 'blog',
      thumbnail: 'https://via.placeholder.com/400x300',
      isPremium: false,
      usage: 203,
    },
  ]);

  const [filteredTemplates, setFilteredTemplates] = useState(templates);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [previewDialog, setPreviewDialog] = useState({ open: false, template: null });

  const categories = ['all', 'portfolio', 'business', 'ecommerce', 'blog', 'landing', 'personal'];

  useEffect(() => {
    let filtered = templates;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(template => template.category === categoryFilter);
    }

    setFilteredTemplates(filtered);
  }, [searchQuery, categoryFilter, templates]);

  const handleUseTemplate = (template) => {
    // Create new project with template
    const projectId = Date.now().toString();
    navigate(`/builder/${projectId}?template=${template._id}`);
  };

  const handlePreview = (template) => {
    setPreviewDialog({ open: true, template });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Templates
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Choose from our collection of professionally designed templates
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <TextField
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          size="small"
          sx={{ flexGrow: 1, minWidth: '200px' }}
          InputProps={{
            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />
        
        <FormControl size="small" sx={{ minWidth: '150px' }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            label="Category"
          >
            {categories.map(category => (
              <MenuItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Templates Grid */}
      <Grid container spacing={3}>
        {filteredTemplates.map((template) => (
          <Grid item xs={12} sm={6} md={4} key={template._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={template.thumbnail}
                alt={template.name}
                sx={{ cursor: 'pointer' }}
                onClick={() => handlePreview(template)}
              />
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="h2">
                    {template.name}
                  </Typography>
                  {template.isPremium && (
                    <Chip label="Premium" color="primary" size="small" />
                  )}
                </Box>
                
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {template.description}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={template.category}
                    variant="outlined"
                    size="small"
                  />
                  <Chip
                    label={`${template.usage} uses`}
                    variant="outlined"
                    size="small"
                  />
                </Box>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Preview />}
                  onClick={() => handlePreview(template)}
                >
                  Preview
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  startIcon={<GetApp />}
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredTemplates.length === 0 && (
        <Box textAlign="center" mt={6}>
          <Typography variant="h6" color="textSecondary">
            No templates found
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Try adjusting your search or filter criteria
          </Typography>
        </Box>
      )}

      {/* Preview Dialog */}
      <Dialog
        open={previewDialog.open}
        onClose={() => setPreviewDialog({ open: false, template: null })}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          {previewDialog.template?.name}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img
              src={previewDialog.template?.thumbnail}
              alt={previewDialog.template?.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Box>
          <Typography variant="body1" mb={2}>
            {previewDialog.template?.description}
          </Typography>
          <Box display="flex" gap={1}>
            <Chip label={previewDialog.template?.category} variant="outlined" />
            {previewDialog.template?.isPremium && (
              <Chip label="Premium" color="primary" />
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewDialog({ open: false, template: null })}>
            Close
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              handleUseTemplate(previewDialog.template);
              setPreviewDialog({ open: false, template: null });
            }}
          >
            Use This Template
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Templates;

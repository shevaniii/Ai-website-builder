import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  MoreVert,
  Visibility,
  Download,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([
    {
      _id: '1',
      title: 'My Portfolio',
      description: 'Personal portfolio website',
      lastModified: new Date(),
      isPublished: true,
      template: { name: 'Portfolio Template', category: 'portfolio' }
    },
    {
      _id: '2',
      title: 'Business Landing',
      description: 'Landing page for my business',
      lastModified: new Date(Date.now() - 86400000),
      isPublished: false,
      template: { name: 'Business Template', category: 'business' }
    }
  ]);
  
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleCreateProject = () => {
    if (newProject.title.trim()) {
      const project = {
        _id: Date.now().toString(),
        ...newProject,
        lastModified: new Date(),
        isPublished: false,
        template: null
      };
      
      setProjects([project, ...projects]);
      setCreateDialogOpen(false);
      setNewProject({ title: '', description: '' });
      navigate(`/builder/${project._id}`);
    }
  };

  const handleMenuClick = (event, project) => {
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProject(null);
  };

  const handleDeleteProject = () => {
    setProjects(projects.filter(p => p._id !== selectedProject._id));
    handleMenuClose();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <div>
          <Typography variant="h4" component="h1" gutterBottom>
            My Projects
          </Typography>
          <Typography variant="body1" color="textSecondary">
            Manage your website projects and templates
          </Typography>
        </div>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateDialogOpen(true)}
          size="large"
        >
          New Project
        </Button>
      </Box>

      <Grid container spacing={3}>
        {projects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <Typography variant="h6" component="h2" noWrap>
                    {project.title}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuClick(e, project)}
                  >
                    <MoreVert />
                  </IconButton>
                </Box>
                
                <Typography variant="body2" color="textSecondary" mb={2}>
                  {project.description || 'No description'}
                </Typography>
                
                <Box display="flex" gap={1} mb={2}>
                  <Chip
                    label={project.isPublished ? 'Published' : 'Draft'}
                    color={project.isPublished ? 'success' : 'default'}
                    size="small"
                  />
                  {project.template && (
                    <Chip
                      label={project.template.category}
                      variant="outlined"
                      size="small"
                    />
                  )}
                </Box>
                
                <Typography variant="caption" color="textSecondary">
                  Modified: {new Date(project.lastModified).toLocaleDateString()}
                </Typography>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  startIcon={<Edit />}
                  onClick={() => navigate(`/builder/${project._id}`)}
                >
                  Edit
                </Button>
                {project.isPublished && (
                  <Button
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => window.open(`/preview/${project._id}`, '_blank')}
                  >
                    Preview
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Menu for project actions */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => navigate(`/builder/${selectedProject?._id}`)}>
          <Edit fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Download fontSize="small" sx={{ mr: 1 }} />
          Export
        </MenuItem>
        <MenuItem onClick={handleDeleteProject} sx={{ color: 'error.main' }}>
          <Delete fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

      {/* Create Project Dialog */}
      <Dialog open={createDialogOpen} onClose={() => setCreateDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Project Title"
            fullWidth
            variant="outlined"
            value={newProject.title}
            onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Description (Optional)"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newProject.description}
            onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateDialogOpen(false)}>Cancel</Button>
          <Button 
            onClick={handleCreateProject} 
            variant="contained"
            disabled={!newProject.title.trim()}
          >
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Dashboard;
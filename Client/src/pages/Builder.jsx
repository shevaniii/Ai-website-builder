// Imports
import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Undo,
  Redo,
  Save,
  Preview,
  Smartphone,
  Tablet,
  Computer,
  ExpandMore
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import ComponentLibrary from '../components/builder/ComponentLibrary.jsx';
import Canvas from '../components/builder/Canvas.jsx';
import PropertyPanel from '../components/builder/PropertyPanel.jsx';
import AIAssistant from '../components/builder/AIAssistant.jsx';
import {
  addComponent,
  selectComponent,
  undo,
  redo,
  togglePreviewMode,
  updateCanvasSettings
} from '../redux/slices/builderSlice';

const DRAWER_WIDTH = 280;

const Builder = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();

  const { 
    canvas,
    isPreviewMode
  } = useSelector(state => state.builder);

  // Extract the correct data from the Redux state
  const components = canvas.elements || [];
  const selectedComponent = canvas.selectedElement;
  const previewMode = isPreviewMode;
  const canvasSettings = canvas.canvasSettings;

  const [viewportSize, setViewportSize] = useState('desktop');
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(true);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);

  const viewportSizes = {
    mobile: { width: 375, icon: Smartphone },
    tablet: { width: 768, icon: Tablet },
    desktop: { width: '100%', icon: Computer },
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Implement save functionality
      console.log('Saving project...', { components, canvasSettings });
      // Add actual save logic here
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting project...');
  };

  return (
    <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)' }}>
      {/* Left Sidebar */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={leftDrawerOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Components
          </Typography>
          <ComponentLibrary />
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Top Toolbar */}
        <Paper elevation={1} sx={{ zIndex: 1 }}>
          <Toolbar>
            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              <IconButton onClick={() => dispatch(undo())}>
                <Undo />
              </IconButton>
              <IconButton onClick={() => dispatch(redo())}>
                <Redo />
              </IconButton>
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />

            <Box sx={{ display: 'flex', gap: 1, mr: 2 }}>
              {Object.entries(viewportSizes).map(([size, config]) => {
                const IconComponent = config.icon;
                return (
                  <IconButton
                    key={size}
                    onClick={() => setViewportSize(size)}
                    color={viewportSize === size ? 'primary' : 'default'}
                  >
                    <IconComponent />
                  </IconButton>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 1 }} />

            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<Preview />}
                onClick={() => dispatch(togglePreviewMode())}
              >
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="contained"
                startIcon={<Save />}
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save'}
              </Button>
            </Box>
          </Toolbar>
        </Paper>

        {/* Canvas Area */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            bgcolor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            p: 2,
          }}
        >
          <Paper
            elevation={3}
            sx={{
              width: viewportSizes[viewportSize].width,
              minHeight: '800px',
              bgcolor: 'white',
              position: 'relative',
            }}
          >
            <Canvas 
              components={components}
              selectedComponent={selectedComponent}
              previewMode={previewMode}
              onSelectComponent={(id) => dispatch(selectComponent(id))}
            />
          </Paper>
        </Box>
      </Box>

      {/* Right Sidebar */}
      <Drawer
        variant="persistent"
        anchor="right"
        open={rightDrawerOpen}
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            position: 'relative',
            height: '100%',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Properties
          </Typography>
          <PropertyPanel 
            selectedComponent={selectedComponent}
            components={components}
          />

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Theme</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControlLabel
                control={
                  <Switch
                    checked={canvasSettings?.theme === 'dark'}
                    onChange={(e) =>
                      dispatch(updateCanvasSettings({
                        theme: e.target.checked ? 'dark' : 'light',
                      }))
                    }
                  />
                }
                label="Dark Mode"
              />
            </AccordionDetails>
          </Accordion>

          <Button
            fullWidth
            variant="outlined"
            onClick={() => setAiOpen(true)}
            sx={{ mt: 2 }}
          >
            AI Assistant
          </Button>
        </Box>
      </Drawer>

      {/* AI Assistant Dialog */}
      <AIAssistant open={aiOpen} onClose={() => setAiOpen(false)} />
    </Box>
  );
};

export default Builder;

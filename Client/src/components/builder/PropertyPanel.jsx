// client/src/components/builder/PropertyPanel.js
import React from 'react';
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Slider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from '@mui/material';
import { ExpandMore, ColorLens } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateComponent } from '../../redux/slices/builderSlice.js';

const PropertyPanel = ({ selectedComponent, components }) => {
  const dispatch = useDispatch();
  const component = components.find(c => c.id === selectedComponent);

  const handlePropertyChange = (property, value) => {
    if (component) {
      dispatch(updateComponent({
        id: component.id,
        updates: {
          props: {
            ...component.props,
            [property]: value,
          },
        },
      }));
    }
  };

  const handleStyleChange = (property, value) => {
    if (component) {
      dispatch(updateComponent({
        id: component.id,
        updates: {
          styles: {
            ...component.styles,
            [property]: value,
          },
        },
      }));
    }
  };

  if (!component) {
    return (
      <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>Select a component to edit its properties</Typography>
      </Box>
    );
  }

  const renderPropertiesForType = () => {
    switch (component.type) {
      case 'text':
      case 'heading':
        return (
          <>
            <TextField
              fullWidth
              label="Content"
              value={component.props.content || ''}
              onChange={(e) => handlePropertyChange('content', e.target.value)}
              multiline={component.type === 'text'}
              rows={component.type === 'text' ? 3 : 1}
              sx={{ mb: 2 }}
            />
            {component.type === 'heading' && (
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Heading Level</InputLabel>
                <Select
                  value={component.props.level || 'h1'}
                  onChange={(e) => handlePropertyChange('level', e.target.value)}
                >
                  <MenuItem value="h1">H1</MenuItem>
                  <MenuItem value="h2">H2</MenuItem>
                  <MenuItem value="h3">H3</MenuItem>
                  <MenuItem value="h4">H4</MenuItem>
                  <MenuItem value="h5">H5</MenuItem>
                  <MenuItem value="h6">H6</MenuItem>
                </Select>
              </FormControl>
            )}
          </>
        );

      case 'button':
        return (
          <>
            <TextField
              fullWidth
              label="Button Text"
              value={component.props.text || ''}
              onChange={(e) => handlePropertyChange('text', e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Variant</InputLabel>
              <Select
                value={component.props.variant || 'contained'}
                onChange={(e) => handlePropertyChange('variant', e.target.value)}
              >
                <MenuItem value="contained">Contained</MenuItem>
                <MenuItem value="outlined">Outlined</MenuItem>
                <MenuItem value="text">Text</MenuItem>
              </Select>
            </FormControl>
          </>
        );

      case 'image':
        return (
          <>
            <TextField
              fullWidth
              label="Image URL"
              value={component.props.src || ''}
              onChange={(e) => handlePropertyChange('src', e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Alt Text"
              value={component.props.alt || ''}
              onChange={(e) => handlePropertyChange('alt', e.target.value)}
              sx={{ mb: 2 }}
            />
          </>
        );

      default:
        return (
          <Typography variant="body2" color="textSecondary">
            No properties available for this component type.
          </Typography>
        );
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" gutterBottom>
        {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Properties
      </Typography>

      {/* Component-specific properties */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Content</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderPropertiesForType()}
        </AccordionDetails>
      </Accordion>

      {/* Style properties */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Appearance</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            label="Background Color"
            value={component.styles?.backgroundColor || ''}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
            placeholder="#ffffff"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Text Color"
            value={component.styles?.color || ''}
            onChange={(e) => handleStyleChange('color', e.target.value)}
            placeholder="#000000"
            sx={{ mb: 2 }}
          />
          <Typography gutterBottom>Font Size</Typography>
          <Slider
            value={parseInt(component.styles?.fontSize) || 16}
            onChange={(e, value) => handleStyleChange('fontSize', `${value}px`)}
            min={10}
            max={72}
            valueLabelDisplay="auto"
            sx={{ mb: 2 }}
          />
        </AccordionDetails>
      </Accordion>

      {/* Position properties */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography>Position</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <TextField
              label="X"
              type="number"
              value={component.position?.x || 0}
              onChange={(e) => dispatch(updateComponent({
                id: component.id,
                updates: {
                  position: {
                    ...component.position,
                    x: parseInt(e.target.value) || 0,
                  },
                },
              }))}
              size="small"
            />
            <TextField
              label="Y"
              type="number"
              value={component.position?.y || 0}
              onChange={(e) => dispatch(updateComponent({
                id: component.id,
                updates: {
                  position: {
                    ...component.position,
                    y: parseInt(e.target.value) || 0,
                  },
                },
              }))}
              size="small"
            />
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default PropertyPanel;

// client/src/components/builder/BuilderComponent.js
import React from 'react';
import { Box, Typography, Button, IconButton } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { deleteComponent, updateComponent } from '../../redux/slices/builderSlice.js';

const BuilderComponent = ({ component, isSelected, previewMode, onSelect }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(deleteComponent(component.id));
  };

  const renderComponent = () => {
    // Handle both 'props' and 'properties' for backward compatibility
    const componentProps = component.properties || component.props || {};
    
    const commonStyles = {
      position: 'absolute',
      left: component.position?.x || 0,
      top: component.position?.y || 0,
      minWidth: '100px',
      minHeight: '30px',
      border: isSelected && !previewMode ? '2px solid #1976d2' : '1px solid transparent',
      ...component.styles,
    };

    switch (component.type) {
      case 'text':
        return (
          <Typography
            sx={commonStyles}
            onClick={(e) => {
              e.stopPropagation();
              if (!previewMode) onSelect();
            }}
          >
            {componentProps.content || 'Sample text'}
            {isSelected && !previewMode && (
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Typography>
        );

      case 'heading':
        const HeadingComponent = componentProps.level || 'h1';
        return (
          <Box
            component={HeadingComponent}
            sx={commonStyles}
            onClick={(e) => {
              e.stopPropagation();
              if (!previewMode) onSelect();
            }}
          >
            {componentProps.content || 'Sample Heading'}
            {isSelected && !previewMode && (
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      case 'button':
        return (
          <Box
            sx={commonStyles}
            onClick={(e) => {
              e.stopPropagation();
              if (!previewMode) onSelect();
            }}
          >
            <Button variant={componentProps.variant || 'contained'}>
              {componentProps.text || 'Click Me'}
            </Button>
            {isSelected && !previewMode && (
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      case 'image':
        return (
          <Box
            sx={commonStyles}
            onClick={(e) => {
              e.stopPropagation();
              if (!previewMode) onSelect();
            }}
          >
            <img
              src={componentProps.src || 'https://via.placeholder.com/300x200'}
              alt={componentProps.alt || 'Sample Image'}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            {isSelected && !previewMode && (
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      case 'container':
        return (
          <Box
            sx={{
              ...commonStyles,
              border: isSelected && !previewMode ? '2px dashed #1976d2' : '1px dashed #ccc',
              minHeight: '100px',
              backgroundColor: 'rgba(0,0,0,0.05)',
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!previewMode) onSelect();
            }}
          >
            <Typography variant="caption" sx={{ position: 'absolute', top: 5, left: 5 }}>
              Container
            </Typography>
            {isSelected && !previewMode && (
              <IconButton
                size="small"
                onClick={handleDelete}
                sx={{ position: 'absolute', top: -10, right: -10, bgcolor: 'error.main', color: 'white' }}
              >
                <Delete fontSize="small" />
              </IconButton>
            )}
          </Box>
        );

      default:
        return (
          <Box sx={commonStyles}>
            <Typography>Unknown Component: {component.type}</Typography>
          </Box>
        );
    }
  };

  return renderComponent();
};

export default BuilderComponent;

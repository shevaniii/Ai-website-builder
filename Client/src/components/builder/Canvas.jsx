// client/src/components/builder/Canvas.js
import React from 'react';
import { Box } from '@mui/material';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { addComponent } from '../../redux/slices/builderSlice.js';
import BuilderComponent from './BuilderComponent.jsx';

const Canvas = ({ components, selectedComponent, previewMode, onSelectComponent }) => {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: 'component',
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset();
      const canvasRect = monitor.getDropResult();
      
      if (offset && canvasRect) {
        const position = {
          x: offset.x - canvasRect.left,
          y: offset.y - canvasRect.top,
        };
        
        dispatch(addComponent({
          type: item.type,
          position,
          props: getDefaultProps(item.type),
        }));
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const getDefaultProps = (type) => {
    const defaults = {
      text: { content: 'Sample text' },
      heading: { content: 'Sample Heading', level: 'h1' },
      button: { text: 'Click Me', variant: 'contained' },
      image: { src: 'https://via.placeholder.com/300x200', alt: 'Sample Image' },
      container: { children: [] },
      row: { children: [] },
      column: { children: [] },
    };
    
    return defaults[type] || {};
  };

  return (
    <Box
      ref={drop}
      sx={{
        minHeight: '100%',
        position: 'relative',
        bgcolor: isOver ? 'action.hover' : 'transparent',
        border: isOver ? '2px dashed' : 'none',
        borderColor: 'primary.main',
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelectComponent(null);
      }}
    >
      {components.map((component) => (
        <BuilderComponent
          key={component.id}
          component={component}
          isSelected={selectedComponent === component.id}
          previewMode={previewMode}
          onSelect={() => onSelectComponent(component.id)}
        />
      ))}
      
      {components.length === 0 && !previewMode && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: 'text.secondary',
          }}
        >
          Drag components here to start building
        </Box>
      )}
    </Box>
  );
};

export default Canvas;
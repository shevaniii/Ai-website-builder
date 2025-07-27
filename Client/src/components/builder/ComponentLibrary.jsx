// client/src/components/builder/ComponentLibrary.js
import React from 'react';
import SmartButtonIcon from '@mui/icons-material/SmartButton';

import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import {
  TextFields,
  Image,
  ViewColumn,
  ExpandMore,
} from '@mui/icons-material';
import { useDrag } from 'react-dnd';

const componentCategories = {
  'Basic': [
    { type: 'text', label: 'Text', icon: TextFields },
    { type: 'heading', label: 'Heading', icon: TextFields },
    { type: 'button', label: 'Button', icon: SmartButtonIcon },
    { type: 'image', label: 'Image', icon: Image },
  ],
  'Layout': [
    { type: 'container', label: 'Container', icon: ViewColumn },
    { type: 'row', label: 'Row', icon: ViewColumn },
    { type: 'column', label: 'Column', icon: ViewColumn },
  ],
};

const DraggableComponent = ({ component }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: { type: component.type },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const IconComponent = component.icon;

  return (
    <ListItem
      ref={drag}
      button
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      }}
    >
      <ListItemIcon>
        <IconComponent />
      </ListItemIcon>
      <ListItemText primary={component.label} />
    </ListItem>
  );
};

const ComponentLibrary = () => {
  return (
    <Box>
      {Object.entries(componentCategories).map(([category, components]) => (
        <Accordion key={category} defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="subtitle1">{category}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <List dense>
              {components.map((component) => (
                <DraggableComponent key={component.type} component={component} />
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default ComponentLibrary;

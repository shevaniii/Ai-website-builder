import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  canvas: {
    elements: [],
    selectedElement: null,
    draggedElement: null,
    canvasSettings: {
      width: '100%',
      height: '100vh',
      backgroundColor: '#ffffff',
    },
  },
  viewport: {
    mode: 'desktop', // desktop, tablet, mobile
    zoom: 100,
  },
  history: {
    past: [],
    present: null,
    future: [],
  },
  isDragging: false,
  isPreviewMode: false,
};

const builderSlice = createSlice({
  name: 'builder',
  initialState,
  reducers: {
    // Canvas operations
    addElement: (state, action) => {
      const newElement = {
        id: `element_${Date.now()}`,
        type: action.payload.type,
        properties: action.payload.properties,
        position: action.payload.position || { x: 0, y: 0 },
        size: action.payload.size || { width: 200, height: 100 },
        styles: action.payload.styles || {},
      };
      state.canvas.elements.push(newElement);
    },
    
    removeElement: (state, action) => {
      state.canvas.elements = state.canvas.elements.filter(
        element => element.id !== action.payload
      );
      if (state.canvas.selectedElement === action.payload) {
        state.canvas.selectedElement = null;
      }
    },
    
    updateElement: (state, action) => {
      const { id, updates } = action.payload;
      const elementIndex = state.canvas.elements.findIndex(el => el.id === id);
      if (elementIndex !== -1) {
        state.canvas.elements[elementIndex] = {
          ...state.canvas.elements[elementIndex],
          ...updates,
        };
      }
    },
    
    selectElement: (state, action) => {
      state.canvas.selectedElement = action.payload;
    },
    
    clearSelection: (state) => {
      state.canvas.selectedElement = null;
    },
    
    // Drag and drop
    setDraggedElement: (state, action) => {
      state.canvas.draggedElement = action.payload;
      state.isDragging = action.payload !== null;
    },
    
    moveElement: (state, action) => {
      const { id, position } = action.payload;
      const element = state.canvas.elements.find(el => el.id === id);
      if (element) {
        element.position = position;
      }
    },
    
    // Canvas settings
    updateCanvasSettings: (state, action) => {
      state.canvas.canvasSettings = {
        ...state.canvas.canvasSettings,
        ...action.payload,
      };
    },
    
    // Viewport
    setViewportMode: (state, action) => {
      state.viewport.mode = action.payload;
    },
    
    setZoom: (state, action) => {
      state.viewport.zoom = Math.max(25, Math.min(200, action.payload));
    },
    
    // Preview mode
    togglePreviewMode: (state) => {
      state.isPreviewMode = !state.isPreviewMode;
      if (state.isPreviewMode) {
        state.canvas.selectedElement = null;
      }
    },
    
    // History management
    saveToHistory: (state) => {
      state.history.past.push(JSON.parse(JSON.stringify(state.canvas)));
      state.history.future = [];
      // Limit history size
      if (state.history.past.length > 50) {
        state.history.past = state.history.past.slice(-50);
      }
    },
    
    undo: (state) => {
      if (state.history.past.length > 0) {
        state.history.future.unshift(JSON.parse(JSON.stringify(state.canvas)));
        const previousState = state.history.past.pop();
        state.canvas = previousState;
      }
    },
    
    redo: (state) => {
      if (state.history.future.length > 0) {
        state.history.past.push(JSON.parse(JSON.stringify(state.canvas)));
        const nextState = state.history.future.shift();
        state.canvas = nextState;
      }
    },
    
    // Load project
    loadProject: (state, action) => {
      state.canvas = action.payload.canvas || initialState.canvas;
      state.history = { past: [], present: null, future: [] };
    },
    
    // Reset builder
    resetBuilder: (state) => {
      return initialState;
    },
  },
});

export const {
  addElement,
  removeElement,
  updateElement,
  selectElement,
  clearSelection,
  setDraggedElement,
  moveElement,
  updateCanvasSettings,
  setViewportMode,
  setZoom,
  togglePreviewMode,
  saveToHistory,
  undo,
  redo,
  loadProject,
  resetBuilder,
} = builderSlice.actions;

// Export aliases for compatibility with existing components
export const addComponent = addElement;
export const deleteComponent = removeElement;
export const updateComponent = updateElement;
export const selectComponent = selectElement;
export const updateSettings = updateCanvasSettings;

export default builderSlice.reducer;
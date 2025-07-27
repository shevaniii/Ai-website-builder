import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // Sidebar states
  leftSidebar: {
    isOpen: true,
    activeTab: 'components', // components, layers, assets
    width: 280,
  },
  rightSidebar: {
    isOpen: true,
    activeTab: 'properties', // properties, styles, settings
    width: 320,
  },
  
  // Modals and dialogs
  modals: {
    aiAssistant: false,
    exportProject: false,
    projectSettings: false,
    saveTemplate: false,
    importAssets: false,
  },
  
  // Notifications
  notifications: [],
  
  // Loading states
  loadingStates: {
    savingProject: false,
    exportingProject: false,
    aiGenerating: false,
  },
  
  // Theme and UI preferences
  theme: 'light', // light, dark
  gridVisible: true,
  snapToGrid: true,
  gridSize: 10,
  
  // Toolbar states
  activeTools: {
    selectedTool: 'select', // select, pan, zoom
  },
  
  // Responsive design panel
  responsivePanel: {
    isOpen: false,
    activeBreakpoint: 'desktop', // desktop, tablet, mobile
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Sidebar controls
    toggleLeftSidebar: (state) => {
      state.leftSidebar.isOpen = !state.leftSidebar.isOpen;
    },
    toggleRightSidebar: (state) => {
      state.rightSidebar.isOpen = !state.rightSidebar.isOpen;
    },
    setLeftSidebarTab: (state, action) => {
      state.leftSidebar.activeTab = action.payload;
      if (!state.leftSidebar.isOpen) {
        state.leftSidebar.isOpen = true;
      }
    },
    setRightSidebarTab: (state, action) => {
      state.rightSidebar.activeTab = action.payload;
      if (!state.rightSidebar.isOpen) {
        state.rightSidebar.isOpen = true;
      }
    },
    setSidebarWidth: (state, action) => {
      const { sidebar, width } = action.payload;
      if (sidebar === 'left') {
        state.leftSidebar.width = Math.max(200, Math.min(400, width));
      } else if (sidebar === 'right') {
        state.rightSidebar.width = Math.max(250, Math.min(500, width));
      }
    },
    
    // Modal controls
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    },
    closeAllModals: (state) => {
      Object.keys(state.modals).forEach(modal => {
        state.modals[modal] = false;
      });
    },
    
    // Notifications
    addNotification: (state, action) => {
      const notification = {
        id: Date.now(),
        type: action.payload.type || 'info', // success, error, warning, info
        title: action.payload.title,
        message: action.payload.message,
        duration: action.payload.duration || 5000,
        timestamp: new Date().toISOString(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        notification => notification.id !== action.payload
      );
    },
    clearAllNotifications: (state) => {
      state.notifications = [];
    },
    
    // Loading states
    setLoadingState: (state, action) => {
      const { key, isLoading } = action.payload;
      state.loadingStates[key] = isLoading;
    },
    
    // Theme and preferences
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleGrid: (state) => {
      state.gridVisible = !state.gridVisible;
    },
    toggleSnapToGrid: (state) => {
      state.snapToGrid = !state.snapToGrid;
    },
    setGridSize: (state, action) => {
      state.gridSize = Math.max(5, Math.min(50, action.payload));
    },
    
    // Tools
    setActiveTool: (state, action) => {
      state.activeTools.selectedTool = action.payload;
    },
    
    // Responsive panel
    toggleResponsivePanel: (state) => {
      state.responsivePanel.isOpen = !state.responsivePanel.isOpen;
    },
    setActiveBreakpoint: (state, action) => {
      state.responsivePanel.activeBreakpoint = action.payload;
    },
    
    // Bulk UI reset
    resetUI: (state) => {
      return {
        ...initialState,
        theme: state.theme, // Preserve theme preference
      };
    },
  },
});

export const {
  toggleLeftSidebar,
  toggleRightSidebar,
  setLeftSidebarTab,
  setRightSidebarTab,
  setSidebarWidth,
  openModal,
  closeModal,
  closeAllModals,
  addNotification,
  removeNotification,
  clearAllNotifications,
  setLoadingState,
  setTheme,
  toggleGrid,
  toggleSnapToGrid,
  setGridSize,
  setActiveTool,
  toggleResponsivePanel,
  setActiveBreakpoint,
  resetUI,
} = uiSlice.actions;

// Selectors
export const selectLeftSidebar = (state) => state.ui.leftSidebar;
export const selectRightSidebar = (state) => state.ui.rightSidebar;
export const selectActiveModals = (state) => 
  Object.entries(state.ui.modals)
    .filter(([_, isOpen]) => isOpen)
    .map(([modal, _]) => modal);

export default uiSlice.reducer;
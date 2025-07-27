import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import templateService from '../../services/templateService.js';

const initialState = {
  templates: [],
  categories: ['All', 'Business', 'Portfolio', 'E-commerce', 'Blog', 'Landing Page'],
  selectedCategory: 'All',
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchTemplates = createAsyncThunk(
  'templates/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await templateService.getAllTemplates();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch templates');
    }
  }
);

export const fetchTemplate = createAsyncThunk(
  'templates/fetchOne',
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await templateService.getTemplate(templateId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch template');
    }
  }
);

export const createProjectFromTemplate = createAsyncThunk(
  'templates/createProject',
  async ({ templateId, projectName }, { rejectWithValue }) => {
    try {
      const response = await templateService.createProjectFromTemplate(templateId, projectName);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project from template');
    }
  }
);

const templateSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Templates
      .addCase(fetchTemplates.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.templates = action.payload;
      })
      .addCase(fetchTemplates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Single Template
      .addCase(fetchTemplate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add or update template in the list
        const existingIndex = state.templates.findIndex(t => t._id === action.payload._id);
        if (existingIndex !== -1) {
          state.templates[existingIndex] = action.payload;
        } else {
          state.templates.push(action.payload);
        }
      })
      .addCase(fetchTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Project from Template
      .addCase(createProjectFromTemplate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProjectFromTemplate.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(createProjectFromTemplate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory, clearError } = templateSlice.actions;

// Selectors
export const selectFilteredTemplates = (state) => {
  const { templates, selectedCategory } = state.templates;
  if (selectedCategory === 'All') {
    return templates;
  }
  return templates.filter(template => template.category === selectedCategory);
};

export default templateSlice.reducer;
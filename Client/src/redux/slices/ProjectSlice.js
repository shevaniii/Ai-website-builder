import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import projectService from '../../services/projectService.js';

const initialState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  filters: {
    search: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc',
  },
};

// Async thunks
export const createProject = createAsyncThunk(
  'projects/create',
  async (projectData, { rejectWithValue }) => {
    try {
      const response = await projectService.createProject(projectData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create project');
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'projects/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await projectService.getAllProjects();
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchProject = createAsyncThunk(
  'projects/fetchOne',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await projectService.getProject(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch project');
    }
  }
);

export const updateProject = createAsyncThunk(
  'projects/update',
  async ({ projectId, updates }, { rejectWithValue }) => {
    try {
      const response = await projectService.updateProject(projectId, updates);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update project');
    }
  }
);

export const deleteProject = createAsyncThunk(
  'projects/delete',
  async (projectId, { rejectWithValue }) => {
    try {
      await projectService.deleteProject(projectId);
      return projectId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete project');
    }
  }
);

export const duplicateProject = createAsyncThunk(
  'projects/duplicate',
  async (projectId, { rejectWithValue }) => {
    try {
      const response = await projectService.duplicateProject(projectId);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to duplicate project');
    }
  }
);

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
    updateCurrentProject: (state, action) => {
      if (state.currentProject) {
        state.currentProject = {
          ...state.currentProject,
          ...action.payload,
        };
      }
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Project
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects.unshift(action.payload);
        state.currentProject = action.payload;
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Projects
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Fetch Single Project
      .addCase(fetchProject.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProject = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Project
      .addCase(updateProject.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        const updatedProject = action.payload;
        const index = state.projects.findIndex(p => p._id === updatedProject._id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
        if (state.currentProject && state.currentProject._id === updatedProject._id) {
          state.currentProject = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Project
      .addCase(deleteProject.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        const projectId = action.payload;
        state.projects = state.projects.filter(p => p._id !== projectId);
        if (state.currentProject && state.currentProject._id === projectId) {
          state.currentProject = null;
        }
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Duplicate Project
      .addCase(duplicateProject.fulfilled, (state, action) => {
        state.projects.unshift(action.payload);
      });
  },
});

export const {
  setCurrentProject,
  clearCurrentProject,
  updateCurrentProject,
  setFilters,
  clearError,
} = projectSlice.actions;

export default projectSlice.reducer;
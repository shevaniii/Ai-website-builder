
// client/src/redux/slices/aiSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const generateContent = createAsyncThunk(
  'ai/generateContent',
  async ({ prompt, type, context }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/ai/generate-content`,
        { prompt, type, context },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate content');
    }
  }
);

export const generateLayout = createAsyncThunk(
  'ai/generateLayout',
  async ({ description, components }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_BASE_URL}/ai/generate-layout`,
        { description, components },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to generate layout');
    }
  }
);

const aiSlice = createSlice({
  name: 'ai',
  initialState: {
    loading: false,
    error: null,
    lastGenerated: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateContent.fulfilled, (state, action) => {
        state.loading = false;
        state.lastGenerated = action.payload;
      })
      .addCase(generateContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(generateLayout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateLayout.fulfilled, (state, action) => {
        state.loading = false;
        state.lastGenerated = action.payload;
      })
      .addCase(generateLayout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = aiSlice.actions;
export default aiSlice.reducer;

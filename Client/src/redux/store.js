import { configureStore } from '@reduxjs/toolkit';

// Import your slices here
import authSlice from './slices/authSlice';
import builderSlice from './slices/builderSlice';
import projectSlice from './slices/projectSlice';
import templateSlice from './slices/templateSlice';
import uiSlice from './slices/uiSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    builder: builderSlice,
    projects: projectSlice,
    templates: templateSlice,
    ui: uiSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
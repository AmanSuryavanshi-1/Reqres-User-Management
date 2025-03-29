import { configureStore } from '@reduxjs/toolkit';
// Use relative paths without explicit file extensions to comply with ESM imports
import usersReducer from './slices/usersSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false, // Helps with any non-serializable data in the state
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

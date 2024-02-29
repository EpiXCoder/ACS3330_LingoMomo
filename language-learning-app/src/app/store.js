import { configureStore } from '@reduxjs/toolkit';
import modulesReducer from '../features/modules/modulesSlice';

export const store = configureStore({
  reducer: {
    modules: modulesReducer,
  },
});

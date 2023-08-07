// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import bgmReducer from './bgmSlice';

const store = configureStore({
  reducer: {
    bgm: bgmReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

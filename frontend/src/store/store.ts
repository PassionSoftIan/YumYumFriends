import { configureStore } from '@reduxjs/toolkit';
import bgmReducer from './bgmSlice';
import showEffectsReducer from './showEffectsSlice';
import maxEatingReducer from "./maxEatingSlice";

const store = configureStore({
  reducer: {
    bgm: bgmReducer,
    showEffects: showEffectsReducer,
    maxEating: maxEatingReducer,
    // Add other reducers if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

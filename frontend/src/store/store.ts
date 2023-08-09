import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux'; // 추가

import bgmReducer from './bgmSlice';
import showEffectsReducer from './showEffectsSlice';
import maxEatingReducer from './maxEatingSlice';
import userReducer from './userSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  bgm: bgmReducer,
  showEffects: showEffectsReducer,
  maxEating: maxEatingReducer,
  user: userReducer,
  // Add other reducers if needed
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

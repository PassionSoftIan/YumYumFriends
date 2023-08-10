import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import bgmReducer from './bgmSlice';
import showEffectsReducer from './showEffectsSlice';
import maxEatingReducer from './maxEatingSlice';
import userReducer from './userSlice';
import detectionReducer from './detectionSlice';
import soundEffectReducer from './soundEffectSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  bgm: bgmReducer,
  soundEffect: soundEffectReducer,
  showEffects: showEffectsReducer,
  maxEating: maxEatingReducer,
  user: userReducer,
  detection: detectionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

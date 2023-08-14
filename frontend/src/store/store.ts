// store.ts

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

import bgmReducer from "./bgmSlice";
import showEffectsReducer from "./showEffectsSlice";
import maxEatingReducer from "./maxEatingSlice";
import eatingReducer from "./eatingSlice";
import userReducer from "./userSlice";
import detectionReducer from "./detectionSlice";
import soundEffectReducer from "./soundEffectSlice";
// 위에 추가할 import
import enemyEnergyReducer from "./enemyEnergySlice"; // enemyEnergyReducer의 위치와 이름을 적절하게 변경해야 할 수도 있습니다.

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  bgm: bgmReducer,
  soundEffect: soundEffectReducer,
  showEffects: showEffectsReducer,
  maxEating: maxEatingReducer,
  user: userReducer,
  detection: detectionReducer,
  eating: eatingReducer,
  // 위에 추가할 부분
  enemyEnergy: enemyEnergyReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

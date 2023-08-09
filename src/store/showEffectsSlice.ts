// src/store/showEffectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store'; // Make sure to import RootState from the correct location

interface ShowEffectsState {
  value: boolean;
}

const initialState: ShowEffectsState = {
  value: false,
};

const showEffectsSlice = createSlice({
  name: 'showEffects',
  initialState,
  reducers: {
    setShowEffects: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const { setShowEffects } = showEffectsSlice.actions;
export const selectShowEffects = (state: RootState) => state.showEffects.value;

export default showEffectsSlice.reducer;

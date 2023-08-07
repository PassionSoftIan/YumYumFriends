// src/store/showEffectsSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
export default showEffectsSlice.reducer;

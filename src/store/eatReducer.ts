// redux/eatReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EatState {
  eatStatus: number;
}

const initialState: EatState = {
  eatStatus: 0,
};

const eatSlice = createSlice({
  name: 'eat',
  initialState,
  reducers: {
    setEatStatus: (state, action: PayloadAction<number>) => {
      state.eatStatus = action.payload;
    },
  },
});

export const { setEatStatus } = eatSlice.actions;
export default eatSlice.reducer;

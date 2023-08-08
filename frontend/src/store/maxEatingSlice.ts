import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MaxEatingState {
  value: number;
}

const initialState: MaxEatingState = {
  value: 5,
};

const maxEatingSlice = createSlice({
  name: "maxEating",
  initialState,
  reducers: {
    setMaxEating: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setMaxEating } = maxEatingSlice.actions;

export default maxEatingSlice.reducer;

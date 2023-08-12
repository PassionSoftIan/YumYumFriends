import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EatingState {
  value: number;
}

const initialState: EatingState = {
  value: 0,
};

const eatingSlice = createSlice({
  name: "eating",
  initialState,
  reducers: {
    setEating: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setEating } = eatingSlice.actions;

export default eatingSlice.reducer;

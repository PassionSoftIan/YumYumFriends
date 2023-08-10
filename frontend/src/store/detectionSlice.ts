import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DetectionState {
  value: boolean;
}

const initialState: DetectionState = {
  value: false,
};

const detectionSlice = createSlice({
  name: "detection",
  initialState,
  reducers: {
    setDetection: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    },
  },
});

export const {setDetection} = detectionSlice.actions;

export default detectionSlice.reducer;
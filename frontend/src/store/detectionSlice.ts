import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

const detectionSlice = createSlice({
  name: "detection",
  initialState,
  reducers: {
    setDetection: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {setDetection} = detectionSlice.actions;

export default detectionSlice.reducer;
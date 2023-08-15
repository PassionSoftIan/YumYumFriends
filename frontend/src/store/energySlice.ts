import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  myEnergy: 0,
  requiredEnergy: 0,
};

const energySlice = createSlice({
  name: "energy",
  initialState,
  reducers: {
    setMyEnergy: (state, action) => {
      state.myEnergy = action.payload;
    },
    setRequiredEnergy: (state, action) => {
      state.requiredEnergy = action.payload;
    },
  },
});

export const { setMyEnergy, setRequiredEnergy } = energySlice.actions;

export default energySlice.reducer;
// store/enemyEnergySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enemyEnergy: 0,
  maxEnemyEnergy: 3,
};

const enemyEnergySlice = createSlice({
  name: "enemyEnergy",
  initialState,
  reducers: {
    setEnemyEnergy: (state, action) => {
      state.enemyEnergy = action.payload;
    },
    setMaxEnemyEnergy: (state, action) => {
      state.maxEnemyEnergy = action.payload;
    },
  },
});

export const { setEnemyEnergy, setMaxEnemyEnergy } = enemyEnergySlice.actions;

export default enemyEnergySlice.reducer;

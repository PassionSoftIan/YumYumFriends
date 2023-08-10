import { createSlice } from "@reduxjs/toolkit";

interface soundEffectState {
  soundEffectOn: boolean;
}

const initialState: soundEffectState = {
  soundEffectOn: true,
};

const soundEffectSlice = createSlice({
  name: "soundEffect",
  initialState,
  reducers: {
    toggleSoundEffect: (state) => {
      state.soundEffectOn = !state.soundEffectOn;
    },
  },
});

export const { toggleSoundEffect } = soundEffectSlice.actions;

export default soundEffectSlice.reducer;

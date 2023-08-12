// src/store/bgmSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface BgmState {
  bgmOn: boolean;
}

const initialState: BgmState = {
  bgmOn: true,
};

const bgmSlice = createSlice({
  name: "bgm",
  initialState,
  reducers: {
    toggleBgm: (state) => {
      state.bgmOn = !state.bgmOn;
    },
  },
});

export const { toggleBgm } = bgmSlice.actions;

export default bgmSlice.reducer;

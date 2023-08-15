import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const friendYumSlice = createSlice({
  name: "friendYum",
  initialState,
  reducers: {
    setReduxFriendYum: (state, action) => action.payload,
  },
});

export const { setReduxFriendYum } = friendYumSlice.actions;
export default friendYumSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: string | null;
  nickname: string;
  currentYum: string;
}

const initialState: UserState = {
  id: null,
  nickname: '',
  currentYum: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<{ id: string; nickname: string; currentYum: string }>) => {
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.currentYum = action.payload.currentYum;
    },
  },
});

export const { setUserInfo } = userSlice.actions;
export default userSlice.reducer;

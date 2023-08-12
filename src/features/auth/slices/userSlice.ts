import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  isInitialCompleted: boolean;
  username?: string;
  email?: string;
  name?: string;
}

const initialState: User = {
  isInitialCompleted: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCompletedState: (state, action: PayloadAction<User>) => {
      state.isInitialCompleted = action.payload.isInitialCompleted;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.username = action.payload.username;
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { setCompletedState, setUser } = userSlice.actions;

export default userSlice.reducer;

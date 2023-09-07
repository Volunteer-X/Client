import { Role } from '@app/lib/constants/enums';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface User {
  isInitialCompleted: boolean;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  picture?: string;
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
      // state.username = action.payload.username;
      // state.firstName = action.payload.firstName;
      // state.lastName = action.payload.lastName;
      // state.email = action.payload.email;

      state = action.payload;
    },
  },
});

export const { setCompletedState, setUser } = userSlice.actions;

export default userSlice.reducer;

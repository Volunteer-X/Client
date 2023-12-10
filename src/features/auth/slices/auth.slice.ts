import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

export interface User {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string | null;
  picks?: string[];
  picture?: string | null;
}

type Auth = {
  user: User | null;
  isAuthenticated: boolean;
};

const initialState: Auth = {
  user: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<Auth>) => {
      // state.username = action.payload.username;
      // state.firstName = action.payload.firstName;
      // state.lastName = action.payload.lastName;
      // state.email = action.payload.email;
      // state.picture = action.payload.picture;
      // state.role = action.payload.role;
      // state.id = action.payload.id;

      state.user = cloneDeep(action.payload.user);
      state.isAuthenticated = action.payload.isAuthenticated;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;

import { Role } from '@app/__generated__/gql/graphql';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';

export interface User {
  id: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  role?: Role;
  picture?: string | null;
}

const initialState: User = {
  id: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      // state.username = action.payload.username;
      // state.firstName = action.payload.firstName;
      // state.lastName = action.payload.lastName;
      // state.email = action.payload.email;
      // state.picture = action.payload.picture;
      // state.role = action.payload.role;
      // state.id = action.payload.id;

      state = cloneDeep(action.payload);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

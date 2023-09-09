import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type RegistrationStateType = {
  isRegistered: boolean;
};

const initialState = {
  isRegistered: false,
};

export const registrationCheckSlice = createSlice({
  name: 'registrationState',
  initialState,
  reducers: {
    setRegistrationState: (
      state,
      action: PayloadAction<RegistrationStateType>,
    ) => {
      state.isRegistered = action.payload.isRegistered;
    },
  },
});

export const { setRegistrationState } = registrationCheckSlice.actions;

export default registrationCheckSlice.reducer;

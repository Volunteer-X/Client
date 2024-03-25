import { MD3Colors, MD3DarkTheme } from 'react-native-paper';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DIMENSIONS } from '@app/lib';
import RNToast from 'react-native-root-toast';

type Toast = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
};

const initialState: Toast = {
  message: '',
  type: 'error',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action: PayloadAction<Toast>) => {
      state.message = action.payload.message;
      state.type = action.payload.type;

      RNToast.show(state.message, {
        containerStyle: {
          borderRadius: 10,
          padding: 10,
          margin: 10,
        },
        textStyle: {
          textAlign: 'center',
          fontWeight: '600',
        },
        duration: RNToast.durations.LONG,
        position: RNToast.positions.BOTTOM,
        shadow: false,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: MD3DarkTheme.colors.errorContainer,
        textColor: MD3DarkTheme.colors.onErrorContainer,
      });
    },
    hideToast: state => {
      state.message = initialState.message;
      state.type = initialState.type;
    },
  },
});

export const { showToast, hideToast } = toastSlice.actions;

export default toastSlice.reducer;

import { MD3Colors, MD3DarkTheme } from 'react-native-paper';

import { DIMENSIONS } from '@app/lib';
import Toast from 'react-native-root-toast';
import { createSlice } from '@reduxjs/toolkit';

type ToastType = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
};

const initialState: ToastType = {
  message: '',
  type: 'error',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    showToast: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;

      Toast.show(state.message, {
        containerStyle: {
          borderRadius: 10,
          padding: 10,
          margin: 10,
        },
        textStyle: {
          textAlign: 'center',
          fontWeight: '600',
        },
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
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

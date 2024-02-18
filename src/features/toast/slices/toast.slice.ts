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
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        backgroundColor: state.type === 'error' ? 'red' : 'green',
        textColor: 'white',
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

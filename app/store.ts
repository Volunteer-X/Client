import { configureStore } from '@reduxjs/toolkit';
import characterSlice from '../src/features/character/characterSlice';

export const store = configureStore({
  reducer: {
    character: characterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

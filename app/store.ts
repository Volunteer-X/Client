import { configureStore } from '@reduxjs/toolkit';
import { characterSlice } from '../src/features/character';
import { currentLocationSlice } from '../src/features/maps';
import { permissionSlice } from '../src/features/permissions';

export const store = configureStore({
  reducer: {
    character: characterSlice,
    currentLocation: currentLocationSlice,
    permissions: permissionSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

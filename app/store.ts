import { configureStore } from '@reduxjs/toolkit';

import { currentLocationSlice } from '../src/features/maps';
import { permissionSlice } from '../src/features/permissions';
import { picksSlice } from '../src/features/picks';
import { userSlice, registrationCheckSlice } from '../src/features/auth';

export const store = configureStore({
  reducer: {
    picks: picksSlice,
    currentLocation: currentLocationSlice,
    permissions: permissionSlice,
    user: userSlice,
    registrationState: registrationCheckSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

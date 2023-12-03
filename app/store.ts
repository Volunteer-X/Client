import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { currentLocationSlice } from '../src/features/maps';
import { permissionSlice } from '../src/features/permissions';
import { picksSlice } from '../src/features/picks';
import { registrationCheckSlice, userSlice } from '../src/features/auth';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice,
    picks: picksSlice,
    registrationState: registrationCheckSlice,
  }),
);

export const store = configureStore({
  reducer: {
    currentLocation: currentLocationSlice,
    permissions: permissionSlice,
    root: persistedReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

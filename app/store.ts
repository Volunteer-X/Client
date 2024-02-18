import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice } from '@features/auth';
import { currentLocationSlice } from '@features/maps';
import { reduxStorage } from './storage';
import { toastSlice } from '@app/features/toast';

const persistConfig = {
  key: 'root',
  storage: reduxStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth: authSlice,
  }),
);

export const store = configureStore({
  reducer: {
    currentLocation: currentLocationSlice,
    root: persistedReducer,
    toast: toastSlice,
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

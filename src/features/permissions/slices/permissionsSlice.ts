import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FINE_LOCATION_PERMISSION_NOT_SET } from '../../../lib/constants/values';
import { Permission, PermissionStatus } from 'react-native-permissions';
import { Platform } from 'react-native';

export interface PermissionState {
  fineLocationPermission?: string;
  permissions?: Partial<Record<Permission, PermissionStatus>>;
}

const initialState: PermissionState = {
  fineLocationPermission: FINE_LOCATION_PERMISSION_NOT_SET,
  permissions:
    Platform.OS === 'ios'
      ? { 'ios.permission.CAMERA': 'blocked' }
      : { 'android.permission.CAMERA': 'blocked' },
};

export const permissionSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setLocationPermissions: (
      state,
      action: PayloadAction<PermissionState | null>,
    ) => {
      state.fineLocationPermission = action.payload?.fineLocationPermission;
    },
    setPermissions: (state, action: PayloadAction<PermissionState>) => {
      state.permissions = action.payload.permissions;
    },
  },
});

export const { setLocationPermissions, setPermissions } =
  permissionSlice.actions;

export default permissionSlice.reducer;

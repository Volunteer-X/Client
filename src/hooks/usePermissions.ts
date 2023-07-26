import { Platform } from 'react-native';
import {
  PERMISSIONS,
  Permission,
  request,
  requestMultiple,
} from 'react-native-permissions';

import { useAppDispatch, useAppSelector } from '.';
import { FINE_LOCATION_PERMISSION_NOT_SET } from '../lib/constants/values';
import PLATFORM_PERMISSIONS from '../lib/constants/permissions';
import {
  setLocationPermissions,
  setPermissions,
} from '../features/permissions/slices/permissionsSlice';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATORS } from '../lib/constants';

export default function usePermissions() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const fineLocationPermission = useAppSelector(
    ({ permissions }) => permissions.fineLocationPermission,
  );

  const requestLocationPermission = async () => {
    let permission;
    Platform.OS === 'ios'
      ? (permission =
          parseInt(Platform.Version, 10) < 13
            ? PERMISSIONS.IOS.LOCATION_ALWAYS
            : PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      : (permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    await request(permission).then(status => {
      dispatch(
        setLocationPermissions({
          fineLocationPermission: status,
        }),
      );
    });
  };

  const requestPermissions = async (permissions: Array<Permission>) => {
    await requestMultiple(permissions).then(statuses => {
      dispatch(
        setPermissions({
          permissions: statuses,
        }),
      );
    });
  };

  const checkPermissions;

  const checkLocationPermission = async ({
    displayPermissionRequestModals = false,
    callback,
  }) => {
    if (fineLocationPermission === FINE_LOCATION_PERMISSION_NOT_SET) {
      return (
        displayPermissionRequestModals && navigation.navigate(NAVIGATORS.MODAL, {
          screen: 
        })
      );
    }
  };
}

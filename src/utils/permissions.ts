import { Platform } from 'react-native';
import {
  check,
  request,
  checkMultiple,
  requestMultiple,
  Permission,
  Rationale,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';

// const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

const requestMultiplePermissions = async () => {
  await requestMultiple();
};

import { Platform } from 'react-native';
import RNPermissions, {
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { SIRI, ...IOS } = PERMISSIONS.IOS;
const { ...ANDROID } = PERMISSIONS.ANDROID;

const PLATFORM_PERMISSIONS = Platform.select<
  typeof PERMISSIONS.ANDROID | typeof IOS | {}
>({
  android: ANDROID,
  ios: IOS,
  default: {},
});

const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

export type PermissionStatuses = Partial<Record<Permission, PermissionStatus>>;

export const PERMISSIONS_STATUSES: PermissionStatuses =
  Platform.OS === 'android'
    ? {
        'android.permission.ACCESS_FINE_LOCATION': 'blocked',
        'android.permission.CAMERA': 'blocked',
        'android.permission.READ_EXTERNAL_STORAGE': 'blocked',
        'android.permission.WRITE_EXTERNAL_STORAGE': 'blocked',
        'android.permission.POST_NOTIFICATIONS': 'blocked',
      }
    : {
        'ios.permission.LOCATION_WHEN_IN_USE': 'blocked',
        'ios.permission.CAMERA': 'blocked',
        'ios.permission.MEDIA_LIBRARY': 'blocked',
      };

export const PERMISSION_LIST: Permission[] =
  Platform.OS === 'android'
    ? [
        ANDROID.ACCESS_FINE_LOCATION,
        ANDROID.CAMERA,
        ANDROID.READ_EXTERNAL_STORAGE,
        ANDROID.WRITE_EXTERNAL_STORAGE,
        ANDROID.POST_NOTIFICATIONS,
      ]
    : [IOS.LOCATION_WHEN_IN_USE, IOS.CAMERA, IOS.MEDIA_LIBRARY];

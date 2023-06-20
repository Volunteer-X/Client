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
} from 'react-native-permissions';

const { SIRI, ...PERMISSIONS_IOS } = PERMISSIONS.IOS; // remove siri (certificate required)

export const PLATFORM_PERMISSIONS = Platform.select<
  typeof PERMISSIONS.ANDROID | typeof PERMISSIONS_IOS | {}
>({
  android: PERMISSIONS.ANDROID,
  ios: PERMISSIONS_IOS,
  default: {},
});

// const PERMISSIONS_VALUES: Permission[] = Object.values(PLATFORM_PERMISSIONS);

const getRequestPermission = ({
  permission,
  rationale,
}: {
  permission: Permission;
  rationale?: Rationale;
}) => {
  console.log(`permission:: ${permission}`);
  request(permission)
    .then(res => {
      console.log(`res:: ${res}`);
    })
    .catch(err => {
      console.log(err);
    });
};

export const requestPermission = async ({
  permission,
  rationale,
}: {
  permission: any;
  rationale?: Rationale;
}) => {
  check(permission)
    .then(res => {
      switch (res) {
        case RESULTS.UNAVAILABLE:
          console.log(
            'This feature is not available (on this device / in this context)',
          );
          break;
        case RESULTS.DENIED:
          console.log(
            'The permission has not been requested / is denied but requestable',
          );
          console.log(permission);

          getRequestPermission({ permission: permission, rationale });
          break;
        case RESULTS.LIMITED:
          console.log('The permission is limited: some actions are possible');
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          break;
      }
    })
    .catch(err => {
      console.log(err);
    });

  return true;
};

export const requestPermissions = async ({
  permissions,
}: {
  permissions: Permission[];
}) => {
  checkMultiple(permissions);
};

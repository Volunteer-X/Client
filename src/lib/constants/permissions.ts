import { Platform } from 'react-native';
import { PERMISSIONS, Permission } from 'react-native-permissions';

const { SIRI, ...PERMISSIONS_IOS } = PERMISSIONS.IOS; // remove siri (certificate required)

const PLATFORM_PERMISSIONS = Platform.select<
  typeof PERMISSIONS.ANDROID | typeof PERMISSIONS_IOS
>({
  android: PERMISSIONS.ANDROID,
  ios: PERMISSIONS_IOS,
});

export default PLATFORM_PERMISSIONS;

import { Platform } from 'react-native';

export const Defaults = {
  MIN_NUM_PICKS: 5,
  MIN_NUM_PICKS_PER_PING: 1,
  MAX_NUM_PICKS_PER_PING: 5,
  MIN_LEN_USERNAME: 6,
  MAX_LEN_USERNAME: 20,
};

export const FINE_LOCATION_PERMISSION_NOT_SET =
  'Fine location permission not set';
export const COARSE_LOCATION_PERMISSION_NOT_SET =
  'Coarse location permission not set';

let clientName: string;
if (Platform.OS === 'android') {
  clientName = 'VolunteerX App [Android]';
} else if (Platform.OS === 'ios') {
  clientName = 'VolunteerX App [IOS]';
}

export { clientName };

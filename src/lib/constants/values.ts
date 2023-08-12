import { Platform } from 'react-native';

export const defaults = {
  MIN_NUM_OF_PICKS: 8,
  MIN_LENGHT_OF_USERNAME: 6,
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

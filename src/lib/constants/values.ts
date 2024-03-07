import { Platform } from 'react-native';

export const Defaults = {
  MIN_NUM_PICKS: 5,
  MIN_NUM_PICKS_PER_PING: 1,
  MAX_NUM_PICKS_PER_PING: 5,
  MIN_LEN_USERNAME: 6,
  MAX_LEN_USERNAME: 20,
};

let clientName: string;
if (Platform.OS === 'android') {
  clientName = 'VolunteerX App [Android]';
} else if (Platform.OS === 'ios') {
  clientName = 'VolunteerX App [IOS]';
}

export { clientName };

export const APP_NAME = 'VolunteerX' as string;

export const loremIpsum =
  'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or.';

import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

export async function handleOnMessage(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log('handleOnMessage', message);
}

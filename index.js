/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { firebase } from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import {
  handleBackgroundMessage,
  handleOnMessage,
} from '@app/notification/NotificationHandler';
import notifee from '@notifee/react-native';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  console.log('Background Event', { type, detail });
});

// Register foreground handler
firebase.messaging().onMessage(handleOnMessage);

// Register background handler
firebase.messaging().setBackgroundMessageHandler(handleBackgroundMessage);

AppRegistry.registerComponent(appName, () => App);

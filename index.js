/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { firebase } from '@react-native-firebase/messaging';
import { name as appName } from './app.json';
import { handleOnMessage } from '@app/notification/NotificationHandler';

// Register foreground handler
firebase.messaging().onMessage(handleOnMessage);

// Register background handler
firebase.messaging().setBackgroundMessageHandler(handleOnMessage);

AppRegistry.registerComponent(appName, () => App);

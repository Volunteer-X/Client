import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { storage } from '../../app/storage';

type MessageData =
  | {
      type: 'ping';
      id: string;
    }
  | {
      type: 'forum';
      id: string;
    };

async function fetchPing(id: string) {
  const token = JSON.parse(
    JSON.parse(storage.getString('persist:root') as string).auth,
  ).accessToken;

  const ping = await fetch('http://localhost:3500/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `{getPing(id:"${id}"){id title createdAt description picks latitude longitude}}`,
    }),
  })
    .then(res => res.json())
    .then(data => {
      return data.data.getPing;
    })
    .catch(err => console.log('err', err));

  return ping;
}

export async function handleOnMessage(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  await notifee.createChannel({
    id: 'ping',
    name: 'Ping',
    importance: AndroidImportance.HIGH,
    vibration: true,
  });

  if (message && message.data && message.data.type) {
    const type = message.data.type as MessageData['type'];
    switch (type) {
      case 'ping':
        const ping = await fetchPing(message.data.id as string);

        await notifee.displayNotification({
          title: ping.title,
          body: ping.description,
          android: {
            // smallIcon: 'ic_small_icon',
            color: '#9c27b0',
            channelId: 'ping',
            actions: [
              {
                title: 'View',
                pressAction: {
                  id: 'view',
                  launchActivity: 'default',
                },
              },
              {
                title: 'Join',
                pressAction: {
                  id: 'join',
                },
              },
            ],
          },
        });
        break;
    }
  }
}

export async function handleBackgroundMessage(
  message: FirebaseMessagingTypes.RemoteMessage,
) {
  console.log('handleBackgroundMessage', JSON.parse(message.data.notifee));
}

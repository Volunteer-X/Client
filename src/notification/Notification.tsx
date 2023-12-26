import { useAppSelector } from '@app/hooks';
import * as React from 'react';
import { ReactNode, useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { useUpdateUser } from '@app/hooks/useUpdateUser';

export const Notification = ({ children }: { children: ReactNode }) => {
  const user = useAppSelector(state => state.root.auth.user);

  const { execute, loading, error } = useUpdateUser();

  useEffect(() => {
    async function onAppBootstrap() {
      if (user?.id === undefined) {
        return;
      }

      if (messaging().isDeviceRegisteredForRemoteMessages) {
        return;
      }

      await messaging().registerDeviceForRemoteMessages();

      const token = await messaging().getToken();

      execute({ id: user?.id, devices: [token] });
    }

    onAppBootstrap();
  }, [execute, user]);

  return <>{children}</>;
};

import { Avatar } from '@app/components';
import { useAppSelector } from '@app/hooks';
import useAppTheme from '@app/hooks/useAppTheme';
import { SIZES } from '@app/lib';
import { AppIcons } from '@app/theme/icon';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, { useCallback } from 'react';
import { DevSettings, Pressable, View } from 'react-native';
import { useAuth0 } from 'react-native-auth0';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import { makeStyles } from './main-drawer.style';

export const MainDrawerContent = (props: DrawerContentComponentProps) => {
  const { clearSession } = useAuth0();

  const { theme } = useAppTheme();

  const { user } = useAppSelector(state => state.root.auth);

  const styles = makeStyles(theme);
  const onLogout = useCallback(async () => {
    try {
      await clearSession();
      // Dev setup
      DevSettings.reload();
    } catch (error) {
      console.log('log out cancelled');
    }
  }, [clearSession]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{}}>
        <View style={styles.container}>
          <Avatar
            uri={user?.picture}
            name={user?.firstName}
            onPress={() => {}}
            size={SIZES.xxLarge * 1.5}
          />
          {/*
           * Pick Viewer
           */}
          {/* <IconButton
              icon="circle"
              style={styles.picksButton}
              onPress={() => {}}
            /> */}
          <View style={styles.nameContainer}>
            <Text variant="bodyLarge">{`${user?.firstName} ${user?.lastName}`}</Text>
            <Text style={styles.username} variant="bodySmall">
              {`@${user?.username}`}
            </Text>
          </View>
          <View style={styles.statContainer}>
            <Pressable
              android_disableSound
              onPress={() => {
                console.log('Activities');
              }}>
              <Text variant="bodyMedium">{`${2} Activities`}</Text>
            </Pressable>
            <Pressable
              android_disableSound
              onPress={() => {
                console.log('Followers');
              }}>
              <Text variant="bodyMedium">{`${20} Followers`}</Text>
            </Pressable>
          </View>
        </View>

        <Divider />

        <View style={{ flex: 1 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <Divider />

      <View style={[styles.container, styles.footer]}>
        {/*
         * Theme Control
         */}
        <IconButton icon={AppIcons.NIGHT} onPress={() => {}} />
        <Button mode="text" onPress={() => {}} compact>
          About
        </Button>
        <Button mode="text" onPress={onLogout} compact>
          Help
        </Button>
        <Button mode="text" onPress={onLogout} compact>
          Share
        </Button>
      </View>
    </View>
  );
};

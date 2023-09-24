import React, { useCallback } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  MD3Colors,
  Text,
} from 'react-native-paper';
import { useAuth0 } from 'react-native-auth0';
import { DevSettings, Pressable, StyleSheet, View } from 'react-native';

import BottomTabNavigation from '../bottom-tab';

import { PageNames, SIZES } from '@app/lib/index';
import { BackButton } from '@components/index';
import { ProfileScreen, SettingScreen } from '@features/index';
import UserAvatar from '@app/components/user-avatar';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';

function HomeDrawerContent(props: DrawerContentComponentProps) {
  const { clearSession } = useAuth0();

  const { theme } = useAppTheme();

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
          <UserAvatar
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
            }}
            onPress={() => {}}
            size={SIZES.xxLarge * 1.5}
          />
          {/*
           * Pick Viewer
           */}
          <IconButton
            icon="circle"
            style={styles.picksButton}
            onPress={() => {}}
          />
          <View style={styles.nameContainer}>
            <Text variant="bodyLarge">Amil Muhammed Hamza</Text>
            <Text style={styles.username} variant="bodySmall">
              @docren155
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
        <IconButton icon="weather-night" onPress={() => {}} />
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
}

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },

    statContainer: {
      flexDirection: 'row',
      columnGap: 15,
      marginVertical: 10,
    },
    nameContainer: {
      marginTop: 10,
    },
    username: {
      color: MD3Colors.neutral50,
    },
    picksButton: {
      position: 'absolute',
      top: 10,
      right: 0,
    },
  });

const HomeDrawer = (): React.JSX.Element => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      detachInactiveScreens
      initialRouteName={PageNames.MainPage}
      screenOptions={{ headerShown: false }}
      drawerContent={props => HomeDrawerContent(props)}>
      <Drawer.Screen
        name={PageNames.MainPage}
        component={BottomTabNavigation}
        options={{ drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen
        name={PageNames.Profile}
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerLeft(props) {
            return BackButton(props);
          },
        }}
      />
      <Drawer.Screen name={PageNames.Settings} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

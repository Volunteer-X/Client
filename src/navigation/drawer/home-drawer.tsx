import React, { useCallback } from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Avatar, Button, Divider, Text } from 'react-native-paper';

import BottomTabNavigation from '../bottom-tab';

import { PageNames } from '../../lib';
import { BackButton } from '../../components';
import { ProfileScreen, SettingScreen } from '../../features';
import { useAuth0 } from 'react-native-auth0';
import { DevSettings, View } from 'react-native';

function HomeDrawerContent(props: DrawerContentComponentProps) {
  const { clearSession } = useAuth0();

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
    <DrawerContentScrollView {...props}>
      <View>
        <Avatar.Text label="Vx" size={48} />
        <Text>Full Name</Text>
        <Text>@username</Text>
        <View>
          <Text>20 Followers</Text>
          <Text>2 Activities</Text>
        </View>
      </View>
      <Divider />
      <DrawerItemList {...props} />
      <Divider />
      <Button mode="contained" onPress={onLogout}>
        Logout
      </Button>
    </DrawerContentScrollView>
  );
}

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

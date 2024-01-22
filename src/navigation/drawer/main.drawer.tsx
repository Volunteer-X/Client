import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { MapScreen, ProfileScreen, SettingScreen } from '@features/index';
import { MainDrawerParamList } from '@ts-types/type';
import {
  BackButton,
  headerAvatar,
  headerForum,
  headerTitle,
} from '@app/components';
import { MainDrawerContent } from './main-content';
import { useAppSelector } from '@app/hooks';

const MainDrawer = (): React.JSX.Element => {
  const Drawer = createDrawerNavigator<MainDrawerParamList>();
  const user = useAppSelector(state => state.root.auth.user);

  const actionButton = () => {
    return <BackButton />;
  };

  return (
    <Drawer.Navigator
      initialRouteName="Nearby"
      screenOptions={{ headerShown: false, swipeEnabled: false }}
      drawerContent={props => MainDrawerContent(props)}>
      {/* <Drawer.Screen
        name="BottomTab"
        component={BottomTabNavigation}
        options={{ drawerItemStyle: { display: 'none' } }}
      /> */}
      <Drawer.Screen
        name="Nearby"
        component={MapScreen}
        options={({ navigation }) => ({
          drawerItemStyle: { display: 'none' },
          headerShown: true,
          headerTitle: headerTitle,
          headerTitleAlign: 'center',
          headerLeft: () =>
            headerAvatar(navigation, {
              firstName: user?.firstName,
              picture: user?.picture,
            }),
          headerRight: () => headerForum(navigation),
        })}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerLeft: actionButton,
        }}
      />
      <Drawer.Screen
        name="AppSettings"
        options={{ title: 'Settings', headerLeft: actionButton }}
        component={SettingScreen}
      />
    </Drawer.Navigator>
  );
};

export default MainDrawer;

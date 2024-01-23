import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  ActivityListScreen,
  MapScreen,
  ProfileScreen,
  SettingScreen,
} from '@features/index';
import { MainDrawerParamList } from '@ts-types/type';
import {
  BackButton,
  headerAvatar,
  headerBackground,
  headerForum,
  headerTitle,
} from '@app/components';
import { MainDrawerContent } from './main-content';
import { useAppSelector } from '@app/hooks';
import { SIZES } from '@app/lib';

const MainDrawer = (): React.JSX.Element => {
  const Drawer = createDrawerNavigator<MainDrawerParamList>();
  const user = useAppSelector(state => state.root.auth.user);

  const actionButton = () => {
    return <BackButton />;
  };

  return (
    <Drawer.Navigator
      initialRouteName="Nearby"
      screenOptions={{
        headerShown: false,
        swipeEnabled: false,
      }}
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
          headerLeftContainerStyle: {
            paddingLeft: SIZES.medium,
          },
          headerRight: () => headerForum(navigation),
          headerRightContainerStyle: {
            paddingRight: SIZES.small,
          },
          headerTransparent: true,
          headerBackground: headerBackground,
          headerShadowVisible: true,
          headerStyle: {
            elevation: 2,
          },
        })}
      />
      <Drawer.Screen
        name="Profile"
        initialParams={{ userID: user?.id }}
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerLeft: actionButton,
        }}
      />
      <Drawer.Screen
        name="Activity"
        component={ActivityListScreen}
        options={{
          headerShown: false,
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

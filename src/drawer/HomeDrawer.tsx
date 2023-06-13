import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import { Avatar, Divider } from 'react-native-paper';

import BottomTabNavigation from '../navigation/BottomTab';
import { ProfileScreen, SettingScreen } from '../screens';
import { PageNames } from '../constants';
import { StyledText, StyledView } from '../style/styledComponents';
import { HeaderBackBtnComponent } from '../components';

function HomeDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <StyledView className="px-5 py-5">
        <Avatar.Text label="Vx" size={48} />
        <StyledText>Full Name</StyledText>
        <StyledText>@username</StyledText>
        <StyledView className="flex flex-row gap-5">
          <StyledText className="text-cyan-900 font-bold">
            20 Followers
          </StyledText>
          <StyledText>2 Activities</StyledText>
        </StyledView>
      </StyledView>
      <Divider />
      <DrawerItemList {...props} />
      <Divider />
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
            return HeaderBackBtnComponent(props);
          },
        }}
      />
      <Drawer.Screen name={PageNames.Settings} component={SettingScreen} />
    </Drawer.Navigator>
  );
};

export default HomeDrawer;

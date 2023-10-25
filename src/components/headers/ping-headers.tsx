/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import useAppTheme from '@hooks/useAppTheme';
import { RouteProp } from '@react-navigation/native';
import { PingStackParamList } from '@app/types/type';

/*
* Ping Header
! Alert on going back, and animation
*/
export const PingHeaderLeft = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  navigation: any;
}) => {
  return (
    <IconButton
      icon="close"
      size={25}
      {...props}
      onPress={() => {
        props.navigation.goBack();
      }}
    />
  );
};

/*
   * Ping Header Right
   ! handle ping server actions
   */
export const PingHeaderRight = (props: {
  tintColor?: string | undefined;
  pressColor?: string | undefined;
  pressOpacity?: number | undefined;
  labelVisible?: boolean | undefined;
  navigation: any;
  route: RouteProp<PingStackParamList>;
}) => {
  const { theme } = useAppTheme();

  function handleOnClick() {
    switch (props.route.name) {
      case 'SelectPicks':
        console.log('selectedPicks');

        break;
      case 'Body':
        break;
      case 'FinalPage':
        break;
      default:
        break;
    }
  }

  return (
    <Button
      icon="chevron-right"
      {...props}
      mode="text"
      uppercase
      labelStyle={{
        fontSize: theme.fonts.bodyMedium.fontSize,
        letterSpacing: 1.1,
      }}
      contentStyle={{
        flexDirection: 'row-reverse',
      }}
      style={{ justifyContent: 'center', marginEnd: 10 }}
      onPress={handleOnClick}>
      Ping
    </Button>
  );
};

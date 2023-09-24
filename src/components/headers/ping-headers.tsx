import React from 'react';
import { Button, IconButton } from 'react-native-paper';
import useAppTheme from '@hooks/useAppTheme';

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
}) => {
  const { theme } = useAppTheme();

  return (
    <Button
      icon="chevron-right"
      {...props}
      mode="contained"
      uppercase
      labelStyle={{
        fontSize: theme.fonts.bodyMedium.fontSize,
        letterSpacing: 1.1,
      }}
      contentStyle={{
        flexDirection: 'row-reverse',
      }}
      style={{ justifyContent: 'center', marginEnd: 10 }}>
      Ping
    </Button>
  );
};

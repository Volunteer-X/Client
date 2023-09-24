import useAppTheme from '@app/hooks/useAppTheme';
import { HEIGHTS, SIZES } from '@app/lib';
import { APP_NAME } from '@app/lib/constants/values';
import { AppTheme } from '@app/theme';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import { Avatar, IconButton, MD3Colors, Text } from 'react-native-paper';
import UserAvatar from '../user-avatar';

const { height } = Dimensions.get('window');

// ! Typing Error
export const HomeHeader = (props: BottomTabHeaderProps) => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <UserAvatar
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        }}
        onPress={() => props.navigation.toggleDrawer()}
      />
      <Text variant="bodyLarge" style={styles.appName}>
        {APP_NAME}
      </Text>
      <IconButton icon="forum" onPress={() => {}} size={SIZES.xLarge} />
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      height: HEIGHTS.header,
      backgroundColor: theme.colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      paddingLeft: SIZES.xSmall,
      gap: 10,
      justifyContent: 'space-between',
    },
    appName: {},
  });

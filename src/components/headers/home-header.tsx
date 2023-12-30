import useAppTheme from '@app/hooks/useAppTheme';
import { HEIGHTS, SIZES } from '@app/lib';
import { APP_NAME } from '@app/lib/constants/values';
import { AppTheme } from '@app/theme';
import { AppIcons } from '@app/theme/icon';
import { BottomTabStackScreenProps } from '@ts-types/type';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { useAppSelector } from '@app/hooks';
import { Avatar } from '../avatar/Avatar';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

// ! Typing Error
export const HomeHeader = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const navigation =
    useNavigation<BottomTabStackScreenProps<'Home'>['navigation']>();

  const user = useAppSelector(state => state.root.auth.user);

  const styles = makeStyles(theme, inset);

  return (
    <View style={styles.container}>
      <Avatar
        size={SIZES.xxLarge}
        uri={user?.picture}
        name={user?.firstName}
        onPress={() => navigation.toggleDrawer()}
      />
      <Text variant="bodyLarge" style={styles.appName}>
        {APP_NAME}
      </Text>
      <IconButton
        icon={AppIcons.FORUM}
        onPress={() => {
          navigation.push('ForumNavigation', { screen: 'Forums' });
        }}
        size={SIZES.xLarge}
      />
    </View>
  );
};

const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      marginTop: inset.top,
      marginLeft: inset.left,
      marginRight: inset.right,
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

import useAppTheme from '@app/hooks/useAppTheme';
import { HEIGHTS, SIZES } from '@app/lib';
import { APP_NAME } from '@app/lib/constants/values';
import { AppTheme } from '@app/theme';
import { AppIcons } from '@app/theme/icon';
import { BottomTabStackScreenProps } from '@ts-types/type';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import UserAvatar from '../user-avatar';

const { height } = Dimensions.get('window');

// ! Typing Error
export const HomeHeader = () => {
  const { theme } = useAppTheme();

  const navigation =
    useNavigation<BottomTabStackScreenProps<'Home'>['navigation']>();

  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <UserAvatar
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png',
        }}
        onPress={() => navigation.toggleDrawer()}
      />
      <Text variant="bodyLarge" style={styles.appName}>
        {APP_NAME}
      </Text>
      <IconButton
        icon={AppIcons.FORUM}
        onPress={() => {
          navigation.push('ForumNavigation');
        }}
        size={SIZES.xLarge}
      />
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

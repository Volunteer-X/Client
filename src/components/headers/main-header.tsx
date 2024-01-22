import { SIZES } from '@app/lib';
import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { Avatar } from '../avatar/Avatar';
import logoTypo from '@assets/images/logo-typo.png';

export const headerTitle = () => {
  return <Image source={logoTypo} style={styles.appName} />;
};

export const headerAvatar = (
  navigation: any,
  extras: { firstName?: string; picture?: string | null },
) => {
  const { firstName, picture } = extras;

  return (
    <Avatar
      size={SIZES.xxLarge}
      uri={picture}
      name={firstName}
      onPress={() => navigation.openDrawer()}
    />
  );
};

export const headerForum = (navigation: any) => {
  return (
    <IconButton
      icon={AppIcons.FORUM}
      onPress={() => {
        navigation.navigate('ForumNavigation', { sreen: 'ForumScreen' });
      }}
      size={SIZES.xLarge}
    />
  );
};

const styles = StyleSheet.create({
  appName: {
    width: 250,
    height: 25,
    resizeMode: 'contain',
  },
});

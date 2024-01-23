import { APP_NAME, SIZES } from '@app/lib';
import { AppIcons } from '@app/theme/icon';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { Avatar } from '../avatar/Avatar';
import logoTypo from '@assets/images/logo-typo.png';
import LinearGradient from 'react-native-linear-gradient';

const headerBackground = () => {
  return (
    <LinearGradient
      // colors={['#E3E3E340', '#CAD0FFFF', '#E3E3E340']}
      colors={['#FCDBCA', '#E6A5CC', '#D5B3E8']}
      useAngle={true}
      angle={180}
      angleCenter={{ x: 0.5, y: 0.5 }}
      style={styles.headerBackground}
      // start={{ x: 1, y: 0 }}
      // end={{ x: 0, y: 1 }}
    />
  );
};

const headerTitle = () => {
  return <Image source={logoTypo} style={styles.appName} />;
  // return (
  //   <Text variant="titleLarge" style={styles.appName}>
  //     {APP_NAME}
  //   </Text>
  // );
};

const headerAvatar = (
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

const headerForum = (navigation: any) => {
  return (
    <IconButton
      iconColor="#454545"
      icon={AppIcons.FORUM}
      onPress={() => {
        navigation.navigate('ForumNavigation', { sreen: 'ForumScreen' });
      }}
      size={SIZES.xLarge}
    />
  );
};

export { headerBackground, headerTitle, headerAvatar, headerForum };

const styles = StyleSheet.create({
  appName: {
    // fontWeight: '900',
    // color: 'black',
    // fontStyle: 'italic',
    width: 250,
    height: 25,
    resizeMode: 'contain',
  },
  headerBackground: {
    flex: 1,
  },
});

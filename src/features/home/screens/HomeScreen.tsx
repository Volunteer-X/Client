/* eslint-disable react-native/no-inline-styles */
import { MediaFlatlist } from '@app/components/swiper-flatlist';
import { useAppSelector } from '@app/hooks';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { HomeStackScreenProps } from '@app/types/type';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const styles = makeStyles(theme, inset);

  const { user, accessToken } = useAppSelector(state => state.root.auth);

  const route = useRoute<HomeStackScreenProps<'HomeScreen'>['route']>();

  // console.log('HomeScreen route', route);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />
      {/* Flatlist Header Component */}
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1, padding: 10 }}></ScrollView>
      {/* <PullToRefreshList /> */}
    </View>
  );
};

export default HomeScreen;

const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      paddingLeft: inset.left,
      paddingRight: inset.right,
      backgroundColor: theme.colors.backdrop,
    },
  });

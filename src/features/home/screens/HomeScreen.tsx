/* eslint-disable react-native/no-inline-styles */
import { useAppSelector } from '@app/hooks';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { HomeStackScreenProps } from '@app/types/type';
import { useRoute } from '@react-navigation/native';
import React from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';
import { Button } from 'react-native-paper';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import notifee from '@notifee/react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const styles = makeStyles(theme, inset);

  const { user, accessToken } = useAppSelector(state => state.root.auth);

  console.log('HomeScreen accessToken', accessToken);

  const route = useRoute<HomeStackScreenProps<'HomeScreen'>['route']>();

  // console.log('HomeScreen route', route);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
      />

      <Button
        onPress={async () => {
          await notifee.displayNotification({
            title: 'Title',
            body: 'Body',
            // android: {
            //   channelId: await notifee.createChannel({
            //     id: 'default',
            //     name: 'Default Channel',
            //   }),
            // },
          });
        }}>
        Click me
      </Button>

      {/* Flatlist Header Component */}
      {/* <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{ flexGrow: 1, padding: 10 }}></ScrollView> */}
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

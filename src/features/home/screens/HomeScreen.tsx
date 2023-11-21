/* eslint-disable react-native/no-inline-styles */
import { ActivityCard } from '@app/components';
import PullToRefreshList from '@app/components/pull-to-refresh-list';
import { MediaFlatlist } from '@app/components/swiper-flatlist';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import React from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const styles = makeStyles(theme, inset);

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
        style={{ flexGrow: 1, padding: 10 }}>
        <MediaFlatlist
          assets={[
            {
              uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
              type: 'image/jpeg',
            },
            {
              uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
              type: 'image/jpeg',
            },
          ]}
        />
        <ActivityCard
          title="Lorem ipsum"
          text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu"
          timestamp="2h"
          // url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
          username="docren155"
          media={[
            {
              uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
              type: 'image/jpeg',
            },
            {
              uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
              type: 'image/jpeg',
            },
          ]}
        />
        <ActivityCard
          title="Lorem ipsum"
          text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo,"
          timestamp="2h"
          url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
          username="docren155"
        />
        <ActivityCard
          title="Lorem ipsum"
          text="Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
          timestamp="2h"
          username="docren155"
        />
      </ScrollView>
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

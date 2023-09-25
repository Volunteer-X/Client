/* eslint-disable react-native/no-inline-styles */
import PicksSelectView from '@app/components/PicksSelectView';
import PullToRefreshList from '@app/components/pull-to-refresh-list';
import useAppTheme from '@app/hooks/useAppTheme';
import { DIMENSIONS, PADDING } from '@app/lib';
import { AppTheme } from '@app/theme';
import React from 'react';

import { View, StyleSheet, StatusBar, Text } from 'react-native';
import { Button, MD3Colors } from 'react-native-paper';
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
      <View>
        <PicksSelectView
          horizontal
          selectedPicks={() => {}}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: PADDING.sm,
          }}
          chipStyle={{
            marginHorizontal: 4,
            marginTop: PADDING.sm,
            marginBottom: PADDING.sm,
          }}
        />
      </View>
      <PullToRefreshList />
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

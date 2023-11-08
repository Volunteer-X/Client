/* eslint-disable react-native/no-inline-styles */
import { MultiSelectView, PicksSelectView } from '@app/components';
import useAppTheme from '@app/hooks/useAppTheme';
import { PADDING, Picks, Pick, PicksIcon, PicksLabel } from '@app/lib';
import { AppTheme } from '@app/theme';
import React, { useEffect, useState } from 'react';

import { View, StyleSheet, StatusBar } from 'react-native';
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
        {/* <PicksSelectView
          key={'HomeScreen'}
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
        /> */}
      </View>
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

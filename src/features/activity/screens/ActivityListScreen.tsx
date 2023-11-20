import { ActivityCard, PicksSelectView } from '@app/components';
import useAppTheme from '@app/hooks/useAppTheme';
import { ActivityListNavProp } from '@app/types/type';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from './activity.style';

export const ActivityListScreen = () => {
  // Navigation
  const navigation = useNavigation<ActivityListNavProp>();

  // Theme
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  // Header

  const header = useCallback(() => {
    return (
      <View style={styles.header}>
        <Text
          variant="displaySmall"
          numberOfLines={2}
          style={styles.headerTitleText}>
          Your Activities
        </Text>
      </View>
    );
  }, [styles.header, styles.headerTitleText]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header,
    });
  }, [header, navigation]);

  return (
    <View style={styles.page}>
      <StatusBar
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <View>
        <PicksSelectView
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.filterPinsContainer}
          chipStyle={styles.chipStyle}
          chipTextStyle={styles.chipTextStyle}
          selectedPicks={[]}
          onPickSelect={picks => {}}
        />
        <View style={styles.cardView}>
          <ActivityCard
            title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula."
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quis cum
        libero ducimus porro? Eos dicta at ea asperiores amet nemo labore
        voluptas illo! In assumenda quisquam voluptates tempora officiis."
            username="docren155"
            timestamp="2h"
            url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
            // media={[
            //   {
            //     uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
            //     type: 'image/jpeg',
            //   },
            //   {
            //     uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
            //     type: 'image/jpeg',
            //   },
            // ]}
            showPicks
          />
        </View>
      </View>
    </View>
  );
};

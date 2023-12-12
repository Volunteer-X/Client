import {
  ActivityCard,
  ActivityListFab,
  PicksSelectView,
} from '@app/components';
import {
  ActivitySettingModal,
  BottomSheetRefProps,
} from '@app/components/bottom-sheets';
import useAppTheme from '@app/hooks/useAppTheme';
import { PicksLabel } from '@app/lib';
import { ActivityStackScreenProps } from '@ts-types/type';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from './activity.style';
import { useActivityList } from '../hooks/useActivityList';

export const ActivityListScreen = () => {
  // Navigation
  const navigation =
    useNavigation<ActivityStackScreenProps<'Activities'>['navigation']>();

  // Theme
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  // * Get Activity List
  const { data, loading, error } = useActivityList();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data, loading, error]);

  // Setting Modal
  const settingModalRef = useRef<BottomSheetRefProps>(null);

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
    <Portal.Host>
      <View style={styles.page}>
        <StatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <View style={{ flex: 1 }}>
          <ActivityListFab />
          <PicksSelectView
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
            horizontal
            contentContainerStyle={styles.filterPinsContainer}
            chipStyle={styles.chipStyle}
            chipTextStyle={styles.chipTextStyle}
            selectedPicks={[]}
            onPickSelect={picks => {}}
          />
          <ActivitySettingModal ref={settingModalRef} />
          <FlatList
            overScrollMode="never"
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
            data={Array(2).fill(0)}
            renderItem={item => (
              <View style={styles.cardView}>
                <ActivityCard
                  title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula."
                  text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quis cum
        libero ducimus porro? Eos dicta at ea asperiores amet nemo labore
        voluptas illo! In assumenda quisquam voluptates tempora officiis."
                  username="docren155"
                  timestamp="2h"
                  picks={[
                    PicksLabel.Civil,
                    PicksLabel.Disaster,
                    PicksLabel.Economic,
                  ]}
                  // url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
                  onMenuClick={() => {
                    settingModalRef.current?.openModal();
                  }}
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
                  showPicks
                  onPress={() => {
                    navigation.navigate('ActivityScreen');
                  }}
                />
              </View>
            )}
          />

          {/* <ActivityCard
            title="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula."
            text="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim quis cum
        libero ducimus porro? Eos dicta at ea asperiores amet nemo labore
        voluptas illo! In assumenda quisquam voluptates tempora officiis."
            username="docren155"
            timestamp="1 day"
            picks={[PicksLabel.Animal, PicksLabel.Art, PicksLabel.Disaster]}
            // url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
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
            showPicks
          /> */}
        </View>
      </View>
    </Portal.Host>
  );
};

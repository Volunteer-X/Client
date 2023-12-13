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
import { ActivityStackScreenProps } from '@ts-types/type';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useLayoutEffect, useRef } from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from './activity.style';
import { useQuery } from '@apollo/client';
import { GET_ALL_PING } from '../graphQL/activity.query';
import LottieView from 'lottie-react-native';
import { Media, PingFragmentFragment } from '@app/__generated__/gql/graphql';

export const ActivityListScreen = () => {
  // Navigation
  const navigation =
    useNavigation<ActivityStackScreenProps<'Activities'>['navigation']>();

  // Theme
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  // * Get Activity List
  // const { data, loading, error } = useActivityList();

  const { data, loading, fetchMore } = useQuery(GET_ALL_PING, {
    variables: {
      first: 3,
      after: null,
    },
  });

  // useEffect(() => {

  const fetchMoreData = useCallback(() => {
    // if()

    fetchMore({
      variables: {
        after: data?.getAllPing.pageInfo.endCursor,
      },
    });
  }, [data?.getAllPing.pageInfo.endCursor, fetchMore]);

  // useEffect(() => {
  //   if (data && data.getAllPing.edges.length > 0) {
  //   }
  // }, [data]);

  // Setting Modal
  const settingModalRef = useRef<BottomSheetRefProps>(null);

  const handleOnCardPress = useCallback(
    (item?: PingFragmentFragment) => {
      navigation.navigate('ActivityScreen', {
        activityID: item?.id,
        activity: item,
        owner: data?.getAllPing.owner[' $fragmentRefs']?.UserFragmentFragment,
      });
    },
    [data?.getAllPing.owner, navigation],
  );

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

  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <LottieView
          source={require('@assets/anims/empty-screen.json')}
          style={styles.emptyScreenLottie}
          autoPlay
          loop
        />
        <Text variant="headlineSmall">Opps! No activities yet.</Text>
        <Text variant="bodySmall">
          Make a ping to create your own activity.
        </Text>
      </View>
    );
  }, [styles.emptyContainer, styles.emptyScreenLottie]);

  const renderListHeader = useCallback(() => {
    return (
      <View style={styles.listHeaderContainer}>
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
      </View>
    );
  }, [styles]);

  return (
    <Portal.Host>
      <View style={styles.page}>
        <StatusBar
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor={theme.colors.background}
        />
        <ActivityListFab />
        <ActivitySettingModal ref={settingModalRef} />
        <View style={{ flex: 1 }}>
          {loading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={require('@assets/anims/pull-to-refresh.json')}
                style={{ width: 150, height: 150 }}
                autoPlay
                loop
              />
            </View>
          ) : (
            <FlatList
              // style={{ height: '100%' }}
              contentContainerStyle={{ flexGrow: 1 }}
              overScrollMode="never"
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderListHeader}
              stickyHeaderIndices={[0]}
              stickyHeaderHiddenOnScroll
              ListEmptyComponent={renderEmptyComponent}
              onEndReachedThreshold={0.3}
              onEndReached={fetchMoreData}
              data={data?.getAllPing.edges}
              keyExtractor={item =>
                `${item.node[' $fragmentRefs']?.PingFragmentFragment.createdAt}-activity}`
              }
              renderItem={({ item }) => (
                <View style={styles.cardView}>
                  <ActivityCard
                    ping={item.node}
                    creator={data?.getAllPing.owner[' $fragmentRefs']}
                    title={''}
                    text={''}
                    username={''}
                    timestamp="2h"
                    showPicks
                    showStar
                    // url="https://www.youtube.com/watch?v=QwievZ1Tx-8"
                    onMenuClick={() => {
                      settingModalRef.current?.openModal();
                    }}
                    onPress={() =>
                      handleOnCardPress(
                        item.node[' $fragmentRefs']?.PingFragmentFragment,
                      )
                    }
                  />
                </View>
              )}
            />
          )}
        </View>
      </View>
    </Portal.Host>
  );
};

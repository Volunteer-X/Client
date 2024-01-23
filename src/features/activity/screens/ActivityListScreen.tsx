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
import { RootStackParamList } from '@ts-types/type';
import { NavigationProp } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { FlatList, StatusBar, View } from 'react-native';
import { IconButton, Portal, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { makeStyles } from './activity.style';
import { NetworkStatus, useQuery } from '@apollo/client';
import { GET_ALL_PING } from '../graphQL/activity.query';
import LottieView from 'lottie-react-native';
import { Activity } from '@app/types/entities';
import { AppIcons } from '@app/theme/icon';
import { SIZES } from '@app/lib';
import Ionicon from 'react-native-vector-icons/Ionicons';

export const ActivityListScreen = ({
  navigation,
}: {
  navigation: NavigationProp<RootStackParamList>;
}) => {
  // Theme
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  // * Get Activity List
  // const { data, loading, error } = useActivityList();

  const { data, loading, fetchMore, refetch, networkStatus } = useQuery(
    GET_ALL_PING,
    {
      variables: {
        first: 3,
        after: null,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  useEffect(() => {
    // console.log('data', data?.getAllPing.edges.length);
    // console.log('type', data?.getAllPing.owner);
    // console.log('loading', loading);
  }, [data, loading]);

  const fetchMoreData = useCallback(() => {
    if (!data?.getAllPing.pageInfo.hasNextPage) {
      return;
    }
    fetchMore({
      variables: {
        after: data?.getAllPing.pageInfo.endCursor,
      },
    });
  }, [
    data?.getAllPing.pageInfo.endCursor,
    data?.getAllPing.pageInfo.hasNextPage,
    fetchMore,
  ]);

  // Setting Modal
  const settingModalRef = useRef<BottomSheetRefProps>(null);

  const handleOnCardPress = useCallback(
    (item: Activity) => {
      navigation.navigate('ActivityNavigation', {
        screen: 'ActivityScreen',
        params: {
          activityID: item?.id,
          activity: item,
          owner: data?.getAllPing.owner,
        },
      });
    },
    [data?.getAllPing.owner, navigation],
  );

  const handleRefresh = useCallback(() => {
    console.log('Refresh clicked');

    refetch();
  }, [refetch]);

  // Header
  // * Render header right
  // * Handle submit button
  const headerRight = useCallback(() => {
    return (
      <IconButton
        icon={AppIcons.REFRESH}
        // iconColor="green"
        onPress={handleRefresh}
        // disabled={isSubmitButtonDisabled}
      />
    );
  }, [handleRefresh]);

  const headerLeft = useCallback(() => {
    return (
      <Ionicon
        name={AppIcons.ARROW_BACK}
        size={SIZES.large}
        style={{ paddingLeft: SIZES.medium }}
        onPress={() => navigation.goBack()}
      />
    );
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Activities',
      // headerBackVisible: true,
      headerLeft,
      headerRight,
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: '600',
      },
      headerRightContainerStyle: {
        paddingRight: SIZES.small,
      },
      headerLeftContainerStyle: {
        paddingRight: SIZES.small,
      },
    });
  }, [headerLeft, headerRight, navigation]);

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
          translucent
          barStyle={theme.dark ? 'light-content' : 'dark-content'}
          backgroundColor="transparent"
        />
        <ActivityListFab />
        <ActivitySettingModal ref={settingModalRef} />
        <View style={{ flex: 1 }}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <LottieView
                source={require('@assets/anims/pull-to-refresh.json')}
                style={styles.loadingLottie}
                autoPlay
                loop
              />
            </View>
          ) : (
            <FlatList
              contentContainerStyle={{ flexGrow: 1 }}
              overScrollMode="never"
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
              ListHeaderComponent={renderListHeader}
              stickyHeaderIndices={[0]}
              stickyHeaderHiddenOnScroll
              ListEmptyComponent={renderEmptyComponent}
              onEndReachedThreshold={0.8}
              onEndReached={fetchMoreData}
              data={data?.getAllPing.edges}
              // keyExtractor={item =>
              //   `${item.node[' $fragmentRefs']?.PingFragmentFragment.createdAt}-activity}`
              // }
              renderItem={({ item }) => (
                <View style={styles.cardView}>
                  <ActivityCard
                    activity={item.node}
                    creator={data?.getAllPing.owner}
                    options={{ showMenu: false, showPicks: false }}
                    onMenuClick={() => {
                      settingModalRef.current?.openModal();
                    }}
                    onPress={() => handleOnCardPress(item.node)}
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

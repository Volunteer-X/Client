import {
  FlatList,
  Insets,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Animated, {
  Context,
  interpolate,
  runOnJS,
  scrollTo,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { AppTheme } from '@app/theme';
import useAppTheme from '@app/hooks/useAppTheme';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { PicksSelectView } from '@app/components';
import { IconButton } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { AppIcons } from '@app/theme/icon';

const REFRESH_AREA_HEIGHT = 130 as const;

const PullToRefreshList = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();

  const styles = makeStyles(theme, inset);

  const [toggleLottie, setToggleLottie] = useState(false);
  const [gestureActive, setGestureActive] = useState(false);
  const [toggleGesture, setToggleGesture] = useState(true);

  const flatlistAnimRef = useAnimatedRef();

  const translationY = useSharedValue(0);
  const pullUpTranslate = useSharedValue(0);

  //   ! Change
  const fetchData = () => {
    setTimeout(() => {}, 2000);

    setTimeout(() => {
      translationY.value = withTiming(0, { duration: 200 }, finished => {
        pullUpTranslate.value = 0;
        runOnJS(setToggleLottie)(false);
      });
    }, 3000);
  };

  const pullUpAnimation = () => {
    pullUpTranslate.value = withDelay(
      0,
      withTiming(
        pullUpTranslate.value === 0 ? -100 : 0,
        { duration: 200 },
        finished => {
          if (finished) {
            runOnJS(setToggleLottie)(true);
            /*
             ! Fetch Data function here
             * runOnJS(fetchData)()
             */
            runOnJS(fetchData)();
          }
        },
      ),
    );
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translationY.value;
      runOnJS(setGestureActive)(true);
    },
    onActive: (event, context) => {
      const totalTranslation = context.startY + event.translationY;

      if (totalTranslation < REFRESH_AREA_HEIGHT) {
        translationY.value = totalTranslation;
      } else {
        translationY.value = REFRESH_AREA_HEIGHT;
      }

      if (totalTranslation < 0) {
        translationY.value = 0;
        scrollTo(flatlistAnimRef, 0, totalTranslation * -1, false);
      }
    },
    onEnd: () => {
      runOnJS(setGestureActive)(false);
      if (translationY.value <= REFRESH_AREA_HEIGHT - 1) {
        translationY.value = withTiming(0, { duration: 200 });
      } else {
        runOnJS(pullUpAnimation)();
      }
      if (!(translationY.value > 0)) {
        runOnJS(setToggleGesture)(false);
      }
    },
  });

  const handleOnScroll = (event: any) => {
    const pos = event.nativeEvent.contentOffset.y;
    if (pos === 0) {
      setToggleGesture(true);
    } else if (pos > 0 && toggleGesture && !gestureActive) {
      setToggleGesture(false);
    }
  };

  const animatedSpace = useAnimatedStyle(() => {
    return {
      height: translationY.value,
    };
  });

  const pullDownIconSection = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationY.value,
      [0, REFRESH_AREA_HEIGHT],
      [0, 180],
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const pullUpTranslationStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationY.value,
      [58, REFRESH_AREA_HEIGHT],
      [0, 1],
    );

    return {
      opacity,
      transform: [
        {
          translateY: pullUpTranslate.value,
        },
      ],
    };
  });

  return (
    <>
      <View style={styles.container}>
        <Animated.View style={[styles.pullToRefreshArea, animatedSpace]}>
          <Animated.View style={[styles.center, pullUpTranslationStyle]}>
            <Animated.View style={pullDownIconSection}>
              <IconButton icon={AppIcons.ARROW_DOWN_CIRCLE} />
            </Animated.View>
            <Text>Pull down to refresh</Text>
          </Animated.View>
          {toggleLottie && (
            <>
              <LottieView
                source={require('@assets/anims/pull-to-refresh.json')}
                style={styles.lottieView}
                autoPlay
              />
            </>
          )}
        </Animated.View>

        {/* <FlatList /> */}
        <PicksSelectView
          key="PullToRefreshList"
          selectedPicks={() => {}}
          showsVerticalScrollIndicator={false}
          chipStyle={{ height: 100, margin: 10 }}
          onScroll={handleOnScroll}
        />

        {toggleGesture && (
          <PanGestureHandler onGestureEvent={gestureHandler}>
            <Animated.View style={styles.gesture} />
          </PanGestureHandler>
        )}
      </View>
    </>
  );
};

export default PullToRefreshList;

const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      paddingLeft: inset.left,
      paddingRight: inset.right,
    },
    gesture: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: 200,
      width: '100%',
      zIndex: 9999,

      //   backgroundColor: 'green',
    },
    lottieView: {
      width: 80,
      height: 80,
      backgroundColor: 'transparent',
      marginTop: -15,
    },
    pullToRefreshArea: {
      height: 140,
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      overflow: 'hidden',

      //   backgroundColor: 'red',
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

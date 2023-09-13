import React from 'react';
import {
  I18nManager,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

import { DotProps } from './pagination-props';

const ExpandingDots = ({
  scrollX,
  size,
  dotContainerStyle = {},
  dotStyle = {},
  inactiveDotColor = '#000',
  inactiveDotOpacity = 0.5,
  expandingDotWidth = 10,
  activeDotColor = '#FFF',
}: DotProps) => {
  const { width } = useWindowDimensions();

  const dotWidth = (dotStyle.width as number) || 10;

  return (
    <View style={[style.container, dotContainerStyle]}>
      {Array.from({ length: size }).map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        const backgroundColor = interpolateColor(scrollX.value, inputRange, [
          inactiveDotColor,
          activeDotColor,
          inactiveDotColor,
        ]);

        const opacity = interpolate(
          scrollX.value,
          inputRange,
          [inactiveDotOpacity, 1, inactiveDotOpacity],
          Extrapolate.CLAMP,
        );

        const expand = interpolate(
          scrollX.value,
          inputRange,
          [dotWidth, expandingDotWidth, dotWidth],
          Extrapolate.CLAMP,
        );

        return (
          <Animated.View
            key={`dot-${index}`}
            style={[
              style.dotStyle,
              dotStyle,
              { width: expand },
              { opacity },
              { backgroundColor },
            ]}
          />
        );
      })}
    </View>
  );
};

export default ExpandingDots;

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    gap: 2,
  },
  dotStyle: {
    width: 7.5,
    height: 7.5,
    borderRadius: 5,
    marginHorizontal: 1,
  },
});

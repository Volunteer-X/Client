import { ViewStyle } from 'react-native';
import { SharedValue } from 'react-native-reanimated';

export type PaginationProps = {
  size: number;
  paginationIndex?: number;
  paginationStyle?: ViewStyle;
  paginationContainerStyle?: ViewStyle;
  paginationTextStyle?: ViewStyle;
};

export type DotProps = {
  scrollX: SharedValue<number>;
  size: number;
  dotContainerStyle?: ViewStyle;
  dotStyle?: ViewStyle;
  inactiveDotOpacity?: number;
  inactiveDotColor?: string;
  expandingDotWidth?: number;
  activeDotColor?: string;
};

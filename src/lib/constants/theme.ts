import { Dimensions } from 'react-native';

export const DIMENSIONS = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width,
};

export const SIZES = {
  xxSmall: 5,
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
} as const;

export const HEIGHTS = {
  postMedia: 200,
  header: 55,
} as const;

export const PADDING = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
} as const;

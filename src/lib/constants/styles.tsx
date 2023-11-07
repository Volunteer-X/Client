import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';
import { DIMENSIONS } from './theme';

// const commonStyles = StyleSheet.create({
//   container,
// });

export const PING_STYLES = (theme: AppTheme) =>
  StyleSheet.create({
    subContainer: {
      padding: 10,
      borderRadius: 10,
      gap: 1.5,

      // ! Change
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral90,
    },
    textInput: {
      backgroundColor: 'transparent',
    },
    textArea: {
      minHeight: DIMENSIONS.fullHeight / 5,
    },
  });

export const circleStyle;

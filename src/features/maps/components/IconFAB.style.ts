import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    FAB: {
      // paddingHorizontal: PADDING.md,
      backgroundColor: 'transparent',
    },
    gradient: {
      borderRadius: 100,
    },
  });

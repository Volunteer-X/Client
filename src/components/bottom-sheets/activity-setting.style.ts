import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
  });

import { PADDING } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.background,
      elevation: 0,
    },
    page: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: PADDING.sm,
      gap: PADDING.sm,
    },
    searchBarContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      borderRadius: 25,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      minHeight: 45,
      paddingHorizontal: PADDING.sm,
      paddingVertical: PADDING.sm,
    },
    searchBarPlaceholder: {
      opacity: 0.8,
    },
  });

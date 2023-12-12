import { PADDING } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    emptyContainer: {
      flex: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      // backgroundColor: 'red',
    },
    emptyScreenLottie: {
      width: 200,
      height: 200,
    },
    listHeaderContainer: {},
    header: {
      height: 80,
      elevation: 0,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      marginTop: inset.top,
      paddingHorizontal: PADDING.lg,
    },
    headerTitleText: { letterSpacing: 0.5, fontStyle: 'italic' },
    filterPinsContainer: {
      marginHorizontal: PADDING.sm,
      marginBottom: 5,
    },
    chipStyle: { padding: 5, margin: 5 },
    chipTextStyle: { fontSize: 14, lineHeight: 20 },
    cardView: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginHorizontal: 15,
      marginVertical: 2.5,
      backgroundColor: 'theme.colors.background',
    },
  });

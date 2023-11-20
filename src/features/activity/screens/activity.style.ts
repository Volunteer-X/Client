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
      // flexDirection: 'row',
      //   backgroundColor: 'red',
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

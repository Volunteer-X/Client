import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    bottomSheetModal: {
      borderRadius: 25,
      overflow: 'hidden',
    },
    handleStyle: {
      backgroundColor: theme.colors.background,
      marginBottom: -1,
    },
    handleIndicatorStyle: {
      backgroundColor: theme.colors.onBackground,

      // borderRadius: 20,
    },
    subContainer: {
      flexDirection: 'row',
      marginVertical: 5,
      gap: 20,
      alignItems: 'center',
      marginTop: 0,
      marginBottom: 5,
      paddingVertical: 10,
    },
    label: {
      fontSize: 16,
      color: theme.colors.onBackground,
    },
  });

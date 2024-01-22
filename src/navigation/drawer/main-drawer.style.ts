import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      padding: 20,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },

    statContainer: {
      flexDirection: 'row',
      columnGap: 15,
      marginVertical: 10,
    },
    nameContainer: {
      marginTop: 10,
    },
    username: {
      color: MD3Colors.neutral50,
    },
    picksButton: {
      position: 'absolute',
      top: 10,
      right: 0,
    },
  });

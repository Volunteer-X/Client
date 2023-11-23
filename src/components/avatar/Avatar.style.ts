import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyle = (theme: AppTheme, size: number) =>
  StyleSheet.create({
    avatarStyle: {},
    textStyle: {
      fontWeight: '300',
    },
    avatarContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: size,
      height: size,
    },
    avatarBorder: {
      overflow: 'hidden',
      width: size * 1.2,
      height: size * 1.2,
      borderRadius: size,
      borderWidth: 0.5,
      borderColor: 'white',
    },
  });

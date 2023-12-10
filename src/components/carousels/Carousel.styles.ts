import { DIMENSIONS } from '@app/lib';
import { StyleSheet } from 'react-native';

export const makeStyles = () =>
  StyleSheet.create({
    container: {
      alignItems: 'center',
    },
    carousel: { width: DIMENSIONS.fullWidth * 1 },
  });

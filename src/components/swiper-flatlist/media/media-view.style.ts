import { HEIGHTS } from '@app/lib';
import { StyleSheet } from 'react-native';

export const makeStyles = (calculatedWidth: number) =>
  StyleSheet.create({
    renderItemContainer: {
      flexDirection: 'column',
      width: calculatedWidth,
      justifyContent: 'flex-start',
    },
    renderItemMedia: {
      height: HEIGHTS.postMedia,
      width: '100%',
    },
  });

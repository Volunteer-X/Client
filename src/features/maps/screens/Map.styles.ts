import { PADDING } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
import { CircleLayerStyle } from '@rnmapbox/maps';

export const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    page: {
      flex: 1,
    },
    container: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingTop: inset.top,
      paddingBottom: inset.bottom,
      paddingLeft: inset.left,
      paddingRight: inset.right,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    cardContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.background,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: theme.colors.background,
      opacity: 0.75,

      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    },
    lottie: {
      width: 100,
      height: 100,
    },
    myLocation: {
      position: 'absolute',
      top: 150,
      right: 10,
      backgroundColor: 'black',
      borderWidth: 1,
      borderColor: '#c9c9c9',
      padding: 5,
      borderRadius: 10,
    },
    headerView: {
      position: 'absolute',
      top: inset.top + PADDING.sm,
    },
    searchBar: {
      backgroundColor: theme.colors.background,
      marginHorizontal: PADDING.sm,
    },
    picksChip: {
      marginHorizontal: 1,
      borderRadius: 100,
      paddingHorizontal: 7.5,
      paddingVertical: 3.5,
    },
    picksChipText: {},
    picksSelectView: {
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
  });

export const circleStyle = {
  circleRadius: 10,
  circleOpacity: 1,
  circleColor: 'red',
  circleStrokeWidth: 1.5,
  circleStrokeOpacity: 0.25,
  circleSortKey: 1,
};

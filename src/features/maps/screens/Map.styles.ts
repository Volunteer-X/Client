import { PADDING } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';

export const makeStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    page: {
      flex: 1,
    },
    container: {
      ...StyleSheet.absoluteFillObject,
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
    searchBarView: {
      position: 'absolute',
      top: inset.top + PADDING.sm,
      right: 5,
      left: 5,
    },
    searchBarContainer: {
      backgroundColor: 'rgba(0,0,0,0)',
      borderTopWidth: 0,
      borderBottomWidth: 0,
      padding: 0,
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
  });

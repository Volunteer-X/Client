import { DIMENSIONS, SIZES } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';
import { MD3Colors } from 'react-native-paper';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    superContainer: {
      flex: 1,
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
    },
    container: {
      paddingHorizontal: SIZES.medium,
      flex: 1,
      paddingVertical: 10,
      gap: 10,
    },
    subContainer: {
      padding: 10,
      borderRadius: 10,
      gap: 1.5,

      // ! Change
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral90,
    },
    header: {
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral90,
      elevation: 0,
    },
    headerTitle: {
      fontWeight: 'bold',
      letterSpacing: 2.5,
    },
    pickTitle: {
      fontWeight: '600',
      letterSpacing: 1.1,
    },
    picksContainer: {
      gap: 10,
    },
    picksHorizontalContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 2.5,
      paddingVertical: 5,
      marginRight: 7.5,
      marginVertical: 5,
    },
    iconContainerStyle: {
      backgroundColor: 'transparent',
      paddingHorizontal: 0,
      paddingVertical: 0,
      marginHorizontal: 0,
      marginVertical: 0,
    },
    textInput: {
      backgroundColor: 'transparent',
    },
    textArea: {
      minHeight: DIMENSIONS.fullHeight / 5,
    },
    textInputContent: {},
    mapContainerStyle: {
      flex: 1,
      height: DIMENSIONS.fullHeight * 0.15,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
    },
    locationLabel: {
      padding: 10,
    },
    selectedPlace: {
      color: MD3Colors.neutral60,
      fontWeight: '700',
    },
    mediaContainer: {
      paddingHorizontal: SIZES.medium,
      paddingVertical: 10,
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'flex-start',
      backgroundColor: theme.dark ? MD3Colors.neutral0 : MD3Colors.neutral100,
      elevation: 5,
    },
    mediaTypeIcon: {
      padding: 0,
      margin: 0,
      backgroundColor: theme.dark ? MD3Colors.neutral10 : MD3Colors.neutral80,
    },
    urlContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
  });

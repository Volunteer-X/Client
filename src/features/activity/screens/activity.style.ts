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
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingLottie: {
      width: 150,
      height: 150,
    },
    emptyScreenLottie: {
      width: 200,
      height: 200,
    },
    listHeaderContainer: {},
    header: {
      flexDirection: 'row',
      height: 70,
      elevation: 0,
      marginTop: inset.top,
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      // justifyContent: 'center',
      // paddingHorizontal: PADDING.lg,
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

export const makeActivityStyles = (theme: AppTheme, inset: EdgeInsets) =>
  StyleSheet.create({
    page: {
      // flex: 0,
      // backgroundColor: 'blue',
    },
    imageBackground: {
      width: '100%',
      height: '100%',
      // flex: 1,
      zIndex: -100,
    },
    scrollView: {
      paddingTop: inset.top,
      marginBottom: inset.bottom,
      paddingRight: inset.right,
      paddingLeft: inset.left,
      // paddingBottom: 1000,
      // backgroundColor: 'red',
    },
    bodyContainer: {
      flex: 1,
      height: '100%',
      // !Change to match the overall theme
      backgroundColor: '#000',
      // height: DIMENSIONS.fullHeight - DIMENSIONS.fullHeight / 5,
      borderTopStartRadius: 25,
      borderTopEndRadius: 25,
      elevation: 2,
      padding: 15,
      paddingBottom: 50,
    },
    header: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 1.5,
      // backgroundColor: 'red',
      paddingTop: PADDING.md,
      paddingBottom: PADDING.sm,
    },
    activityTitle: {
      fontWeight: 'bold',
      color: '#000',
      alignItems: 'center',
      textAlign: 'center',
      marginHorizontal: 70,
      flexWrap: 'wrap',
      // backgroundColor: '#FFF',
    },
    editBadge: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      margin: 0,
      backgroundColor: '#2a2a2a',
      borderWidth: 2,
      borderColor: 'transparent',
      zIndex: 100,
    },
    avatarContainer: {},
    avatarBorder: {
      borderColor: '#000',
      borderWidth: 2,
      height: 90,
      width: 90,
      borderRadius: 90 / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatar: {
      padding: 0,
      margin: 0,
      elevation: 1,
    },
    memberContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 20,
      paddingBottom: PADDING.sm,
    },
    headerFloat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: 15,
      marginTop: inset.top,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      gap: 5,
      width: '100%',
      zIndex: 100,
      // backgroundColor: 'red',
    },
    actions: {
      color: '#FFF',
      backgroundColor: '#000',
      borderRadius: 50,
      padding: 10,
    },
  });

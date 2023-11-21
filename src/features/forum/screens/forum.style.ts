import { PADDING, SIZES } from '@app/lib';
import { AppTheme } from '@app/theme';
import { StyleSheet } from 'react-native';

export const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    header: {
      backgroundColor: theme.colors.background,
      elevation: 0,
    },
    page: {
      flex: 1,
    },
    container: {
      flex: 1,
      padding: PADDING.sm,
      gap: PADDING.sm,
    },
    searchBarContainer: {
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center',
      borderRadius: 25,
      borderWidth: 1.5,
      borderColor: theme.colors.border,
      minHeight: 45,
      paddingHorizontal: PADDING.sm,
      paddingVertical: PADDING.sm,
    },
    searchBarPlaceholder: {
      opacity: 0.8,
    },
    emptyContainer: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      gap: PADDING.sm,
      paddingHorizontal: PADDING.lg,
    },
    lottieView: {
      width: '100%',
      height: 400,
      resizeMode: 'contain',
      // backgroundColor: 'red',
    },
    emptyTitle: {
      fontWeight: 'bold',
      color: theme.colors.text,
      textAlign: 'center',
    },
    emptySubTitle: {
      textAlign: 'center',
      // lineHeight: 15,
      flexWrap: 'wrap',
      padding: 5,
    },
    forumContainer: {
      flexDirection: 'row',
      gap: PADDING.md,
      alignItems: 'center',
      padding: PADDING.sm,
      marginTop: 10,
    },
    avatarContainer: {
      // backgroundColor: 'red',
      borderColor: '#FFF',
      borderRadius: 50,
      borderWidth: 1,
    },
    avatar: { margin: 5 },
    forumTitle: {
      fontWeight: 'bold',
      marginRight: 25,
    },
    forumOwner: {
      opacity: 0.95,
      // fontVariant: [''],
    },
    replies: {
      fontVariant: ['lining-nums'],
      opacity: 0.85,
    },
    timestamp: {
      color: '#FFF',
      opacity: 0.5,
    },
  });

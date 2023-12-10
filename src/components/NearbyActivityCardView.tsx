import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Text } from 'react-native-paper';
import Image from 'react-native-fast-image';
import { DIMENSIONS, PADDING } from '@app/lib';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import { Avatar } from './avatar/Avatar';

// const source =
//   'https://images.unsplash.com/photo-1682686581484-a220483e6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTcyMTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTY4NjUyOTY3N3w&ixlib=rb-4.0.3&q=80&w=400';

type Props = {
  mapSnapshotSource: string;
  userName: string;
  activityFollowers: number;
  activityName: string;
  activityCreatedOn: string;
};

const NearbyActivityCardView = ({
  mapSnapshotSource,
  userName,
  activityFollowers,
  activityName,
  activityCreatedOn,
}: Props) => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.mapSnapshotContainer}>
        <Image style={styles.mapSnapshot} source={{ uri: mapSnapshotSource }} />
        <View style={styles.nameContainer}>
          {/* change to image type after API */}
          <Avatar name="A" size={24} />
          <Text variant="labelMedium">{userName}</Text>
        </View>
        <View style={styles.followersContainer}>
          <Text variant="labelMedium">{`${activityFollowers}K Followers`}</Text>
        </View>
      </View>
      <View style={styles.bodyContainer}>
        <View style={{ gap: 2 }}>
          <Text variant="labelLarge" style={{}}>
            {activityName}
          </Text>
          <Text variant="labelSmall">{`Create on ${activityCreatedOn}`}</Text>
        </View>
        <Button mode="text">Join</Button>
      </View>
    </View>
  );
};

export default NearbyActivityCardView;

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: '#000',
      borderRadius: 10,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      gap: 10,
      padding: PADDING.sm,
      flex: 1,
    },
    mapSnapshotContainer: {
      flex: 1,
    },
    mapSnapshot: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      borderRadius: 10,
    },
    bodyContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    nameContainer: {
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: theme.colors.surface,
      padding: 2,
      paddingRight: 10,
      borderRadius: 100,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    followersContainer: {
      position: 'absolute',
      bottom: 15,
      right: 15,
      backgroundColor: '#000',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      elevation: 1,
    },
  });

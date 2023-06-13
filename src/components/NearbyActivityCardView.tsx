import { Dimensions, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button, Image } from '@rneui/themed';
import { ActivityIndicator, Avatar } from 'react-native-paper';

const source =
  'https://images.unsplash.com/photo-1682686581484-a220483e6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTcyMTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTY4NjUyOTY3N3w&ixlib=rb-4.0.3&q=80&w=400';

const { height, width } = Dimensions.get('window');

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
  return (
    <View style={styles.container}>
      <View style={styles.mapSnapshotContainer}>
        <Image
          style={styles.mapSnapshot}
          source={{ uri: mapSnapshotSource, height: 64, width: 64 }}
          transition
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.nameContainer}>
          {/* change to image type after API */}
          <Avatar.Text label="A" size={24} />
          <Text style={{ fontWeight: '500', fontSize: 11 }}>{userName}</Text>
        </View>
        <View style={styles.followersContainer}>
          <Text style={{ fontSize: 11, color: '#FFF', fontWeight: 'bold' }}>
            {`${activityFollowers}K Followers`}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 10,
          paddingTop: 0,
        }}>
        <View style={{ gap: 2 }}>
          <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
            {activityName}
          </Text>
          <Text
            style={{ fontSize: 11 }}>{`Create on ${activityCreatedOn}`}</Text>
        </View>
        <Button
          title={'Join Activity'}
          titleStyle={{ fontSize: 12 }}
          style={{ borderRadius: 5 }}
        />
      </View>
    </View>
  );
};

export default NearbyActivityCardView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    width: width * 0.6,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    gap: 10,
    elevation: 2,
  },
  mapSnapshotContainer: {
    paddingHorizontal: 10,
    paddingTop: 5,
    height: height * 0.2,
    width: '100%',
  },
  mapSnapshot: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  nameContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    backgroundColor: '#FFF',
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

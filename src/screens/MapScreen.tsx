import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { SearchBar } from '@rneui/base';
import NearbyActivityCardView from '../components/NearbyActivityCardView';

const MapScreen = (): React.JSX.Element => {
  return (
    <>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        loadingEnabled
      />
      <View style={styles.searchBarView}>
        <SearchBar
          value=""
          placeholder="Search"
          round={true}
          containerStyle={styles.searchBarContainer}
        />
      </View>
      <View style={styles.cardContainer}>
        <NearbyActivityCardView
          mapSnapshotSource="https://images.unsplash.com/photo-1682686581484-a220483e6291?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxOTcyMTN8MXwxfGFsbHwxfHx8fHx8Mnx8MTY4NjUyOTY3N3w&ixlib=rb-4.0.3&q=80&w=400"
          userName="Docren155"
          activityFollowers={2.14}
          activityName="Activity Name"
          activityCreatedOn="23 Jul 2023"
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchBarView: {
    position: 'absolute',
    top: 10,
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
    alignItems: 'center',
  },
});

export default MapScreen;

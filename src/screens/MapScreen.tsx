import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { SearchBar } from '@rneui/base';
import CarouselMapCard from '../components/carousel/Carousel';

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
        <CarouselMapCard />
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

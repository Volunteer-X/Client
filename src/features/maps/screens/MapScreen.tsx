import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/base';
import CarouselMapCard from '../../../components/carousels/Carousel';
import { MapView } from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import useAppTheme from '@app/hooks/useAppTheme';

const MapScreen = () => {
  const { theme } = useAppTheme();

  return (
    <>
      <MapView style={styles.map} styleURL={MAPBOX_STYLE_DARK} />
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

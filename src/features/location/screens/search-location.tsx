import { StyleSheet, View } from 'react-native';
import React from 'react';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import LocationSearchBar from '@app/components/location-search-bar';

export const SearchLocationScreen = () => {
  return (
    <View style={styles.container}>
      <LocationSearchBar containerStyle={styles.searchbarContainer} />
      <Mapbox.MapView styleURL={MAPBOX_STYLE_DARK} style={styles.map}>
        <Mapbox.Camera followZoomLevel={12} followUserLocation />
        <Mapbox.UserLocation
          onPress={() => {
            console.log('User location');
          }}
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: { flex: 1 },
  searchbarContainer: {},
});

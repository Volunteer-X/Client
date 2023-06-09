import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { StyledView } from '../style/styledComponents';
import { SearchBar } from '@rneui/base';


const MapScreen = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
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
      <SearchBar placeholder="search" value="" mode="bar" elevation={1} />
    </View>
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
});

export default MapScreen;

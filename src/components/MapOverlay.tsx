import React from 'react';
import { StyleSheet, View } from 'react-native';
import GoogleStaticMaps from './googleStaticMaps';
import LinearGradient from 'react-native-linear-gradient';
import { MAP_API_KEY } from '@env';

const MapOverlay = () => {
  return (
    <View>
      <GoogleStaticMaps
        // "City Hall, New York, NY"
        center={{ latitude: '40.737102', longitude: '-73.990318' }}
        zoom={14}
        size={{ width: 640, height: 640 }}
        apiKey={MAP_API_KEY}
        onError={() => {}}
        onLoad={() => {}}
        containerStyle={styles.map}
      />
      {/* Overlay */}
      <>
        <View style={[styles.overlay, styles.darkOpacity]} />
        <LinearGradient
          colors={['red', 'yellow', 'green']}
          style={[styles.linearGradient, styles.overlay]}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          locations={[0, 0.7, 0.9]}
        />
      </>
    </View>
  );
};

export default MapOverlay;

const styles = StyleSheet.create({
  map: {
    height: '100%',
    width: '100%',
  },
  overlay: {
    flex: 1,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  darkOpacity: {
    opacity: 0.65,
    backgroundColor: '#000',
    zIndex: 2,
  },
  linearGradient: {
    opacity: 0.25,
  },
});

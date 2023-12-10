import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { SearchBar } from '@rneui/base';
import CarouselMapCard from '@components/carousels/Carousel';
import { Camera, MapView } from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './Map.styles';
import { useGeoLocation } from '@app/context/geo-location';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';

const MapScreen = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  const { coords, geoLoading } = useGeoLocation();

  if (!geoLoading && !coords) {
    throw new Error('No coords');
  }
  if (coords === null) {
  }

  const [currentLocation, setCurrentLocation] = useState<number[]>();

  useEffect(() => {
    if (!coords) {
      return;
    }

    setCurrentLocation([coords?.longitude, coords?.latitude]);
  }, [coords]);

  return (
    <View style={styles.page}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        {geoLoading && (
          <View style={styles.overlay}>
            <LottieView
              source={require('@assets/anims/pull-to-refresh.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )}
        <MapView
          style={styles.map}
          styleURL={MAPBOX_STYLE_DARK}
          projection="mercator"
          pitchEnabled={false}
          scaleBarEnabled={false}
          attributionEnabled={false}
          logoEnabled={false}
          compassEnabled
          compassViewPosition={3}
          compassPosition={{ bottom: 75, right: 15 }}>
          <Camera
            defaultSettings={{
              centerCoordinate: [-122.420679, 37.772537],
            }}
            zoomLevel={13}
            maxZoomLevel={15}
            animationMode="flyTo"
            centerCoordinate={currentLocation}
          />
        </MapView>
        <View style={styles.searchBarView}>
          <SearchBar
            value=""
            placeholder="Search"
            round={true}
            containerStyle={styles.searchBarContainer}
          />
        </View>

        <CarouselMapCard />
      </View>
    </View>
  );
};

export default MapScreen;

import { StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';
import {
  Camera,
  CircleLayer,
  Image,
  Images,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import LocationSearchBar, {
  LocationSearchBarRef,
} from '@app/components/location-search-bar';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { PADDING } from '@app/lib';
import { Point, Feature } from 'geojson/index';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGeoLocation } from '@app/context/geo-location';
import { PingStackScreenProps } from '@ts-types/type';
import { AppIcons } from '@app/theme/icon';

export const SearchLocationScreen = () => {
  const navigation =
    useNavigation<PingStackScreenProps<'SearchLocation'>['navigation']>();
  const route = useRoute<PingStackScreenProps<'SearchLocation'>['route']>();

  const { coords: currentLocation, geoLoading } = useGeoLocation();

  const [coordinate, setCoordinate] = useState<Array<number>>([
    route.params.point?.lng,
    route.params.point?.lat,
  ]);

  const searchBarRef = useRef<LocationSearchBarRef>(null);

  const setMarkerCoordinates = ({ coordinates }: Point) => {
    setCoordinate(coordinates);
  };

  const handleSubmition = () => {
    navigation.navigate('FinalPage', {
      point: { lat: coordinate[1], lng: coordinate[0] },
    });
  };

  const circleStyle = {
    circleRadius: 200,
    circleOpacity: 0.25,
    circleStrokeColor: 'green',
    circleStrokeWidth: 1.5,
    circleStrokeOpacity: 0.25,
    circleSortKey: 1,
  };

  const circleBlurStyle = {
    circleBlur: 1,
    circleRadius: 200,
    circleOpacity: 0.25,
    circleColor: 'green',
    circleSortKey: 2,
  };

  const iconStyle = {
    iconImage: 'icon-symbol-layer',
    iconSize: 1,
  };

  const shapeFeature: Feature = {
    type: 'Feature',
    id: 'Feature-123',
    geometry: {
      type: 'Point',
      coordinates: coordinate ? coordinate : [0, 0],
    },
    properties: {},
  };

  return (
    <View style={styles.container}>
      <MapView
        styleURL={MAPBOX_STYLE_DARK}
        style={styles.map}
        projection="mercator"
        pitchEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled
        compassViewPosition={3}
        compassPosition={{ bottom: 75, right: 15 }}
        onPress={e => {
          setMarkerCoordinates(e.geometry as Point);
        }}>
        <Camera
          defaultSettings={{
            centerCoordinate: [
              currentLocation?.latitude,
              currentLocation?.longitude,
            ],
          }}
          zoomLevel={13}
          maxZoomLevel={14}
          animationMode="flyTo"
          centerCoordinate={coordinate}
        />
        <Images>
          <Image name="icon-symbol-layer">
            <IconButton icon={AppIcons.PIN} size={32} iconColor={'yellow'} />
          </Image>
        </Images>
        {coordinate !== undefined && (
          <>
            <MarkerView
              coordinate={coordinate}
              key={`MarkerView-${coordinate}`}
            />

            <ShapeSource id="ShapeSource" shape={shapeFeature}>
              <CircleLayer id="circle-border-id" style={circleStyle} />

              <CircleLayer id="circle-blur-id" style={circleBlurStyle} />

              <SymbolLayer id="symbol-id" style={iconStyle} existing />
            </ShapeSource>
          </>
        )}
      </MapView>

      <IconButton
        icon={AppIcons.ARROW_BACK}
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      />
      <LocationSearchBar
        ref={searchBarRef}
        containerStyle={styles.searchbar}
        defaultLocation={{
          lat: currentLocation.latitude,
          lng: currentLocation.longitude,
        }}
        getNewPoint={newPoint => setCoordinate([newPoint.lng, newPoint.lat])}
      />

      <IconButton
        icon={AppIcons.GPS}
        style={styles.myLocation}
        size={24}
        onPress={() =>
          setCoordinate([currentLocation.longitude, currentLocation.latitude])
        }
      />

      <Button mode="contained" style={styles.button} onPress={handleSubmition}>
        Done
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: { flex: 1, width: '100%', backgroundColor: 'black' },
  headerContainer: {
    position: 'absolute',
    top: 10,
    right: 15,
    left: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 6.5,
  },
  backButton: {
    backgroundColor: MD3Colors.neutralVariant10,
    position: 'absolute',
    top: 15,
    left: 15,
  },
  searchbar: {
    position: 'absolute',
    top: 10,
    right: 15,
    left: 75,
  },
  button: {
    // display: 'none',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginVertical: PADDING.sm,
    marginHorizontal: PADDING.sm,
  },
  myLocation: {
    position: 'absolute',
    bottom: 130,
    right: 14,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    padding: 5,
    borderRadius: 10,
  },
});

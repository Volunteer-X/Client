import { StyleSheet, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  Camera,
  CircleLayer,
  Image,
  Images,
  LocationPuck,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import LocationSearchBar, {
  LocationSearchBarRef,
} from '@app/components/location-search-bar';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { PADDING } from '@app/lib';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGeoLocation } from '@app/context/geo-location';
import { PingStackScreenProps } from '@ts-types/type';
import { AppIcons } from '@app/theme/icon';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Point, point, Position } from '@turf/helpers';

export const SearchLocationScreen = () => {
  const inset = useSafeAreaInsets();
  const navigation =
    useNavigation<PingStackScreenProps<'SearchLocation'>['navigation']>();
  const { point: lastPosition } =
    useRoute<PingStackScreenProps<'SearchLocation'>['route']>().params;

  const { coords } = useGeoLocation();

  const [currentLocation, setCurrentLocation] = useState<Position>([]);

  useEffect(() => {
    if (!coords) {
      return;
    }

    setCurrentLocation([coords?.longitude, coords?.latitude]);
  }, [coords]);

  const [coordinate, setCoordinate] = useState<Position>(lastPosition);

  const searchBarRef = useRef<LocationSearchBarRef>(null);

  const setMarkerCoordinates = (position: Position) => {
    setCoordinate(position);
  };

  const handleSubmition = () => {
    navigation.navigate('FinalPage', {
      point: coordinate,
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

  const shapeFeature = point(coordinate);

  return (
    <View style={styles.container}>
      <MapView
        styleURL={MAPBOX_STYLE_DARK}
        style={styles.map}
        projection="mercator"
        rotateEnabled={false}
        pitchEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}
        // compassViewPosition={3}
        // compassPosition={{ bottom: 100, right: 15 }}
        onPress={e => {
          setMarkerCoordinates((e.geometry as Point).coordinates);
        }}>
        <Camera
          defaultSettings={{
            centerCoordinate: [0.1276, 51.5072],
          }}
          zoomLevel={16}
          maxZoomLevel={16}
          minZoomLevel={10}
          animationMode="flyTo"
          animationDuration={10}
          centerCoordinate={coordinate}
        />
        <LocationPuck
          pulsing={{
            isEnabled: true,
          }}
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

              <SymbolLayer id="symbol-id" style={iconStyle} />
            </ShapeSource>
          </>
        )}
      </MapView>

      <View
        style={[
          styles.headerContainer,
          {
            marginTop: inset.top,
            marginStart: inset.left,
            marginEnd: inset.right,
          },
        ]}>
        <IconButton
          icon={AppIcons.ARROW_BACK}
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <LocationSearchBar
          ref={searchBarRef}
          containerStyle={styles.searchbar}
          defaultLocation={currentLocation}
          getNewPoint={newPoint => setCoordinate(newPoint)}
        />
      </View>

      <IconButton
        icon={AppIcons.GPS}
        style={styles.myLocation}
        size={24}
        onPress={() => setCoordinate([currentLocation[0], currentLocation[1]])}
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
    left: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // gap: 6.5,
  },
  backButton: {
    backgroundColor: MD3Colors.neutralVariant10,
  },
  searchbar: {},
  button: {
    // display: 'none',
    position: 'absolute',
    bottom: 20,
    left: 15,
    right: 15,
    paddingVertical: PADDING.sm,
    marginVertical: PADDING.sm,
    marginHorizontal: PADDING.sm,
  },
  myLocation: {
    position: 'absolute',
    top: 120,
    right: 15,
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    padding: 5,
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
    opacity: 0.5,

    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

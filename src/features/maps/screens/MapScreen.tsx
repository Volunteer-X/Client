import React, { useEffect, useState } from 'react';
import { View, StatusBar } from 'react-native';
import {
  Camera,
  CircleLayer,
  MapView,
  MarkerView,
  ShapeSource,
  SymbolLayer,
} from '@rnmapbox/maps';
import { IconButton, Searchbar } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAPBOX_STYLE_DARK } from '@env';
import { useGeoLocation } from '@app/context/geo-location';
import useAppTheme from '@app/hooks/useAppTheme';
import { AppIcons } from '@app/theme/icon';
import { PicksSelectView } from '@app/components';
import CarouselMapCard from '@components/carousels/Carousel';
import { circleStyle, makeStyles } from './Map.styles';
import { useAppSelector } from '@app/hooks';

const MapScreen = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  const user = useAppSelector(state => state.root.auth.user);

  const { coords, geoLoading } = useGeoLocation();

  if (!geoLoading && !coords) {
    throw new Error('No coords');
  }

  const [currentLocation, setCurrentLocation] = useState<number[]>();

  useEffect(() => {
    if (!coords) {
      return;
    }

    // console.log(coords);

    setCurrentLocation([coords?.longitude, coords?.latitude]);
  }, [coords]);

  const [picks, setPicks] = useState<string[]>(user?.picks || []);

  const point = [-0.2699972245788475, 51.41351130241327];

  return (
    <View style={styles.page}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        {geoLoading && coords && (
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
          compassEnabled={false}>
          <Camera
            zoomLevel={13}
            maxZoomLevel={15}
            animationMode="flyTo"
            centerCoordinate={currentLocation}
          />

          <MarkerView coordinate={point} key={`MarkerView-${point}`} />

          <ShapeSource
            id="ShapeSource"
            shape={{
              type: 'Feature',
              id: 'Feature-123',
              geometry: {
                type: 'Point',
                coordinates: point,
              },
              properties: {},
            }}>
            <CircleLayer id="circle-id" style={circleStyle} />

            {/* <CircleLayer id="circle-blur-id" style={circleBlurStyle} />

            <SymbolLayer id="symbol-id" style={iconStyle} existing /> */}
          </ShapeSource>
        </MapView>
        <IconButton
          icon={AppIcons.GPS}
          style={styles.myLocation}
          size={24}
          disabled={!coords}
          onPress={() => {
            if (coords) {
              setCurrentLocation([coords?.longitude, coords?.latitude]);
            }
          }}
        />
        <View style={styles.headerView}>
          <Searchbar
            mode="bar"
            value=""
            placeholder="Search"
            style={styles.searchBar}
            editable={false}
          />
          <PicksSelectView
            horizontal
            showsHorizontalScrollIndicator={false}
            chipStyle={styles.picksChip}
            chipTextStyle={styles.picksChipText}
            selectedPicks={picks}
            style={styles.picksSelectView}
            onPickSelect={selectedPicks => {
              setPicks(selectedPicks);
            }}
          />
        </View>

        <CarouselMapCard />
      </View>
    </View>
  );
};

export default MapScreen;

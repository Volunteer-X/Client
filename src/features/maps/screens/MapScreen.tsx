import React, { useEffect, useRef, useState } from 'react';
import { View, StatusBar, Text, Image as RNImage } from 'react-native';
import {
  Camera,
  Image,
  Images,
  MapView,
  ShapeSource,
  SymbolLayer,
  UserLocation,
  UserLocationRenderMode,
  UserTrackingMode,
  type ImageEntry,
} from '@rnmapbox/maps';
import { feature } from '@turf/helpers';
import { from } from 'rxjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAPBOX_STYLE_DARK } from '@env';
import { useGeoLocation } from '@app/context/geo-location';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles, mapStyle } from './Map.styles';
import { useAppSelector } from '@app/hooks';
import { useNearbyPing } from '../hooks/useNearbyPing';
import exampleIcon from '@app/assets/images/example.png';
import { Avatar } from '@app/components';
import FastImage from 'react-native-fast-image';

const MapScreen = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  const cameraRef = useRef<Camera>(null);

  const user = useAppSelector(state => state.root.auth.user);
  const { coords, geoLoading } = useGeoLocation();

  const [currentLocation, setCurrentLocation] = useState<number[]>();
  const [picks, setPicks] = useState<string[]>(user?.picks || []);

  const collection = useNearbyPing();

  const allImages: { [key: string]: string } = {
    abc: 'https://i.imgur.com/iHZtdW9_d.webp',
    bcd: 'https://i.imgur.com/6QxkGiQ_d.webp',
  };

  useEffect(() => {
    const subscribe = from([coords]);
    setCurrentLocation([coords?.longitude, coords?.latitude]);

    return () => {};
  }, [coords]);

  // const collection: GeoJSON.FeatureCollection = featureCollection([
  //   point([-0.2699972245788475, 51.41351130241327]),
  // ]);

  const onPress = (e: GeoJSON.Feature) => {
    console.log('e', e.geometry);

    const aFeature = feature(e.geometry);
    aFeature.id = `${Date.now()}`;

    console.log('aFeature', aFeature);
  };

  return (
    <View style={styles.page}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      />
      <View style={styles.container}>
        {/* {geoLoading && coords && (
          <View style={styles.overlay}>
            <LottieView
              source={require('@assets/anims/pull-to-refresh.json')}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        )} */}

        <MapView
          style={styles.map}
          styleURL={MAPBOX_STYLE_DARK}
          projection="mercator"
          pitchEnabled={false}
          scaleBarEnabled={false}
          attributionEnabled={false}
          logoEnabled={false}
          compassEnabled={false}
          onPress={onPress}>
          <Camera
            ref={cameraRef}
            defaultSettings={{
              centerCoordinate: [-77.036086, 38.910233],
              // zoomLevel: 13,
            }}
            zoomLevel={13}
            maxZoomLevel={15}
            animationMode="flyTo"
            followUserLocation={true}
            followUserMode={UserTrackingMode.Follow}
          />
          <UserLocation renderMode={UserLocationRenderMode.Native} />

          <ShapeSource
            id="symbolLocationSource"
            hitbox={{ width: 20, height: 20 }}
            shape={collection}>
            <SymbolLayer
              id="symbolLocationSymbols"
              minZoomLevel={1}
              style={mapStyle.icon}
            />

            <Images>
              {Object.entries(allImages).map(([key, value]) => {
                // console.log(value);

                return (
                  <Image name={key} key={key}>
                    <View>
                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: 'gray',
                          padding: 8,
                          margin: 16,
                          width: 100,
                          shadowOffset: { width: 0, height: 8 },
                          shadowOpacity: 0.2,
                        }}>
                        <RNImage
                          source={exampleIcon}
                          resizeMode="cover"
                          style={{
                            // width: 100,
                            // height: 100,
                            backgroundColor: 'red',
                          }}
                        />
                        <Text style={{ fontWeight: 'bold', color: 'white' }}>
                          RN Pin 3
                        </Text>
                      </View>
                    </View>
                  </Image>
                );
              })}
            </Images>
          </ShapeSource>
        </MapView>
        {/* <IconButton
          icon={AppIcons.GPS}
          style={styles.myLocation}
          size={24}
          disabled={!coords}
          onPress={() => {
            if (coords) {
              setCurrentLocation([coords?.longitude, coords?.latitude]);
            }
          }}
        /> */}
        {/* <View style={styles.headerView}>
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
        </View> */}

        {/* <CarouselMapCard /> */}
      </View>
    </View>
  );
};

export default MapScreen;

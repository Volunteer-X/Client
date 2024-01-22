import React, { useRef } from 'react';
import { View, StatusBar } from 'react-native';
import {
  Camera,
  Images,
  LocationPuck,
  MapView,
  ShapeSource,
  SymbolLayer,
  UserTrackingMode,
} from '@rnmapbox/maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MAPBOX_STYLE_DARK } from '@env';
import { useGeoLocation } from '@app/context/geo-location';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles, mapStyle } from './Map.styles';
import { useAppSelector } from '@app/hooks';
import { useNearbyPing } from '../hooks/useNearbyPing';
import marker from '@app/assets/images/marker.png';
import {
  ActivityBottomSheet,
  ActivityBottomSheetRef,
} from '@app/components/bottom-sheets';
import { Activity, User } from '@app/types/entities';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const MapScreen = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const styles = makeStyles(theme, inset);

  const navigation = useNavigation();

  const cameraRef = useRef<Camera>(null);
  const activityModalRef = useRef<ActivityBottomSheetRef>(null);

  const user = useAppSelector(state => state.root.auth.user);
  const { coords } = useGeoLocation();

  useEffect(() => {
    cameraRef.current?.setCamera({
      centerCoordinate: [coords?.longitude, coords?.latitude],
      zoomLevel: 13,
    });
  }, [coords?.latitude, coords?.longitude]);

  const { collection } = useNearbyPing({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  const handleOnBottomSheetPress = () => {
    console.log('handleOnBottomSheetPress', activityModalRef.current?.data);
    activityModalRef.current?.close();

    navigation.navigate('ActivityNavigation', {
      screen: 'ActivityScreen',
      params: {
        activity: activityModalRef.current?.data.activity,
        owner: activityModalRef.current?.data.creator,
      },
    });
  };

  const onSourceLayerPress = (e: any) => {
    const selectedFeature: GeoJSON.Feature = e.features[0];

    if (!selectedFeature.properties) {
      return;
    }

    let activity: Activity = selectedFeature.properties.activity;
    let creator: User = selectedFeature.properties.creator;

    if (!activity || !creator) {
      return;
    }

    activityModalRef.current?.openModal(activity, creator);
  };

  return (
    <View style={styles.page}>
      {/* <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={theme.dark ? 'light-content' : 'dark-content'}
      /> */}
      {/* <View style={styles.container}> */}
      <ActivityBottomSheet
        ref={activityModalRef}
        onPress={handleOnBottomSheetPress}
      />
      <MapView
        style={styles.map}
        styleURL={MAPBOX_STYLE_DARK}
        projection="mercator"
        rotateEnabled={false}
        pitchEnabled={false}
        scaleBarEnabled={false}
        attributionEnabled={false}
        logoEnabled={false}
        compassEnabled={false}>
        <Camera
          ref={cameraRef}
          zoomLevel={13}
          minZoomLevel={14}
          maxZoomLevel={10}
          animationMode="flyTo"
          followZoomLevel={13}
          followUserLocation={true}
          followUserMode={UserTrackingMode.Follow}
        />

        <LocationPuck pulsing={{ isEnabled: true }} />

        <ShapeSource
          id="symbolLocationSource"
          hitbox={{ width: 20, height: 20 }}
          shape={collection}
          onPress={e => onSourceLayerPress(e)}>
          <SymbolLayer
            id="symbolLocationSymbols"
            minZoomLevel={1}
            style={mapStyle.icon}
          />

          <Images images={{ icon: marker }} />
        </ShapeSource>
      </MapView>
      {/* </View> */}
    </View>
  );
};

export default MapScreen;

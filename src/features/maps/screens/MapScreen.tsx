import React, { useCallback, useRef } from 'react';
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
import { ActivityIndicator, FAB, IconButton } from 'react-native-paper';
import { AppIcons } from '@app/theme/icon';
import { useHeaderHeight } from '@react-navigation/elements';
import { Position } from '@turf/helpers';
import LinearGradient from 'react-native-linear-gradient';
import IconFAB from '../components/IconFAB';

const MapScreen = () => {
  const { theme } = useAppTheme();
  const inset = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const styles = makeStyles(theme, inset, headerHeight);

  const navigation = useNavigation();

  const cameraRef = useRef<Camera>(null);
  const activityModalRef = useRef<ActivityBottomSheetRef>(null);

  const { user, accessToken } = useAppSelector(state => state.root.auth);
  const { coords } = useGeoLocation();

  const { collection, loading, refetch } = useNearbyPing({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  const [myLocation, setMyLocation] = React.useState<Position>([
    coords.longitude,
    coords.latitude,
  ]);

  useEffect(() => {
    setMyLocation([coords.longitude, coords.latitude]);
  }, [coords.latitude, coords.longitude]);

  useEffect(() => {
    cameraRef.current?.setCamera({
      centerCoordinate: myLocation,
      zoomLevel: 14,
    });
  }, [myLocation]);

  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  const handleMyLocation = useCallback(() => {
    setMyLocation([coords.longitude, coords.latitude]);
  }, [coords.latitude, coords.longitude]);

  const handleOnBottomSheetPress = () => {
    activityModalRef.current?.close();

    navigation.navigate('ActivityNavigation', {
      screen: 'ActivityScreen',
      params: {
        activityID: activityModalRef.current?.data.activity.id,
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

  const navigateToPingScreen = () => {
    navigation.navigate('Ping', {
      screen: 'FinalPage',
      params: {
        point: [coords.longitude, coords.latitude],
      },
    });
  };

  return (
    <View style={styles.page}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <ActivityBottomSheet
        ref={activityModalRef}
        onPress={handleOnBottomSheetPress}
      />
      {false && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size={64} />
        </View>
      )}
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
          centerCoordinate={myLocation}
          zoomLevel={14}
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
      <View style={styles.actionContainers}>
        <IconButton
          icon={AppIcons.GPS}
          style={styles.myLocation}
          onPress={handleMyLocation}
        />
        <IconButton
          icon={AppIcons.REFRESH}
          style={styles.refresh}
          onPress={handleRefresh}
        />
      </View>
      <View style={styles.FABContainer}>
        <IconFAB
          colors={['#FCDBCA', '#E6A5CC', '#D5B3E8']}
          icon={AppIcons.PING}
          color="#A633E9"
          style={{ marginBottom: 10 }}
          onPress={navigateToPingScreen}
        />
        <IconFAB
          colors={['#FCDBCA', '#E6A5CC', '#D5B3E8']}
          icon={AppIcons.FILTER}
          color="#FFF"
          onPress={() => {}}
        />
        <IconFAB
          colors={['#FCDBCA', '#E6A5CC', '#D5B3E8']}
          icon={AppIcons.ACTIVITY}
          color="#A633E9"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default MapScreen;

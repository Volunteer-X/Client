import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import GeoLocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

const initialLocation: GeoCoordinates = {
  latitude: 0,
  longitude: 0,
  accuracy: 5,
  altitude: 0,
  heading: 0,
  speed: 0,
};

const GeoLocationContext = createContext<GeoCoordinates>(initialLocation);

export const useGeoLocation = () => {
  const contextValue = useContext(GeoLocationContext);
  if (contextValue === undefined) {
    throw new Error(
      "'useGeoLocation must be used within a GeoLocationProvider",
    );
  }
  return contextValue;
};

export const GeoLocationProvider = ({ children }: any) => {
  const [coords, setCoords] = useState<GeoCoordinates>(initialLocation);

  const getLocationPermission = useCallback(async () => {
    const status = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );

    return status;
  }, []);

  useEffect(() => {
    getLocationPermission()
      .then(status => {
        if (status === 'granted') {
          GeoLocation.getCurrentPosition(
            position => {
              setCoords(position.coords);
            },
            error => {
              console.log(error.message);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        }
      })
      .catch(e => console.error(e));
  }, [coords.latitude, coords.longitude, getLocationPermission]);

  return (
    <GeoLocationContext.Provider value={coords}>
      {children}
    </GeoLocationContext.Provider>
  );
};

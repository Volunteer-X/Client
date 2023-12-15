import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import GeoLocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

type ContextType = {
  coords?: GeoCoordinates;
  geoLoading: boolean;
  geoError?: any;
};

const initialLocation: ContextType = {
  geoLoading: true,
};

const GeoLocationContext = createContext<ContextType>(initialLocation);

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
  const [coords, setCoords] = useState<GeoCoordinates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [geoError, setGeoError] = useState<any>(null);

  const getLocationPermission = useCallback(async () => {
    const status = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );

    // console.log('status', status);

    return status;
  }, []);

  useEffect(() => {
    getLocationPermission()
      .then(res => {
        if (res === 'granted') {
          GeoLocation.getCurrentPosition(
            position => {
              setCoords(position.coords);
            },
            err => {
              setGeoError(err);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        }
      })
      .catch(err => {
        console.error(err);
        setGeoError(err);
      })
      .finally(() => setLoading(false));

    const watchID = GeoLocation.watchPosition(
      position => {
        setCoords(position.coords);
      },
      err => {
        setGeoError(err);
      },
      { enableHighAccuracy: true },
    );

    return () => {
      GeoLocation.clearWatch(watchID);
    };
  }, [getLocationPermission, loading]);

  const value = {
    coords: coords as GeoCoordinates,
    geoLoading: loading,
    geoError,
  };

  return (
    <GeoLocationContext.Provider value={value}>
      {children}
    </GeoLocationContext.Provider>
  );
};

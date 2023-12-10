import React, { useCallback, useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import GeoLocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

type ContextType = {
  coords: GeoCoordinates | null;
  geoLoading: boolean;
};

const initialLocation: ContextType = {
  coords: null,
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
              setLoading(false);
            },
            error => {
              console.log(error.message);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
          );
        }
      })
      .catch(e => {
        console.error(e);
        setLoading(false);
      });
  }, [getLocationPermission]);

  return (
    <GeoLocationContext.Provider value={{ coords, geoLoading: loading }}>
      {children}
    </GeoLocationContext.Provider>
  );
};

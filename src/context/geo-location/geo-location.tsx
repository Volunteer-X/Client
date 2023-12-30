import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { createContext, useContext } from 'react';
import GeoLocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';
import {
  BehaviorSubject,
  catchError,
  finalize,
  from,
  Observable,
  of,
  switchMap,
} from 'rxjs';

type ContextType = {
  coords: GeoCoordinates;
  geoLoading: boolean;
  geoError?: any;
};

const initialLocation: ContextType = {
  coords: {
    latitude: 51.5072,
    longitude: 0.1276,
    altitude: 0,
    accuracy: 0,
    altitudeAccuracy: 0,
    heading: 0,
    speed: 0,
  },
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
  const [coords, setCoords] = useState<GeoCoordinates>(initialLocation.coords);
  const [loading, setLoading] = useState<boolean>(true);
  const [geoError, setGeoError] = useState<any>(null);

  const locationSubject = useMemo(
    () => new BehaviorSubject<GeoCoordinates>(initialLocation.coords),
    [],
  );

  const getLocationPermission = async () => {
    const status = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    return status;
  };

  const getLocation$ = useMemo(
    () =>
      from(getLocationPermission()).pipe(
        switchMap(permissionStatus => {
          if (permissionStatus === 'granted') {
            return new Promise<GeoCoordinates>((resolve, reject) => {
              GeoLocation.getCurrentPosition(
                position => resolve(position.coords),
                err => reject(err),
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
              );
            });
          } else {
            throw new Error('Location permission not granted');
          }
        }),
        catchError(error => {
          setGeoError(error);
          return of(initialLocation.coords);
        }),
      ),
    [],
  );

  const watchLocation$ = useMemo(
    () =>
      new Observable<GeoCoordinates | null>(observer => {
        const watchID = GeoLocation.watchPosition(
          position => observer.next(position.coords),
          err => {
            setGeoError(err);
            observer.next(initialLocation.coords);
          },
          { enableHighAccuracy: true },
        );

        return () => {
          GeoLocation.clearWatch(watchID);
        };
      }),
    [],
  );

  useEffect(() => {
    const subscription = getLocation$
      .pipe(finalize(() => setLoading(false)))
      .subscribe(setCoords);

    const watchSubscription = watchLocation$.subscribe(position => {
      if (position) {
        locationSubject.next(position);
      }
    });

    return () => {
      subscription.unsubscribe();
      watchSubscription.unsubscribe();
    };
  }, [getLocation$, locationSubject, watchLocation$]);

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

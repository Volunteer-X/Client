import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import { check, PERMISSIONS } from 'react-native-permissions';
import { Platform } from 'react-native';

// ! Not in use --- Use useGeoLocation instead
export const getCurrentLocation =
  async (): Promise<Geolocation.GeoCoordinates | null> => {
    let coords: GeoCoordinates;

    const permissionStatus = await check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
    );
    if (permissionStatus === 'granted') {
      console.log('here::', permissionStatus);

      Geolocation.getCurrentPosition(
        position => {
          coords = position.coords;
          console.log('Current Position', coords.latitude, coords.longitude);
          return coords;
        },
        error => {
          console.log(error.message);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );

      return null;
    } else {
      throw new Error('Permissions denied');
    }
  };

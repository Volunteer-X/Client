import { requestPermission, PLATFORM_PERMISSIONS } from './permissions';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';

export const getCurrentLocation =
  async (): Promise<Geolocation.GeoCoordinates | null> => {
    let coords: GeoCoordinates;
    const permission = requestPermission({
      permission: PLATFORM_PERMISSIONS.ACCESS_COARSE_LOCATION,
    });
    if (await permission) {
      Geolocation.getCurrentPosition(position => {
        coords = position.coords;
        return coords;
      });
    }

    return null;
  };

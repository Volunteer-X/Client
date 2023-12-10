import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import GeoLocation, { GeoCoordinates } from 'react-native-geolocation-service';

export interface CurrentLocationState {
  latitude: number;
  longitude: number;
  error?: any;
}

const initialState: CurrentLocationState = {
  latitude: 0,
  longitude: 0,
};

export const currentLocationSlice = createSlice({
  name: 'currentLocation',
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<GeoCoordinates>) => {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
  },
});
export const fetchCurrentLocation = () => async (dispatch: any) => {
  try {
    const coords = await new Promise<GeoCoordinates>((resolve, reject) => {
      GeoLocation.getCurrentPosition(
        position => {
          resolve(position.coords);
          dispatch(setCurrentLocation(coords));
        },
        error => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    });
  } catch (error) {}
};

export const { setCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

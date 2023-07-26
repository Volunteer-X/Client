import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GeoCoordinates } from 'react-native-geolocation-service';

export interface CurrentLocationState {
  latitude: number;
  longitude: number;
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
export const setCurrentLocationAsync =
  (coords: Promise<GeoCoordinates | null>) => async (dispatch: any) => {
    dispatch(await setCurrentLocation(coords));
  };

export const { setCurrentLocation } = currentLocationSlice.actions;

export default currentLocationSlice.reducer;

// import { array } from "yup";

import { Point } from 'react-native-google-places-autocomplete';

export function shuffleArray<T>(array: Array<T>) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export const swapPointElements = (point?: Point) => {
  if (point !== undefined) {
    return [point.lng, point.lat];
  }
  return undefined;
};

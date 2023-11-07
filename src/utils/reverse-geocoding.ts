import axios, { AxiosResponse } from 'axios';

import { Point } from '@app/types/utility-types';
import { MAPBOX_API } from '@env';

interface Response {
  type: string;
  query: number[];
  features: Feature[];
  attribution: string;
}

interface Feature {
  id: string;
  type: string;
  place_type: string[];
  relevance: number;
  properties: Properties;
  text: string;
  place_name: string;
  center: number[];
  geometry: Geometry;
  context: Context[];
}
export interface Properties {
  foursquare: string;
  landmark: boolean;
  address: string;
  category: string;
}

interface Geometry {
  coordinates: number[];
  type: string;
}

interface Context {
  id: string;
  mapbox_id: string;
  wikidata?: string;
  text: string;
  short_code?: string;
}

function formatAddress(context: Context[]): string {
  let formattedAddress = context
    .filter(val => {
      let type = val.id.split('.')[0];
      if (type === 'locality' || type === 'country') {
        return val;
      }
    })
    .map(val => {
      let type = val.id.split('.')[0];
      if (type === 'locality') {
        return val.text;
      } else if (type === 'country') {
        return val.short_code?.toUpperCase();
      }
    })
    .join(', ');

  return formattedAddress;
}

// ! Bug Possible crash due to invalid Point
export const getReverseGeocoding = async (coords: Point) => {
  const baseUrl = 'https://api.mapbox.com/geocoding/v5' as const;

  enum endpoint {
    PLACES = 'mapbox.places',
    PERMENANT_PLACES = 'mapbox.places-permanent',
  }

  let url = `${baseUrl}/${endpoint.PLACES}/${coords.lng},${coords.lat}.json?access_token=${MAPBOX_API}`;
  // console.log(url);

  const response: AxiosResponse<Response, any> = await axios.get(url);

  if (response.status === 200) {
    if (response.data.features[0]) {
      return formatAddress(response.data.features[0].context);
    }
    return '';
  } else {
    throw new Error('Fetch failed');
  }
};

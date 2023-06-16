import { Text } from '@rneui/themed';
import React from 'react';
import { Image, PixelRatio } from 'react-native';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';

interface GoogleStaticMapsProps {
  center?: string;
  latitude: string;
  longitude: string;
  zoom: number;
  size: Size;
  scale?: 1 | 2;
  format?: 'png' | 'png32' | 'gif' | 'jpg' | 'jpg-baseline';
  mapType?: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  language?: string;
  region?: string;
  apiKey: string;
  signature?: string;
  onError: Function;
  onLoad: Function;
  blur?: number;
  mapID?: string;
  mapStyle?: Array<MapStyle>;
  path?: Array<Path>;
  pathStyle: Partial<PathStyle>;
}

interface MapStyle {
  feature?: string;
  element?: string;
  elementStyle: Partial<ElementStyle>;
}

interface ElementStyle {
  hue: string;
  lightness: number;
  saturation: number;
  gamma: number;
  invertLightness: boolean;
  visibility: 'on' | 'off' | 'simplified';
  color: string;
  weight: number;
}

interface Size {
  width: number;
  height: number;
}

interface Path {
  pathLatitude: string;
  pathLongitude: string;
}

interface PathStyle {
  weigth: number;
  color:
    | string
    | 'black'
    | 'brown'
    | 'green'
    | 'purple'
    | 'yellow'
    | 'blue'
    | 'gray'
    | 'orange'
    | 'red'
    | 'white';
  fillColor: string;
  geodesic: boolean;
}

const defaultScale = () => {
  let isRetina = PixelRatio.get() >= 2;
  return isRetina ? 2 : 1;
};

const GoogleStaticMaps = ({
  center,
  latitude,
  longitude,
  zoom = 12,
  size,
  scale = 1,
  format = 'png',
  mapType = 'roadmap',
  language,
  region,
  mapID,
  mapStyle,
  apiKey,
  blur = 0,
  path,
  pathStyle,
  signature,
  onError = () => {},
  onLoad = () => {},
}: GoogleStaticMapsProps) => {
  const root = 'https://maps.googleapis.com/maps/api/staticmap';

  const getStaticMapUrl = () => {
    let uri = new URL(root);
    let params = new URLSearchParams();

    //Center
    center
      ? params.append('center', center)
      : params.append('center', `${latitude},${longitude}`);

    //Zoom
    params.append('zoom', `${zoom}`);

    //Scale
    params.append('scale', scale.toString());

    //size
    let { width, height } = size;
    params.append('size', `${width}x${height}`);

    // MapType
    params.append('maptype', mapType);

    // format
    params.append('format', format);

    // Language
    language ? params.append('language', language) : null;

    // Region
    region ? params.append('region', region) : null;

    // Map Style
    mapID
      ? params.append('map_id', mapID)
      : mapStyle && mapStyle.length === 0
      ? params.append('', '')
      : null;

    // path=pathStyles|pathLocation1|pathLocation2|...
    // Path
    if (path) {
      let pathStyleUri = '';
      let pathLocations = path
        .map(item => `${item.pathLatitude},${item.pathLongitude}`)
        .join('|');
      if (pathStyle) {
        pathStyle.color ? (pathStyleUri += `color:${pathStyle.color}`) : '';
        pathStyle.color
          ? (pathStyleUri += `fillcolor:${pathStyle.fillColor}`)
          : '';
        pathStyle.color
          ? (pathStyleUri += `geodesic:${pathStyle.geodesic}`)
          : '';
        pathStyle.color ? (pathStyleUri += `weight:${pathStyle.weigth}`) : '';
      }

      // params.append('path', pathStyle);
    }

    // API
    params.append('key', apiKey);

    uri.search = params.toString();

    // console.log(`uri:: ${decodeURI(uri.href)}`);
    // console.log(`uri-encoded:: ${encodeURI(uri.href)}`);

    return uri.href;
  };

  return (
    <>
      <Image
        style={{ flex: 1 }}
        source={{
          uri: getStaticMapUrl(),
        }}
        blurRadius={blur}
      />
    </>
  );
};

export default GoogleStaticMaps;

import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import React, { forwardRef, Ref, useImperativeHandle, useState } from 'react';
import { MAP_API_KEY } from '@env';
import {
  GooglePlacesAutocomplete,
  Point,
} from 'react-native-google-places-autocomplete';
import { MD3Colors, TextInput } from 'react-native-paper';

export type LocationSearchBarRef = {
  getPoint?: (point: Point) => Point | undefined;
  point: Point | undefined;
};

// Todo - Complete styling the search bar
const LocationSearchBar = forwardRef(
  (
    {
      containerStyle,
    }: {
      containerStyle: StyleProp<ViewStyle>;
    },
    ref?: Ref<LocationSearchBarRef>,
  ) => {
    const styles = makeStyle({ container: containerStyle });

    const [point, setPoint] = useState<Point>();

    // const _getPoint = (_point: Point | undefined) => {
    //   setPoint(_point);
    //   return point;
    // };

    useImperativeHandle(ref, () => ({
      // getPoint: _getPoint,
      point,
    }));

    return (
      <>
        <GooglePlacesAutocomplete
          styles={styles.googlePlacesAutocomplete}
          placeholder="Search"
          fetchDetails
          // currentLocation
          query={{
            key: MAP_API_KEY,
            language: 'en-GB',
          }}
          textInputProps={{
            InputComp: TextInput,
            // left: <TextInput.Icon icon={'magnify'} size={24} disabled />,
            mode: 'outlined',
            outlineColor: 'transparent',
            activeOutlineColor: 'transparent',
            selectionColor: 'white',
            // dense: true,
            outlineStyle: { borderRadius: 15 },
            style: {
              width: '100%',
              height: 50,
              // textAlign: 'center',
              fontSize: 14,
            },
          }}
          onPress={(data, details) => setPoint(details?.geometry.location)}
        />
      </>
    );
  },
);

export default LocationSearchBar;

const makeStyle = ({ container }: { container: StyleProp<ViewStyle> }) =>
  StyleSheet.create({
    googlePlacesAutocomplete: {
      container,
      textInputContainer: {
        flexDirection: 'row',
      },
      // textInput: {
      //   backgroundColor: MD3Colors.neutralVariant0,
      //   height: 44,
      //   borderRadius: 5,
      //   paddingVertical: 5,
      //   paddingHorizontal: 10,
      //   fontSize: 100,
      //   flex: 1,
      // },
      poweredContainer: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        // borderColor: 'black',
        // borderTopWidth: 0.5,
        backgroundColor: MD3Colors.neutralVariant10,
      },
      powered: {
        // display: 'none',
      },
      listView: {
        paddingTop: 5,
      },
      row: {
        backgroundColor: MD3Colors.neutralVariant10,
        padding: 13,
        height: 44,
        flexDirection: 'row',
        borderTopEndRadius: 5,
        borderTopStartRadius: 5,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
      },
      separator: {
        height: 0.5,
        backgroundColor: '#c8c7cc',
      },
      description: {},
      loader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: 20,
      },
    },
  });

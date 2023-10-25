import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import React from 'react';
import { MAP_API_KEY } from '@env';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { TextInput } from 'react-native-paper';

// Todo - Complete styling the search bar
const LocationSearchBar = ({ containerStyle }: { containerStyle: StyleProp<ViewStyle> }) => {
  return (
    <View style={containerStyle}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: MAP_API_KEY,
          language: 'en-GB',
        }}
        textInputProps={{
          InputComp: TextInput,
        }}
        onPress={(data, details) => {
          console.log(data, details);
        }}
      />
    </>
  );
};

export default LocationSearchBar;

const styles = StyleSheet.create({});

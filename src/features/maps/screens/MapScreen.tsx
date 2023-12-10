import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/base';
import CarouselMapCard from '@components/carousels/Carousel';
import { MapView } from '@rnmapbox/maps';
import { MAPBOX_STYLE_DARK } from '@env';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './Map.styles';

const MapScreen = () => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  return (
    <>
      <MapView style={styles.map} styleURL={MAPBOX_STYLE_DARK} />
      <View style={styles.searchBarView}>
        <SearchBar
          value=""
          placeholder="Search"
          round={true}
          containerStyle={styles.searchBarContainer}
        />
      </View>
      <View style={styles.cardContainer}>
        <CarouselMapCard />
      </View>
    </>
  );
};

export default MapScreen;

import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import Carousel from 'react-native-reanimated-carousel';

const colors = [
  '#26292E',
  '#899F9C',
  '#B3C680',
  '#5C6265',
  '#F5D399',
  '#F1F1F1',
];

const CarouselMapCard = () => {
  return (
    <Carousel
      width={Dimensions.get('window').width * 0.86}
      height={Dimensions.get('window').height * 0.6}
      style={styles.carousel}
      snapEnabled
      mode="parallax"
      modeConfig={{ parallaxScrollingScale: 0.9, parallaxScrollingOffset: 50 }}
      data={colors}
      renderItem={() => <Text>Hello World</Text>}
    />
  );
};

const styles = StyleSheet.create({
  carousel: {
    width: Dimensions.get('window').width * 0.86,
  },
});

export default CarouselMapCard;

import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import NearbyActivityCardView from '../NearbyActivityCardView';
import { mapViewCardData } from '../../lib/constants/data';

const CarouselMapCard = () => {
  return (
    <View style={styles.container}>
      <Carousel
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height * 0.3}
        style={styles.carousel}
        snapEnabled
        mode="parallax"
        loop={false}
        modeConfig={{
          parallaxScrollingScale: 0.85,
          parallaxScrollingOffset: 175,
        }}
        data={mapViewCardData}
        renderItem={({ item }) => (
          <NearbyActivityCardView
            mapSnapshotSource={item.source}
            userName={item.userName}
            activityName={item.activityName}
            activityFollowers={item.activityFollowers}
            activityCreatedOn={item.activityCreatedOn}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  carousel: { width: Dimensions.get('window').width * 1 },
});

export default CarouselMapCard;

import * as React from 'react';
import { View } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import NearbyActivityCardView from '../NearbyActivityCardView';
import { mapViewCardData } from '../../lib/constants/mock-data';
import { makeStyles } from './Carousel.styles';
import { DIMENSIONS } from '@app/lib';

const CarouselMapCard = () => {
  const styles = makeStyles();

  return (
    <View style={styles.container}>
      <Carousel
        width={DIMENSIONS.fullWidth}
        height={DIMENSIONS.fullHeight * 0.3}
        style={styles.carousel}
        vertical={false}
        snapEnabled
        mode="parallax"
        loop={false}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 100,
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

export default CarouselMapCard;

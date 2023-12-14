import { Media } from '@app/__generated__/gql/graphql';
import React, { useCallback, useState } from 'react';
import { ListRenderItem, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import SwiperFlatlist from '../swiper-flatlist';
import { SwiperFlatlistProps } from '../swiper-flatlist.props';
import { MediaViewRenderItem } from './media-view-renderItem';

interface MediaViewProps extends SwiperFlatlistProps<Media> {
  media: ({
    __typename?: 'Media' | undefined;
    key: string;
    type: string;
  } | null)[];
}

export const MediaView = ({ media, ...props }: MediaViewProps) => {
  const [calculatedWidth, setCalculatedWidth] = useState(0);

  // const styles = makeStyles(calculatedWidth);
  // console.log('media', media);

  const _renderItem: ListRenderItem<Media> = useCallback(
    ({ item }) => (
      <MediaViewRenderItem media={item} calculatedWidth={calculatedWidth} />
    ),
    [calculatedWidth],
  );

  return (
    <>
      {/* {true ? (
        <View
          style={{
            height: 200,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator />
        </View>
      ) : ( */}
      <View
        onLayout={event => setCalculatedWidth(event.nativeEvent.layout.width)}>
        <SwiperFlatlist
          data={media}
          showPagination
          keyExtractor={item => item?.key}
          {...props}
          renderItem={_renderItem}
        />
      </View>
      {/* )} */}
    </>
  );
};

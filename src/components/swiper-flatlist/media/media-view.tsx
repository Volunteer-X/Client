import { VideoPlayer } from '@app/components';
import { useS3Download } from '@app/hooks/useS3Download';
import { AppMediaTypes, HEIGHTS } from '@app/lib';
import { Media } from '@app/__generated__/gql/graphql';
import React, { useCallback, useState } from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { ActivityIndicator } from 'react-native-paper';
import SwiperFlatlist from '../swiper-flatlist';
import { SwiperFlatlistProps } from '../swiper-flatlist.props';
import { MediaViewRenderItem } from './media-view-renderItem';
import { makeStyles } from './media-view.style';

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

  const _renderItem: ListRenderItem<Media> = useCallback(
    ({ item }) => (
      <MediaViewRenderItem media={item} calculatedWidth={calculatedWidth} />
    ),
    [calculatedWidth],
  );

  return (
    <>
      {false ? (
        <ActivityIndicator />
      ) : (
        <View
          onLayout={event =>
            setCalculatedWidth(event.nativeEvent.layout.width)
          }>
          <SwiperFlatlist
            data={media}
            showPagination
            keyExtractor={item => item?.key}
            {...props}
            renderItem={_renderItem}
          />
        </View>
      )}
    </>
  );
};

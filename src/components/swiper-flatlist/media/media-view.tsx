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

interface MediaViewProps extends SwiperFlatlistProps<Media> {
  media: ({
    __typename?: 'Media' | undefined;
    key: string;
    type: string;
  } | null)[];
}

export const MediaView = ({ media, ...props }: MediaViewProps) => {
  const [calculatedWidth, setCalculatedWidth] = useState(0);

  const styles = makeStyles(calculatedWidth);

  const { urls, isDownloading } = useS3Download(media);

  // console.log('MediaView urls', urls);

  const _renderItem: ListRenderItem<{ uri: string; type: string }> =
    useCallback(
      ({ item }) => {
        // Convert item to apporpriate type
        const type = item.type.split('/')[0];

        switch (type) {
          case AppMediaTypes.IMAGE.toLowerCase():
            return (
              <View style={styles.renderItemContainer}>
                <FastImage
                  source={{ uri: item.uri }}
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.renderItemMedia}
                />
              </View>
            );
          case AppMediaTypes.VIDEO.toLowerCase():
            return (
              <View style={styles.renderItemContainer}>
                <VideoPlayer
                  source={{ uri: item.uri }}
                  style={styles.renderItemMedia}
                  muted
                  resizeMode="cover"
                />
              </View>
            );
          default:
            return <></>;
        }
      },
      [styles.renderItemContainer, styles.renderItemMedia],
    );

  return (
    <>
      {isDownloading ? (
        <ActivityIndicator />
      ) : (
        <View
          onLayout={event =>
            setCalculatedWidth(event.nativeEvent.layout.width)
          }>
          <SwiperFlatlist
            data={media}
            showPagination
            {...props}
            renderItem={_renderItem}
          />
        </View>
      )}
    </>
  );
};

const makeStyles = (calculatedWidth: number) =>
  StyleSheet.create({
    renderItemContainer: {
      flexDirection: 'column',
      width: calculatedWidth,
      justifyContent: 'flex-start',
    },
    renderItemMedia: {
      height: HEIGHTS.postMedia,
      width: '100%',
    },
  });

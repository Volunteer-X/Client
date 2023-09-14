import React, { useCallback } from 'react';
import { Dimensions, ListRenderItem, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import SwiperFlatlist from '../swiper-flatlist';
import { MediaFlatlistProps } from './media-flatlist.props';
import { AppMediaTypes, HEIGHTS, SIZES } from '@app/lib';
import { VideoPlayer } from '@app/components/video-player';

type T = any;
const { width } = Dimensions.get('window');

function getType(str: string): string {
  return str.split('/')[0];
}

/*
  Todo Setup onclick, preview function for the media, delete option 
*/
const MediaFlatlist = ({
  assets,
  paddingOffset = 0,
}: MediaFlatlistProps<T>) => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme, paddingOffset);

  const _renderItem: ListRenderItem<{ uri: string; type: string }> =
    useCallback(
      ({ item, index }) => {
        switch (item.type) {
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
      [styles],
    );

  const listData = assets?.map(asset => ({
    uri: asset.uri ? asset.uri : '',
    type: asset.type ? getType(asset.type) : '',
  }));

  return (
    <>
      <SwiperFlatlist
        style={{}}
        data={listData}
        showPagination
        renderItem={_renderItem}
      />
    </>
  );
};

export default MediaFlatlist;

const makeStyles = (theme: AppTheme, paddingOffset: number) =>
  StyleSheet.create({
    renderItemContainer: {
      flexDirection: 'column',
      width: width - 2 * paddingOffset,
      justifyContent: 'flex-start',
    },
    renderItemMedia: {
      height: HEIGHTS.postMedia,
      width: '100%',
      borderRadius: SIZES.medium,
    },
  });

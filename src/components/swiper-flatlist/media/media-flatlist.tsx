import React, { useCallback } from 'react';
import { Dimensions, ListRenderItem, StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text } from 'react-native-paper';
import Video from 'react-native-video';

import useAppTheme from '@hooks/useAppTheme';
import { AppTheme } from '@app/theme';
import SwiperFlatlist from '../swiper-flatlist';
import { MediaFlatlistProps } from './media-flatlist.props';
import { AppMediaTypes, SIZES } from '@app/lib';
import { createThumbnail } from 'react-native-create-thumbnail';
import { VideoPlayer } from '@app/components/video-player';

type T = any;
const { width } = Dimensions.get('window');

function getType(str: string): string {
  return str.split('/')[0];
}

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
                  style={{
                    height: 200,
                    width: '100%',
                  }}
                />
              </View>
            );
          case AppMediaTypes.VIDEO.toLowerCase():
            return (
              <View style={styles.renderItemContainer}>
                <VideoPlayer
                  source={{ uri: item.uri }}
                  style={{ height: 200, width: '100%' }}
                  paused
                  muted
                  resizeMode="cover"
                />
              </View>
            );
        }
      },
      [styles],
    );

  const listData = assets?.map(asset => ({
    uri: asset.uri ? asset.uri : '',
    type: asset.type ? getType(asset.type) : '',
  }));

  // console.log('🚀 ~ file: media-flatlist.tsx:23 ~ listData:', listData);

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
  });

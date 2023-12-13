import { VideoPlayer } from '@app/components';
import { useS3Download } from '@app/hooks/useS3Download';
import { AppMediaTypes, HEIGHTS } from '@app/lib';
import { Media } from '@app/__generated__/gql/graphql';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type Props = {
  calculatedWidth: number;
  media: Media;
};

export const MediaViewRenderItem = ({ media, calculatedWidth }: Props) => {
  const styles = makeStyles(calculatedWidth);
  const { type: mime, key } = media;

  const type = mime.split('/')[0];

  const { downloadFile } = useS3Download();

  const [uri, setUri] = React.useState<string | undefined>();

  useEffect(() => {
    downloadFile(media).then(res => {
      setUri(res);
    });
  }, [downloadFile, media]);

  switch (type) {
    case AppMediaTypes.IMAGE.toLowerCase():
      return (
        <View style={styles.renderItemContainer}>
          <FastImage
            source={{ uri }}
            fallback
            resizeMode={FastImage.resizeMode.cover}
            style={styles.renderItemMedia}
          />
        </View>
      );
    case AppMediaTypes.VIDEO.toLowerCase():
      return (
        <View style={styles.renderItemContainer}>
          <VideoPlayer
            source={{ uri }}
            style={styles.renderItemMedia}
            muted
            resizeMode="cover"
          />
        </View>
      );
    default:
      return <></>;
  }
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

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
  const { type: mime } = media;

  const type = mime.split('/')[0];

  const { url } = useS3Download(media);

  // const [uri, setUri] = React.useState<string | undefined>();

  switch (type) {
    case AppMediaTypes.IMAGE.toLowerCase():
      return (
        <View style={styles.renderItemContainer}>
          <FastImage
            source={{ uri: url }}
            // onProgress={e => console.log('e', e.nativeEvent)}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.renderItemMedia}
          />
        </View>
      );
    case AppMediaTypes.VIDEO.toLowerCase():
      return (
        <View style={styles.renderItemContainer}>
          <VideoPlayer
            source={{ uri: url }}
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

import { AppTheme } from '@app/theme';
import { LinkPreview as ExtLinkPreview } from '@flyerhq/react-native-link-preview';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

export const LinkPreview = ({
  url,
  theme,
}: {
  url: string;
  theme: AppTheme;
}) => {
  return (
    <ExtLinkPreview
      renderLinkPreview={payload => {
        // console.log(payload);
        if (payload.previewData && payload.previewData.image?.url) {
          const { previewData } = payload;
          const uri = previewData.image?.url;
          return (
            <View style={styles.urlContainer}>
              <View style={{ flex: 1, padding: 10 }}>
                <Text
                  variant="labelSmall"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={{ color: theme.colors.onBackground }}>
                  {payload.previewData.link}
                </Text>
                <Text
                  variant="labelMedium"
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={[styles.bold, { color: theme.colors.onBackground }]}>
                  {payload.previewData.title}
                </Text>
              </View>
              <Image source={{ uri: uri }} style={styles.minimizedImage} />
            </View>
          );
        }
      }}
      enableAnimation
      text={url.toString()}
    />
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: 'bold',
  },
  urlContainer: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: '#2b2b2b',
  },
  minimizedImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
});

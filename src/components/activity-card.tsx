import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Avatar, Divider, Text } from 'react-native-paper';
import { PADDING } from '@app/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { Image } from 'react-native';
import { MediaFlatlist } from './swiper-flatlist';
import { Asset } from 'react-native-image-picker';

type ActivityCardProps = {};

const ActivityCard = () => {
  const isOriginalPing = true;

  const url: string | undefined = undefined;
  ('https://www.youtube.com/watch?v=QwievZ1Tx-8');
  const media: Asset[] | undefined = undefined;
  // [
  //   {
  //     uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
  //     type: 'image/jpeg',
  //   },
  //   {
  //     uri: 'https://i.ytimg.com/vi/QwievZ1Tx-8/maxresdefault.jpg',
  //     type: 'image/jpeg',
  //   },
  // ];

  return (
    <View
      style={{
        gap: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      {/* Left side */}
      <View
        style={{
          // height: '100%',
          flex: 0,
          flexDirection: 'column',
          alignItems: 'center',
          columnGap: 10,
        }}>
        <Avatar.Image
          source={require('@assets/images/placeholder.jpg')}
          size={32}
          style={styles.avatar}
        />
        <Divider
          bold
          style={{
            flex: 1,
            width: 1,
            height: '100%',
            backgroundColor: '#c5c5c5',
            marginVertical: PADDING.sm,
          }}
        />
      </View>
      {/* Right side */}
      <View style={{ flex: 1 }}>
        {/* Username, timeline, options */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
            username
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {isOriginalPing && (
              <AntDesign
                name="star"
                size={14}
                style={{ transform: [{ scaleX: -1 }] }}
              />
            )}
            <Text variant="bodySmall" style={{}}>
              2h
            </Text>
            <Ionicons name="ellipsis-horizontal" size={20} style={{}} />
          </View>
        </View>
        {/* Content */}
        <View style={{ flexDirection: 'column', gap: 10 }}>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
            voluptatum? Quo, quia. Quisquam, voluptatum voluptates? Quisquam,
            voluptatum voluptates?
          </Text>
          {/* URL */}
          {url && (
            <LinkPreview
              renderLinkPreview={payload => {
                // console.log(payload);
                if (payload.previewData && payload.previewData.image?.url) {
                  const { previewData } = payload;
                  const uri = previewData.image?.url;
                  return (
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: 10,
                        backgroundColor: '#2b2b2b',
                      }}>
                      <View style={{ flex: 1, padding: 10 }}>
                        <Text
                          variant="labelSmall"
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{}}>
                          {payload.previewData.link}
                        </Text>
                        <Text
                          variant="labelMedium"
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={{ fontWeight: 'bold' }}>
                          {payload.previewData.title}
                        </Text>
                      </View>
                      <Image
                        source={{ uri: uri }}
                        style={{
                          width: 100,
                          height: 100,
                          // aspectRatio: aspectRatio,
                          resizeMode: 'cover',
                        }}
                      />
                    </View>
                  );
                }
              }}
              enableAnimation
              text="https://www.youtube.com/watch?v=QwievZ1Tx-8"
            />
          )}
          {/* Media */}
          {media && (
            <View>
              <MediaFlatlist assets={media} paddingOffset={38.5} />
            </View>
          )}
          {/* Actions */}
          <View style={{ flexDirection: 'row', display: 'flex' }}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#FFF"
              style={{
                padding: 0,
                marginVertical: 5,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  avatar: {
    padding: 0,
    margin: 0,
    elevation: 1,
  },
});

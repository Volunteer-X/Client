import { StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import { Avatar, Divider, Text } from 'react-native-paper';
import { PADDING, Picks } from '@app/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { Image } from 'react-native';
import { MediaFlatlist } from './swiper-flatlist';
import { Asset } from 'react-native-image-picker';
import { PicksIcon } from './picks-icon';
import { ViewMoreText } from './view-more-text';

type ActivityCardProps = {
  isOriginalPing?: boolean;
  url?: string;
  media?: Asset[];
  title: string;
  text: string;
  username: string;
  timestamp: string;
  showPicks?: boolean;
  showStar?: boolean;
  onMenuClick?: () => void;
};

const ActivityCard = ({
  isOriginalPing = false,
  title,
  text,
  username,
  timestamp,
  url,
  media,
  showPicks = false,
  showStar = false,
  onMenuClick,
}: ActivityCardProps) => {
  ('https://www.youtube.com/watch?v=QwievZ1Tx-8');
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
    <View style={styles.container}>
      {/* Left side */}
      <View style={styles.leftContainer}>
        <Avatar.Image
          source={require('@assets/images/placeholder.jpg')}
          size={32}
          style={styles.avatar}
        />
        <Divider bold style={styles.verticalDivider} />
      </View>
      {/* Right side */}
      <View style={styles.rightContainer}>
        {/* Username, timeline, options */}
        <View style={styles.header}>
          <Text variant="bodyLarge" style={styles.bold}>
            {username}
          </Text>
          <View style={styles.starTimeAndMenu}>
            {showStar && isOriginalPing && (
              <AntDesign
                name="star"
                size={14}
                style={{ transform: [{ scaleX: -1 }] }}
              />
            )}
            <Text variant="bodySmall" style={{}}>
              {`${timestamp} ago`}
            </Text>
            <Ionicons
              name="ellipsis-horizontal"
              size={20}
              style={{}}
              onPress={onMenuClick}
            />
          </View>
        </View>
        {/* Content */}
        <View style={{ gap: 10 }}>
          {/* Picks */}
          {showPicks && (
            <View style={[styles.picksContainer]}>
              {Picks.slice(9, 14).map(pick => (
                <PicksIcon
                  key={pick.label}
                  icon={pick.icon}
                  size={14}
                  iconStyle={{ opacity: 0.75 }}
                />
              ))}
            </View>
          )}
          {/* Title */}
          <Text variant="labelLarge" numberOfLines={2} style={styles.title}>
            {title}
          </Text>
          {/* Description */}
          <ViewMoreText numberOfLines={3}>
            <Text variant="bodyMedium">{text}</Text>
          </ViewMoreText>
          {/* URL */}
          {url && (
            <LinkPreview
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
                          style={{}}>
                          {payload.previewData.link}
                        </Text>
                        <Text
                          variant="labelMedium"
                          numberOfLines={2}
                          ellipsizeMode="tail"
                          style={styles.bold}>
                          {payload.previewData.title}
                        </Text>
                      </View>
                      <Image
                        source={{ uri: uri }}
                        style={styles.minimizedImage}
                      />
                    </View>
                  );
                }
              }}
              enableAnimation
              text={url}
            />
          )}
          {/* Media */}
          {media && (
            <View style={{ maxHeight: 200 }}>
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
  container: {
    gap: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  leftContainer: {
    // height: '100%',
    flex: 0,
    flexDirection: 'column',
    alignItems: 'center',
    columnGap: 10,
  },

  avatar: {
    padding: 0,
    margin: 0,
    elevation: 1,
  },
  verticalDivider: {
    flex: 1,
    width: 1,
    height: '100%',
    backgroundColor: '#c5c5c5',
    marginTop: PADDING.sm,
  },
  rightContainer: { flex: 1 },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bold: {
    fontWeight: 'bold',
  },
  starTimeAndMenu: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  picksContainer: {
    flexDirection: 'row',
    gap: 1,
    marginTop: 5,
    paddingVertical: 1.5,
    paddingHorizontal: 1.5,
    borderRadius: 10,
    backgroundColor: '#16161d',
  },
  title: {
    fontWeight: '800',
    fontStyle: 'italic',
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

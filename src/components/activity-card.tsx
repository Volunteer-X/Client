import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { PADDING, Picks, PING_FRAGMENT, USER_FRAGMENT } from '@app/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { Image } from 'react-native';
import { MediaFlatlist, MediaView } from './swiper-flatlist';
import { Asset } from 'react-native-image-picker';
import { PicksIcon } from './picks-icon';
import { ViewMoreText } from './view-more-text';
import { Avatar } from './avatar/Avatar';
import { FragmentType, useFragment } from '@app/__generated__/gql';
import { GraphQLURL } from 'graphql-scalars';
import { getRelativeTime } from '@app/utils';

export type ActivityCardProps = {
  isOriginalPing?: boolean;
  url?: string;
  media?: Asset[];
  title?: string;
  text?: string;
  username?: string;
  picks?: string[];
  showPicks?: boolean;
  showStar?: boolean;
  ping: FragmentType<typeof PING_FRAGMENT>;
  creator: FragmentType<typeof USER_FRAGMENT>;
  onMenuClick?: () => void;
  onPress?: () => void;
};

const ActivityCard = ({
  isOriginalPing = false,
  showPicks = false,
  showStar = false,
  onMenuClick,
  onPress,
  ping: _ping,
  creator: owner,
}: ActivityCardProps) => {
  const ping = useFragment(PING_FRAGMENT, _ping);
  const creator = useFragment(USER_FRAGMENT, owner);

  const { title, description, picks, url, media, createdAt } = ping;
  const { username, picture, name } = creator;

  return (
    <View style={{ width: '100%' }}>
      <Pressable
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        onPress={() => onPress && onPress()}
      />
      <View style={styles.container}>
        {/* Left side */}
        <View style={styles.leftContainer}>
          <Avatar name={name?.firstName} uri={picture} size={32} />
          <Divider bold style={styles.verticalDivider} />
        </View>
        {/* Right side */}
        <View style={styles.rightContainer}>
          {/* Username, timeline, options */}
          <View style={styles.header}>
            <Text variant="bodyMedium" style={{}}>
              {name && `${name.firstName} ${name.lastName}`}
            </Text>
            <View style={styles.starTimeAndMenu}>
              <Button compact mode="text" style={{ margin: 0, padding: 0 }}>
                Join
              </Button>
              {showStar && isOriginalPing && (
                <AntDesign
                  name="star"
                  size={14}
                  style={{ transform: [{ scaleX: -1 }] }}
                />
              )}
              <Text variant="bodySmall" style={{}}>
                {createdAt && getRelativeTime(createdAt as Date)}
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
            {picks && showPicks && (
              <View style={[styles.picksContainer]}>
                {picks.map(pick => {
                  const pickObj = Picks.find(val => val.label === pick);
                  return (
                    <PicksIcon
                      key={pickObj?.label}
                      icon={pickObj?.icon ? pickObj.icon : 'star'}
                      size={16}
                      iconStyle={{ opacity: 0.75 }}
                    />
                  );
                })}
              </View>
            )}
            {/* Title */}
            <Text variant="labelLarge" numberOfLines={2} style={styles.title}>
              {title}
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
                text={url.toString()}
              />
            )}
            {/* Media */}
            {media && media !== null && media.length > 0 && (
              <View
                hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                style={{
                  maxHeight: 200,
                  overflow: 'hidden',
                  borderRadius: 15,
                }}>
                <MediaView media={media} />
              </View>
            )}
            {/* Description */}
            <ViewMoreText numberOfLines={3}>
              <Text variant="bodyMedium">{description}</Text>
            </ViewMoreText>
            {/* Actions */}
            {/* <View style={{ flexDirection: 'row', display: 'flex' }}>
            <Ionicons
              name="heart-outline"
              size={24}
              color="#FFF"
              style={{
                padding: 0,
                marginVertical: 5,
              }}
            />
          </View> */}
            {/* <GoogleStaticMaps
            center={'43, High Drive, New Malden, UK'}
            zoom={14}
            size={{ height: 600, width: 300 }}
            containerStyle={{ borderRadius: 10, height: 100 }}
          /> */}
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
    marginVertical: 2,
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
    alignItems: 'center',
    // backgroundColor: 'green',
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

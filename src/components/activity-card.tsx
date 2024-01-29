import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { Button, Divider, Text } from 'react-native-paper';
import { PADDING, Picks } from '@app/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MediaView } from './swiper-flatlist';
import { PicksIcon } from './picks-icon';
import { ViewMoreText } from './view-more-text';
import { Avatar } from './avatar/Avatar';
import { getRelativeTime } from '@app/utils';
import { Activity, User } from '@app/types/entities';
import useAppTheme from '@app/hooks/useAppTheme';
import { LinkPreview } from './link-preview-view';

type ActivityOptions = {
  isOriginalPing?: boolean;
  showPicks?: boolean;
  showStar?: boolean;
  isMember?: boolean;
  textLines?: number;
  showMenu?: boolean;
  displayMedia?: boolean;
};

export type ActivityCardProps = {
  activity: Activity;
  creator: User;
  options?: ActivityOptions;
  onMenuClick?: () => void;
  onPress?: () => void;
};

const ActivityCard = ({
  onMenuClick,
  onPress,
  activity,
  creator,
  options = {
    isOriginalPing: false,
    showPicks: true,
    showStar: false,
    isMember: false,
    textLines: 3,
    showMenu: true,
    displayMedia: true,
  },
}: ActivityCardProps) => {
  const theme = useAppTheme().theme;
  const {
    title,
    description,
    picks,
    url,
    media,
    createdAt,
    latitude,
    longitude,
  } = activity;

  const { isOriginalPing, showPicks, showStar, isMember, textLines, showMenu } =
    options;

  return (
    <View style={styles.root}>
      <Pressable onPress={() => onPress && onPress()}>
        <View style={styles.container}>
          {/* Left side */}
          <View style={styles.leftContainer}>
            <Avatar
              name={creator?.name?.firstName}
              uri={creator?.picture}
              size={32}
            />
            <Divider bold style={styles.verticalDivider} />
          </View>
          {/* Right side */}
          <View style={styles.rightContainer}>
            {/* Username, timeline, options */}
            <View style={styles.header}>
              <Text
                variant="bodyMedium"
                style={{ color: theme.colors.onBackground }}>
                {creator?.name &&
                  `${creator.name.firstName} ${creator.name.lastName}`}
              </Text>
              <View style={styles.starTimeAndMenu}>
                {!isMember ? (
                  <Button compact mode="text" style={{ margin: 0, padding: 0 }}>
                    Join
                  </Button>
                ) : (
                  <Button compact mode="text" style={{ margin: 0, padding: 0 }}>
                    Forum
                  </Button>
                )}
                {showStar && isOriginalPing && (
                  <AntDesign
                    name="star"
                    size={14}
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                )}
                <Text
                  variant="bodySmall"
                  style={{ color: theme.colors.onBackground }}>
                  {createdAt && getRelativeTime(createdAt as Date)}
                </Text>
                {showMenu && (
                  <Ionicons
                    name="ellipsis-horizontal"
                    size={20}
                    style={{}}
                    onPress={onMenuClick}
                  />
                )}
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
              <Text
                variant="labelLarge"
                numberOfLines={2}
                style={[styles.title, { color: theme.colors.onBackground }]}>
                {title}
              </Text>
              {/* URL */}
              {url && <LinkPreview url={url.toString()} theme={theme} />}
              {/* Media */}
              {media && media !== null && media.length > 0 && (
                <View
                  hitSlop={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  style={styles.mediaContainer}>
                  <MediaView media={media} />
                </View>
              )}
              {/* Description */}
              <ViewMoreText numberOfLines={textLines}>
                <Text
                  variant="bodyMedium"
                  style={{ color: theme.colors.onBackground }}>
                  {description}
                </Text>
              </ViewMoreText>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default ActivityCard;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
  },
  root: { width: '100%' },
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
  mediaContainer: {
    maxHeight: 200,
    overflow: 'hidden',
    borderRadius: 15,
  },
});

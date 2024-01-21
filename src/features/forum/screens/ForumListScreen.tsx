import React, { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  FlatList,
  ListRenderItem,
  Pressable,
  StatusBar,
  View,
} from 'react-native';
import { Text } from 'react-native-paper';
import Ionicon from 'react-native-vector-icons/Ionicons';

import { makeStyles } from './forum.style';
import useAppTheme from '@app/hooks/useAppTheme';
import { ForumStackScreenProps } from '@ts-types/type';
import { AppIcons } from '@app/theme/icon';
import { EmptyScreen } from './EmptyScreen';
import { Avatar } from '@app/components';

type Forum = {
  channel: string;
  title: string;
  timestamp: string;
  username: string;
  replies: number;
  participants?: number;
  picture?: string;
};

// Forum list
const forumList: Forum[] = [
  {
    channel: '1',
    title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    picture: 'https://picsum.photos/200',
    timestamp: '31 Jun 2023',
    participants: 10,
    username: 'Username',
    replies: 10,
  },
  {
    channel: '2',
    title: 'Forum 2',
    picture: 'https://picsum.photos/200',
    timestamp: '31 Jun 2023',
    participants: 2,
    username: 'Username',
    replies: 10,
  },
];

export const ForumListScreen = () => {
  // Theme
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  // Navigation
  const navigation =
    useNavigation<ForumStackScreenProps<'Forums'>['navigation']>();

  // Header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: styles.header,
    });
  }, [navigation, styles.header]);

  const handleOnClick = (item: Forum) => {
    navigation.navigate('Channel', { channelID: item.channel });
  };

  // Render item
  const _renderItem: ListRenderItem<Forum> = ({ item: forum }) => {
    return (
      <Pressable onPress={() => handleOnClick(forum)}>
        <View style={styles.forumContainer}>
          <View style={styles.avatarContainer}>
            <Avatar size={50} showBorder uri={forum.picture} />
          </View>
          <View style={{ gap: 5, flex: 1 }}>
            <Text
              variant="labelLarge"
              numberOfLines={1}
              style={styles.forumTitle}>
              {forum.title}
            </Text>
            <Text variant="labelSmall" style={styles.forumOwner}>
              {`@${forum.username}`}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text variant="labelSmall" style={styles.replies}>
                {`${forum.participants} Members | ${forum.replies} Replies`}
              </Text>
              <Text variant="labelSmall" style={styles.timestamp}>
                {forum.timestamp}
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.page}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {/* Open Search page */}

        <Pressable style={styles.searchBarContainer}>
          <Ionicon name={AppIcons.SEARCH} size={18} />
          <Text variant="labelLarge" style={styles.searchBarPlaceholder}>
            Search
          </Text>
        </Pressable>

        {/* Forum list */}
        {forumList.length === 0 ? (
          <EmptyScreen />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={forumList}
            keyExtractor={item => item.channel}
            renderItem={_renderItem}
          />
        )}
      </View>
    </View>
  );
};

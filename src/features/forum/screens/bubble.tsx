import useAppTheme from '@app/hooks/useAppTheme';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import {
  IMessage,
  MessageProps,
  MessageText,
  Time,
  utils,
} from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';
import { makeBubbleStyles } from './forum.style';

const { isSameDay, isSameUser } = utils;

export const Bubble = (props: MessageProps<IMessage>) => {
  const { previousMessage, currentMessage, user } = props;

  if (!currentMessage) {
    throw new Error('currentMessage is undefined');
  }

  const { theme } = useAppTheme();

  const styles = makeBubbleStyles(theme);

  const renderMessageText = useCallback(() => {
    if (currentMessage && currentMessage.text) {
      return (
        <MessageText
          position="left"
          currentMessage={currentMessage}
          textStyle={{
            left: { marginLeft: 0, marginRight: 0 },
          }}
        />
      );
    }
    return null;
  }, [currentMessage]);

  const renderName = useCallback(() => {
    const name = currentMessage && currentMessage.user.name;

    if (user) {
      return <Text style={styles.name}>{name}</Text>;
    }

    return null;
  }, [currentMessage, styles.name, user]);

  const renderTime = useCallback(() => {
    if (currentMessage && currentMessage.createdAt) {
      return (
        <Time
          containerStyle={{ left: [styles.timeContainer] }}
          timeTextStyle={{ left: [styles.time, styles.headerItem] }}
          currentMessage={currentMessage}
        />
      );
    }

    return null;
  }, [currentMessage, styles.headerItem, styles.time, styles.timeContainer]);

  const isSameThread =
    isSameUser(currentMessage, previousMessage) &&
    isSameDay(currentMessage, previousMessage);

  const renderMessageHeader = isSameThread ? null : (
    <View style={styles.headerView}>
      {renderName()}
      {renderTime()}
    </View>
  );

  return (
    <View style={styles.container}>
      <Pressable onLongPress={() => {}}>
        <View style={styles.wrapper}>
          <>
            {renderMessageHeader}
            {renderMessageText()}
          </>
        </View>
      </Pressable>
    </View>
  );
};

import useAppTheme from '@app/hooks/useAppTheme';
import React, { useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { IMessage, MessageText, Time, utils } from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';
import { makeBubbleStyles } from './forum.style';

const { isSameDay, isSameUser } = utils;

type BubbleProps = {
  currentMessage: IMessage;
  nextMessage: IMessage;
  previousMessage: IMessage;
  user: IMessage['user'];
};

export const Bubble = ({
  currentMessage,
  nextMessage,
  previousMessage,
  user,
}: BubbleProps) => {
  const { theme } = useAppTheme();

  const styles = makeBubbleStyles(theme);

  const renderMessageText = useCallback(() => {
    if (currentMessage.text) {
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
    const name = currentMessage.user.name;

    if (user) {
      return <Text style={styles.name}>{name}</Text>;
    }

    return null;
  }, [currentMessage.user.name, styles.name, user]);

  const renderTime = useCallback(() => {
    if (currentMessage.createdAt) {
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
            {renderMessageText}
          </>
        </View>
      </Pressable>
    </View>
  );
};

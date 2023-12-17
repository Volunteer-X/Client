import useAppTheme from '@app/hooks/useAppTheme';
import { current } from '@reduxjs/toolkit';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import {
  Avatar,
  Day,
  IMessage,
  isSameDay,
  isSameUser,
  MessageProps,
} from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';
import { Bubble } from './bubble';
import { makeMessageStyles } from './forum.style';

export const Message = (props: MessageProps<IMessage>) => {
  const { previousMessage, currentMessage, nextMessage, user } = props;

  if (!currentMessage) {
    throw new Error('currentMessage is undefined');
  }

  const { theme } = useAppTheme();

  const styles = makeMessageStyles(theme);

  const renderDay = useCallback(() => {
    if (currentMessage && currentMessage.createdAt) {
      return (
        <Day
          currentMessage={currentMessage}
          nextMessage={nextMessage}
          previousMessage={previousMessage}
        />
      );
    }

    return null;
  }, [currentMessage, nextMessage, previousMessage]);

  const renderAvatar = useCallback(() => {
    let extraStyle;
    if (
      currentMessage &&
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      extraStyle = { height: 0 };
    }

    console.log('pic', currentMessage?.user.avatar);

    return (
      <Avatar {...props} imageStyle={{ left: [styles.avatar, extraStyle] }} />
    );
  }, [currentMessage, previousMessage, props, styles.avatar]);

  const renderBubble = useCallback(() => {
    return <Bubble {...props} />;
  }, [props]);

  const marginBotton = isSameUser(currentMessage, nextMessage) ? 2 : 10;

  return (
    <>
      {renderDay()}
      <View style={[styles.container, { marginBottom: marginBotton }]}>
        <>
          {renderAvatar()}
          {renderBubble()}
        </>
      </View>
    </>
  );
};

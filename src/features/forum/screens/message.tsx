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
} from 'react-native-gifted-chat';
import { Bubble } from './bubble';
import { makeMessageStyles } from './forum.style';

type MessageProps = {
  currentMessage: IMessage;
  nextMessage: IMessage;
  previousMessage: IMessage;
  user: IMessage['user'];
};

export const Message = (props: MessageProps) => {
  const { previousMessage, currentMessage, nextMessage, user } = props;

  const { theme } = useAppTheme();

  const styles = makeMessageStyles(theme);

  const renderDay = useCallback(() => {
    if (currentMessage.createdAt) {
      return <Day {...props} />;
    }

    return null;
  }, [currentMessage.createdAt, props]);

  const renderAvatar = useCallback(() => {
    let extraStyle;
    if (
      isSameUser(currentMessage, previousMessage) &&
      isSameDay(currentMessage, previousMessage)
    ) {
      extraStyle = { height: 0 };
    }

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
      {renderDay}
      <View style={[styles.container, { marginBottom: marginBotton }]}>
        <>
          {renderAvatar}
          {renderBubble}
        </>
      </View>
    </>
  );
};

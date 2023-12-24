import { ForumStackScreenProps } from '@app/types/type';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import { View } from 'react-native';
import { GiftedChat, IMessage, MessageProps } from 'react-native-gifted-chat';
import { Text } from 'react-native-paper';
import { Message } from './message';

export const ForumScreen = () => {
  const navigation =
    useNavigation<ForumStackScreenProps<'ForumScreen'>['navigation']>();

  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'John Doe',
          avatar: 'https://picsum.photos/id/237/200',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 3,
          name: 'Random name',
          avatar: 'https://picsum.photos/id/10/200',
        },
      },

      {
        _id: 3,
        text: 'Hi, Users',
        createdAt: new Date(),
        user: {
          _id: 4,
          name: 'Alice',
          avatar: 'https://picsum.photos/id/15/200',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderMessage = (props: Readonly<MessageProps<IMessage>>) => {
    return (
      <>
        <Message {...props} />
        {/* <Text>{props.currentMessage?.text}</Text> */}
      </>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Forum',
    });
  }, [navigation]);

  return (
    <GiftedChat
      messages={messages}
      onSend={_messages => onSend(_messages)}
      user={{
        _id: 1,
        name: 'Jane Doe',
      }}
      renderMessage={renderMessage}
    />
  );
};

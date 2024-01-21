import { ForumStackScreenProps } from '@app/types/type';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';
import socket from '@app/services/socket';
import { GiftedChat, IMessage, MessageProps } from 'react-native-gifted-chat';
import { Message } from './message';

type CreateMessage = {
  channelID: string;
  userID: string;
  text: string;
};

export const Channel = () => {
  const navigation =
    useNavigation<ForumStackScreenProps<'Channel'>['navigation']>();

  const route = useRoute<ForumStackScreenProps<'Channel'>['route']>();

  const [messages, setMessages] = useState<IMessage[]>();

  useEffect(() => {
    socket.on('message', data => {
      console.log(data);
    });

    console.log(socket.connected);

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

    return () => {
      socket.off('message');
    };
  }, []);

  const onSend = useCallback(
    (newMessages: IMessage[]) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newMessages),
      );

      const createMessage: CreateMessage = {
        channelID: route.params?.channelID,
        userID: '1',
        text: newMessages[0].text,
      };

      console.log(socket.id);

      socket.emit('message', createMessage, (error: any) => {
        console.log(error);
      });
    },
    [route.params?.channelID],
  );

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
      alwaysShowSend
      scrollToBottom
      showUserAvatar
      onPressAvatar={console.log}
      messages={messages}
      onSend={_messages => onSend(_messages)}
      user={{
        _id: 1,
        name: 'Jane Doe',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      renderMessage={renderMessage}
      messagesContainerStyle={{ backgroundColor: 'indigo' }}
    />
  );
};

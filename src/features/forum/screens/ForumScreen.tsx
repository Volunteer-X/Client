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
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages: IMessage[]) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, newMessages),
    );
  }, []);

  const renderMessage = useCallback(
    (_messages: Readonly<MessageProps<IMessage>>) => {
      return (
        <View>
          <Text>{_messages.currentMessage?.text}</Text>
        </View>
      );
    },
    [],
  );

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
      }}
      renderMessage={renderMessage}
    />
  );
};

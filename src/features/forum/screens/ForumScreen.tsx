import { Avatar } from '@app/components';
import { ForumStackScreenProps } from '@app/types/type';
import { useNavigation } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

export const ForumScreen = () => {
  const navigation =
    useNavigation<ForumStackScreenProps<'ForumScreen'>['navigation']>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Forum',
    });
  }, [navigation]);

  return (
    <View>
      <Text>Forum</Text>
    </View>
  );
};

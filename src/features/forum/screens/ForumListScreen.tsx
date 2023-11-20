import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import useAppTheme from '@app/hooks/useAppTheme';

export const ForumListScreen = () => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  return (
    <View>
      <Text>Forum List Screen</Text>
    </View>
  );
};

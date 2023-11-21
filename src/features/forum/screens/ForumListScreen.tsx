import React, { useCallback, useLayoutEffect } from 'react';
import { StatusBar, View } from 'react-native';
import { Text } from 'react-native-paper';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './forum.style';
import { useNavigation } from '@react-navigation/native';
import { ForumStackScreenProps } from '@ts-types/type';

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

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <Text>Forum List Screen</Text>
    </View>
  );
};

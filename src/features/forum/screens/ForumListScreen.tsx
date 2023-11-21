import React, { useCallback, useLayoutEffect } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyles } from './forum.style';
import { useNavigation } from '@react-navigation/native';
import { ForumStackScreenProps } from '@ts-types/type';
import { AppIcons } from '@app/theme/icon';
import Ionicon from 'react-native-vector-icons/Ionicons';

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
    <View style={styles.page}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {/* Open Search page */}
        <Pressable style={styles.searchBarContainer}>
          <Ionicon name={AppIcons.SEARCH} size={18} />
          <Text variant="labelLarge" style={styles.searchBarPlaceholder}>
            Search
          </Text>
        </Pressable>
        <Text>Forum List Screen</Text>
      </View>
    </View>
  );
};

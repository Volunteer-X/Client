import useAppTheme from '@app/hooks/useAppTheme';
import LottieView from 'lottie-react-native';
import React from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { makeStyles } from './forum.style';

export const EmptyScreen = () => {
  const { theme } = useAppTheme();

  const styles = makeStyles(theme);

  return (
    <View style={styles.emptyContainer}>
      <LottieView
        source={require('@assets/anims/empty-forums.json')}
        style={styles.lottieView}
        loop={false}
        autoPlay
      />
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        Let's start a conversation
      </Text>
      <Text variant="labelLarge" numberOfLines={2} style={styles.emptySubTitle}>
        For the moment, you have no active forums. Make a ping to start one.
      </Text>
      <Button
        mode="contained-tonal"
        buttonColor="black"
        textColor="white"
        style={{ borderRadius: 10 }}>
        Make a ping
      </Button>
    </View>
  );
};

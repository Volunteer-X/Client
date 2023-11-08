import { Pressable, StyleSheet } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { DIMENSIONS } from '@app/lib';
import { Text } from 'react-native-paper';

const EmptyPickView = ({
  onClickEmptyScreen,
}: {
  onClickEmptyScreen: () => void;
}) => {
  return (
    <Pressable style={styles.container} onPress={onClickEmptyScreen}>
      <LottieView
        style={styles.lottieView}
        source={require('@assets/anims/empty-ping.json')}
        autoPlay
        loop
      />
      <Text variant="bodyLarge">Add picks</Text>
    </Pressable>
  );
};

export default EmptyPickView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: DIMENSIONS.fullHeight / 6,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  lottieView: {
    width: 80,
    height: 80,
  },
});

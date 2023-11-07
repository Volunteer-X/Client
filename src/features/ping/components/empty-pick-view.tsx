import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { DIMENSIONS } from '@app/lib';
import { Button, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { PFinalNavProp } from '@app/types/type';

const EmptyPickView = () => {
  const navigation = useNavigation<PFinalNavProp>();

  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        navigation.navigate('SelectPicks');
      }}>
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

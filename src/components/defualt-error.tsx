import { StyleSheet, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native-paper';

const DefualtErrorScreen = ({ screenName }: { screenName: string }) => {
  const inset = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        marginTop: inset.top,
        marginStart: inset.left,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text variant="displayLarge">{screenName}</Text>

      <Text variant="headlineSmall">Opps! Something went wrong</Text>

      <LottieView
        source={require('@assets/anims/error.json')}
        style={{ width: 500, height: 500 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default DefualtErrorScreen;

const styles = StyleSheet.create({});

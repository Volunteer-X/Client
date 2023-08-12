import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';

const SplashScreen = () => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text variant="titleLarge">SplashScreen</Text>
      </View>
    </>
  );
};

export default SplashScreen;

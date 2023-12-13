import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

const DefualtErrorScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <LottieView
        source={require('@assets/anims/error.json')}
        style={{ width: '100%', height: '100%' }}
        autoPlay
        loop
      />
    </View>
  );
};

export default DefualtErrorScreen;

const styles = StyleSheet.create({});

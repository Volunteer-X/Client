/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, Text, Linking, useWindowDimensions } from 'react-native';
import { Button } from 'react-native-paper';
import WebView from 'react-native-webview';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  const width = useWindowDimensions().width;
  console.log('🚀 ~ file: HomeScreen.tsx:10 ~ HomeScreen ~ width:', width);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#000' }}>Home Screen</Text>
      <Button onPress={() => {}}>Drawer</Button>
    </View>
  );
};

export default HomeScreen;

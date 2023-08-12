/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, Text, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import WebView from 'react-native-webview';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#000' }}>Home Screen</Text>
      <Button onPress={() => Linking.openURL('https://www.google.com/')}>
        Drawer
      </Button>
    </View>
  );
};

export default HomeScreen;

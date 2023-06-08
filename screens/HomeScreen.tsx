/* eslint-disable react-native/no-inline-styles */
import React from 'react';

import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: '#000' }}>Home Screen</Text>
      <Button onPress={() => navigation.toggleDrawer()}>Drawer</Button>
    </View>
  );
};

export default HomeScreen;

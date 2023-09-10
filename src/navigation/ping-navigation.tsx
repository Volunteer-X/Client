import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import { MapOverlay } from '@components/index';
import { PingStackParamList } from '@ts-types/type';
import { PingA, PingB } from '@features/ping/screens/index';

const PingNavigation = () => {
  const Stack = createStackNavigator<PingStackParamList>();

  return (
    <>
      {/* Overlay */}
      {/* Ping */}
      <Stack.Navigator
        initialRouteName="PingStepA"
        screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="Overlay" component={MapOverlay} /> */}
        <Stack.Screen
          name="PingStepA"
          component={PingA}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: false,
            cardOverlay: MapOverlay,
          }}
        />
        <Stack.Screen
          name="PingStepB"
          component={PingB}
          options={{
            presentation: 'transparentModal',
            cardOverlayEnabled: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default PingNavigation;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    marginHorizontal: 25,
    marginVertical: 50,
    borderRadius: 25,
    elevation: 10,
    // changeable
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
});

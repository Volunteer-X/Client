import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MapOverlay } from '../../../components';
import { PingStackParamList } from '../../../navigation/type';
import { PingA, PingB } from '.';

const AddScreen = () => {
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
            cardOverlayEnabled: true,
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

export default AddScreen;

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

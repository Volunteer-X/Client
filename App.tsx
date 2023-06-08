import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import RootNav from './navigation/RootNav';

const App = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;

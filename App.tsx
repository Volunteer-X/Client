import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNav from './navigation/RootNav';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer>
          <RootNav />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;

import 'react-native-gesture-handler';
import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import RootNav from './src/navigation/RootNav';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';

const App = () => {
  const scheme = useColorScheme();
  return (
    <ThemeProvider>
      <PaperProvider>
        <NavigationContainer
          theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
          <RootNav />
        </NavigationContainer>
      </PaperProvider>
    </ThemeProvider>
  );
};

export default App;

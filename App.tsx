import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React from 'react';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';

import { store } from './app/store';
import RootNav from './src/navigation/root-navigation';

const App = () => {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
              <RootNav />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

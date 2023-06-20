import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React, { useEffect } from 'react';
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
import { RootNavigation } from './src/navigation';
import { PLATFORM_PERMISSIONS, requestPermission } from './src/utils';

const App = () => {
  const scheme = useColorScheme();

  useEffect(() => {
    requestPermission({
      permission: PLATFORM_PERMISSIONS.ACCESS_COARSE_LOCATION,
    });
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
              <RootNavigation />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

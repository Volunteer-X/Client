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
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_DOMAIN, AUTH0_CLIENT } from '@env';

import { store } from './app/store';
import { RootNavController } from './src/components';

const App = () => {
  const scheme = useColorScheme();

  useEffect(() => {
    // let locationPermission = requestPermission({
    //   permission: PLATFORM_PERMISSIONS.ACCESS_COARSE_LOCATION,
    // });
    // dispatch(setLocationPermission(locationPermission));
    // getCurrentLocation().then(res => console.log(res));
  }, []);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT}>
              <NavigationContainer
                theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
                <RootNavController />
              </NavigationContainer>
            </Auth0Provider>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

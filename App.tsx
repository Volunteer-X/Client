import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_DOMAIN, AUTH0_CLIENT } from '@env';
import { ApolloProvider } from '@apollo/client';

import { store } from './app/store';

import { AppThemeProvider } from './src/theme';
import useAppTheme from './src/hooks/useAppTheme';

import apolloClient from './src/services/apolloClient';

import { MainNavigation } from './src/navigation';
import { StyleSheet } from 'react-native';

const App = () => {
  const { themePreference, theme } = useAppTheme();

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT}>
          <GestureHandlerRootView style={styles.gestureHandlerRootView}>
            <AppThemeProvider value={themePreference}>
              <ThemeProvider>
                <PaperProvider theme={theme}>
                  <NavigationContainer theme={theme}>
                    <MainNavigation />
                  </NavigationContainer>
                </PaperProvider>
              </ThemeProvider>
            </AppThemeProvider>
          </GestureHandlerRootView>
        </Auth0Provider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

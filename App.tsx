import 'react-native-gesture-handler';
import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Auth0Provider } from 'react-native-auth0';
import { AUTH0_DOMAIN, AUTH0_CLIENT } from '@env';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './app/store';

import { AppThemeProvider } from '@theme/index';
import useAppTheme from '@hooks/useAppTheme';

// import apolloClient from './src/services/apolloClient';
import apolloClient from '@services/apolloClient';

// import { MainNavigation } from './src/navigation';
import { MainNavigation } from '@navigation/index';
import { AuthProvider } from '@app/context/AuthContext';

/* 
TODO develop authProvider for persist store and authentication check
*/
const App = () => {
  const { themePreference, theme } = useAppTheme();

  return (
    <ApolloProvider client={apolloClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT}>
            <AuthProvider>
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
            </AuthProvider>
          </Auth0Provider>
        </PersistGate>
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

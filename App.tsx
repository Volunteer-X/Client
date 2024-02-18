import 'react-native-url-polyfill/auto';

import { AUTH0_CLIENT, AUTH0_DOMAIN, MAPBOX_API } from '@env';
import { AppThemeProvider, CustomIcon } from '@theme/index';
import { PaperProvider, Text } from 'react-native-paper';
import { persistor, store } from './app/store';

import { ApolloProvider } from '@apollo/client';
import { Auth0Provider } from 'react-native-auth0';
import { AuthProvider } from '@app/context/auth-context/AuthContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DefualtErrorScreen from '@app/components/defualt-error';
import { ErrorBoundary } from 'react-error-boundary';
import { FileHandlerClient } from '@app/context/file-handler';
import { GeoLocationProvider } from '@app/context/geo-location';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Mapbox from '@rnmapbox/maps';
import { NavigationContainer } from '@react-navigation/native';
import { Notification } from '@app/notification/Notification';
import { PermissionProvider } from '@app/context/permissions/permission';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import { RootNavController } from '@app/components';
import { RootSiblingParent } from 'react-native-root-siblings';
import { StyleSheet } from 'react-native';
import apolloClient from '@services/apolloClient';
import useAppTheme from '@hooks/useAppTheme';

/*
 */
const App = () => {
  const { themePreference, theme } = useAppTheme();
  Mapbox.setAccessToken(MAPBOX_API);

  return (
    <RootSiblingParent>
      <Auth0Provider domain={AUTH0_DOMAIN} clientId={AUTH0_CLIENT}>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <PermissionProvider>
                <AuthProvider>
                  <FileHandlerClient>
                    <GeoLocationProvider>
                      <Notification>
                        <GestureHandlerRootView
                          style={styles.gestureHandlerRootView}>
                          <BottomSheetModalProvider>
                            <AppThemeProvider value={themePreference}>
                              <PaperProvider
                                theme={theme}
                                settings={{
                                  rippleEffectEnabled: false,
                                  icon: CustomIcon,
                                }}>
                                <NavigationContainer theme={theme}>
                                  <RootNavController />
                                </NavigationContainer>
                              </PaperProvider>
                            </AppThemeProvider>
                          </BottomSheetModalProvider>
                        </GestureHandlerRootView>
                      </Notification>
                    </GeoLocationProvider>
                  </FileHandlerClient>
                </AuthProvider>
              </PermissionProvider>
            </PersistGate>
          </Provider>
        </ApolloProvider>
      </Auth0Provider>
    </RootSiblingParent>
  );
};

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

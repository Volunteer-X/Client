import 'react-native-url-polyfill/auto';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { Auth0Provider } from 'react-native-auth0';
import {
  AUTH0_DOMAIN,
  AUTH0_CLIENT,
  MAPBOX_API,
  DEV_FILE,
  DEV_HOST,
} from '@env';
import { ApolloProvider } from '@apollo/client';
import { PersistGate } from 'redux-persist/integration/react';
import Mapbox from '@rnmapbox/maps';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { store, persistor } from './app/store';

import { AppThemeProvider } from '@theme/index';
import useAppTheme from '@hooks/useAppTheme';

import apolloClient from '@services/apolloClient';

import { AuthProvider } from '@app/context/auth-context/AuthContext';
import { RootNavController } from '@app/components';
import { GeoLocationProvider } from '@app/context/geo-location';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { IconProps } from 'react-native-vector-icons/Icon';
import { PermissionProvider } from '@app/context/permissions/permission';
import { Notification } from '@app/notification/Notification';
import { FileHandlerClient } from '@app/context/file-handler';

/*
 */
const App = () => {
  const { themePreference, theme } = useAppTheme();
  Mapbox.setAccessToken(MAPBOX_API);

  const customIcon = (
    props: React.JSX.IntrinsicAttributes &
      React.JSX.IntrinsicClassAttributes<Ionicons> &
      Readonly<IconProps>,
  ) => {
    return <Ionicons {...props} />;
  };

  return (
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
                            <ThemeProvider>
                              <PaperProvider
                                theme={theme}
                                settings={{
                                  rippleEffectEnabled: false,
                                  icon: customIcon,
                                }}>
                                <NavigationContainer theme={theme}>
                                  <RootNavController />
                                </NavigationContainer>
                              </PaperProvider>
                            </ThemeProvider>
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
  );
};

export default App;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
});

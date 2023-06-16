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
import { MAP_API_KEY } from '@env';

import { store } from './app/store';
import RootNav from './src/navigation/RootNav';
import { BottomSheetComponent } from './src/components';
import GoogleStaticMaps from './src/components/googleStaticMaps';

const App = () => {
  const scheme = useColorScheme();
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <PaperProvider>
            <NavigationContainer
              theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
              {/* <RootNav /> */}
              <GoogleStaticMaps
                center="City Hall, New York, NY"
                latitude=""
                longitude=""
                zoom={15}
                size={{ width: 640, height: 640 }}
                path={[
                  { pathLatitude: '123', pathLongitude: '132' },
                  { pathLatitude: '563', pathLongitude: '0898' },
                ]}
                apiKey={MAP_API_KEY}
                onError={() => {}}
                onLoad={() => {}}
              />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

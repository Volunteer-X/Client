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
                // "City Hall, New York, NY"
                center={{ latitude: '40.737102', longitude: '-73.990318' }}
                zoom={14}
                size={{ width: 640, height: 640 }}
                // paths={[
                //   {
                //     points: [
                //       { latitude: '40.737102', longitude: '-73.990318' },
                //       { latitude: '40.749825', longitude: '-73.987963' },
                //       { latitude: '40.755823', longitude: '-73.986397' },
                //     ],
                //   },
                // ]}
                enableImplicitPositioning={true}
                markers={[
                  {
                    location: {
                      latitude: '40.737102',
                      longitude: '-73.990318',
                    },
                    color: 'purple',
                    size: 'mid',
                  },
                ]}
                apiKey={MAP_API_KEY}
                onError={() => {}}
                onLoad={() => {}}
                containerStyle={{ flex: 1, margin: 15, borderRadius: 100 }}
              />
            </NavigationContainer>
          </PaperProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;

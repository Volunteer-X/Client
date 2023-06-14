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
import { BottomSheetComponent } from './src/components';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  const scheme = useColorScheme();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <PaperProvider>
          <NavigationContainer
            theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            {/* <RootNav /> */}
            <BottomSheetComponent />
          </NavigationContainer>
        </PaperProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;

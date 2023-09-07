import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';
import fontConfig from './font';

const customDarkTheme = {
  ...MD3DarkTheme,
  fonts: configureFonts({ config: fontConfig }),
};

const customLightTheme = {
  ...MD3LightTheme,
  fonts: configureFonts({ config: fontConfig }),
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(customLightTheme, LightTheme);
export const CombinedDarkTheme = merge(customDarkTheme, DarkTheme);

export type AppTheme = typeof CombinedDefaultTheme;

export { AppThemeProvider, ThemeContext } from './themeContext';

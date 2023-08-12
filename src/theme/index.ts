import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import merge from 'deepmerge';

const customDarkTheme = {
  ...MD3DarkTheme,
};

const customLightTheme = {
  ...MD3LightTheme,
};

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

export const CombinedDefaultTheme = merge(customLightTheme, LightTheme);
export const CombinedDarkTheme = merge(customDarkTheme, DarkTheme);

export type AppTheme = typeof CombinedDefaultTheme;

export { AppThemeProvider, ThemeContext } from './themeContext';

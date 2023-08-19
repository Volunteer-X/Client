import { useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import {
  CombinedDarkTheme,
  CombinedDefaultTheme,
  ThemeContext,
} from '@theme/index';

const useAppTheme = () => {
  const { setThemeScheme } = useContext(ThemeContext);
  const scheme = useColorScheme();

  const [isThemeDark, setIsThemeDark] = useState(scheme === 'dark');

  let theme = isThemeDark ? CombinedDarkTheme : CombinedDefaultTheme;

  const _setThemeScheme = useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const themePreference = useMemo(
    () => ({ setThemeScheme: _setThemeScheme, isThemeDark: isThemeDark }),
    [isThemeDark, _setThemeScheme],
  );

  return { themePreference, setThemeScheme, theme };
};

export default useAppTheme;

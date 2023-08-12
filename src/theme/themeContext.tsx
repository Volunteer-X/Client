import React, { createContext } from 'react';

type ThemeContextProps = {
  setThemeScheme: () => void;
  isThemeDark: boolean;
};

export const ThemeContext = createContext<ThemeContextProps>({
  setThemeScheme: () => {},
  isThemeDark: false,
});

type Props = {
  children: React.ReactNode;
  value: ThemeContextProps;
};

export const AppThemeProvider = (props: Props) => {
  const { children, value } = props;

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

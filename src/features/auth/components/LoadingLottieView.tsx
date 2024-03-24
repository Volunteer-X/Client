import { AppTheme } from '@app/theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import anim from '@assets/anims/anim-get-ready.json';

export const LoadingLottieView = ({
  theme,
  style,
}: {
  theme: AppTheme;
  style: any;
}) => (
  <LottieView
    style={style}
    source={anim}
    resizeMode="cover"
    autoPlay
    loop
    colorFilters={[
      {
        keypath: 'Layer 2',
        color: theme.colors.primaryContainer,
      },
      { keypath: 'Layer 3', color: theme.colors.onTertiaryContainer },
      { keypath: 'Layer 4', color: theme.colors.tertiaryContainer },
      { keypath: 'Layer 5', color: theme.colors.onTertiaryContainer },
      { keypath: 'Layer 6', color: theme.colors.tertiaryContainer },
      { keypath: 'Layer 7', color: theme.colors.tertiaryContainer },
    ]}
  />
);

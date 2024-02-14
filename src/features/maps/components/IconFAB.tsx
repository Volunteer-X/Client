import {
  Animated,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import useAppTheme from '@app/hooks/useAppTheme';
import LinearGradient from 'react-native-linear-gradient';
import { AnimatedFABProps, FAB as RNFAB } from 'react-native-paper';
import { makeStyles } from './IconFAB.style';
import { LinearGradientProps } from 'react-native-linear-gradient';

type Props = {
  icon: string;
  color?: string;
  fabStyle?: StyleProp<ViewStyle>;
  onPress: () => void;
} & LinearGradientProps;

const IconFAB = ({
  color = '#A633E9',
  icon,
  fabStyle,
  onPress,
  ...props
}: Props) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <LinearGradient
      {...props}
      // colors={gradientColor}
      // useAngle={true}
      // angle={90}
      // angleCenter={{ x: 0.5, y: 0.5 }}
      style={[props.style, styles.gradient]}
      start={{ x: 1, y: 0 }}
      end={{ x: 0, y: 1 }}>
      <RNFAB
        {...props}
        icon={icon}
        color={color}
        style={[fabStyle, styles.FAB]}
        size="medium"
        mode="flat"
        onPress={onPress}
      />
    </LinearGradient>
  );
};

export default IconFAB;

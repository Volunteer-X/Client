import React from 'react';
import {
  ImageProps,
  Pressable,
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { Text, Avatar as PaperAvatar } from 'react-native-paper';
import useAppTheme from '@app/hooks/useAppTheme';
import { makeStyle } from './Avatar.style';

type AvatarProps = {
  name?: string;
  uri?: string;
  size?: number;
  avatarContainerStyle?: StyleProp<ViewStyle>;
  avatarStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  onPress?(props: any): void;
  onLongPress?(props: any): void;
} & (
  | {
      showBorder: true;
      borderColor?: string;
      borderStyle?: StyleProp<ViewStyle>;
    }
  | { showBorder?: false; borderColor?: never; borderStyle?: never }
);

export const Avatar = ({
  name,
  uri,
  size = 20,
  showBorder = false,
  borderColor,
  avatarContainerStyle = {},
  avatarStyle = {},
  textStyle = {},
  borderStyle,
  onPress,
  onLongPress,
}: AvatarProps) => {
  const { theme } = useAppTheme();
  const styles = makeStyle(theme, size);

  var avatarColor: string;
  var avatarName: string;

  // get color and initials
  const getColor = () => {
    const _name = name || '';
    if (_name) {
      avatarName = `${_name.toUpperCase().split(' ')[0].charAt(0)}`;
    } else {
      avatarName = '';
    }

    let sumChars = 0;
    for (let i = 0; i < _name.length; i++) {
      sumChars += _name.charCodeAt(i);
    }

    const colors = [
      '#FFCDD2',
      '#F8BBD0',
      '#E1BEE7',
      '#D1C4E9',
      '#C5CAE9',
      '#BBDEFB',
      '#B3E5FC',
      '#B2EBF2',
      '#B2DFDB',
      '#C8E6C9',
      '#DCEDC8',
      '#F0F4C3',
      '#FFF9C4',
      '#FFECB3',
      '#FFE0B2',
      '#FFCCBC',
      '#D7CCC8',
      '#F5F5F5',
      '#CFD8DC',
    ];

    avatarColor = colors[sumChars % colors.length];
  };

  const renderAvatar = () => {
    return (
      <PaperAvatar.Image
        source={{ uri }}
        size={size}
        style={[styles.avatarStyle, avatarStyle]}
      />
    );
  };

  const renderInitials = () => {
    getColor();
    return (
      <PaperAvatar.Text
        size={size}
        label={avatarName}
        style={[
          styles.avatarStyle,
          { backgroundColor: avatarColor },
          avatarStyle,
        ]}
        color={'#000'}
        labelStyle={[textStyle, styles.textStyle]}
      />
    );
  };

  const render = () => {
    if (uri) {
      return renderAvatar();
    } else if (name) {
      return renderInitials();
    } else {
      return (
        <PaperAvatar.Image
          source={require('@assets/images/placeholder.jpg')}
          size={size}
          style={[styles.avatarStyle, avatarStyle]}
        />
      );
    }
  };

  return (
    <Pressable
      disabled={!onPress}
      onPress={onPress}
      onLongPress={onLongPress}
      style={() => {
        if (showBorder) {
          return [
            styles.avatarContainer,
            styles.avatarBorder,
            { borderColor },
            borderStyle,
            avatarContainerStyle,
          ];
        }
        return [styles.avatarContainer, avatarContainerStyle];
      }}
      accessibilityRole="image">
      {render()}
    </Pressable>
  );
};

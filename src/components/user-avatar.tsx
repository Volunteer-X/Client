import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';
import React, { useState } from 'react';
import { Avatar, MD3Colors } from 'react-native-paper';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';
import { SIZES } from '@app/lib';

const UserAvatar = ({
  source,
  style,
  size = SIZES.xxLarge,
  onPress,
}: {
  source: AvatarImageSource;
  style?: StyleProp<ViewStyle>;
  size?: number;
  onPress: () => void;
}) => {
  const [imageSource, setImageSource] = useState<AvatarImageSource>(source);

  return (
    <Pressable onPress={onPress}>
      <Avatar.Image
        style={[style, styles.avatar]}
        size={size}
        source={imageSource}
        onError={() =>
          setImageSource(require('@assets/images/placeholder.jpg'))
        }
      />
    </Pressable>
  );
};

export default UserAvatar;

const styles = StyleSheet.create({
  avatar: {},
});

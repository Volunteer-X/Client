import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  TextLayoutEventData,
  TextStyle,
  View,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { Text } from 'react-native-paper';

type Prop = {
  children: React.ReactNode;
  // textStyles?: StyleProp<TextStyle>;
  numberOfLines: number;
};

export const ViewMoreText = ({
  children,
  // textStyles,
  numberOfLines = 3,
}: Prop) => {
  const [textshown, setTextShown] = React.useState(false);
  const [lengthMore, setLengthMore] = React.useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textshown);
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines);
  };

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textshown ? undefined : numberOfLines}>
        {children}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} style={styles.showMore}>
          {textshown ? 'Read less' : 'Read more'}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  fullTextWrapper: {
    opacity: 0,
    position: 'absolute',
    left: 0,
    right: 0,
  },
  showMore: {
    color: '#969696',
    marginTop: 5,
  },
});

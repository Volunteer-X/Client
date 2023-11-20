import {
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
} from 'react-native';
import React from 'react';
import { Text } from 'react-native-paper';

type Prop = {
  children: React.ReactNode;
  textStyles?: StyleProp<TextStyle>;
  numberOfLines: number;
  afterExpand?: () => void;
  afterCollapse?: () => void;
  onTextLayout?: (event: any) => void;
  renderViewMore?: (onPress: () => void) => React.ReactNode;
  readerViewLess?: (onPress: () => void) => React.ReactNode;
};

export const ViewMoreText = ({
  children,
  textStyles,
  numberOfLines = 3,
  afterExpand = () => {},
  afterCollapse = () => {},
  onTextLayout,
  renderViewMore,
  readerViewLess,
}: Prop) => {
  let trimmedTextHeight: number | null = null;
  let fullTextHeight: number | null = null;
  let shouldShowMore = false;

  const [isFullTextShown, setIsFullTextShown] = React.useState(true);
  const [_numberOfLines, setNumberOfLines] = React.useState<number | undefined>(
    numberOfLines,
  );

  const hideFullText = () => {
    if (isFullTextShown && trimmedTextHeight && fullTextHeight) {
      shouldShowMore = trimmedTextHeight < fullTextHeight;
      setIsFullTextShown(false);
    }
  };

  const onLayoutTrimmedText = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    trimmedTextHeight = height;
    console.log('trimmedTextHeight', trimmedTextHeight);

    hideFullText();
  };

  const onLayoutFullText = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    fullTextHeight = height;
    console.log('fullTextHeight', fullTextHeight);

    hideFullText();
  };

  const onPressMore = () => {
    setNumberOfLines(undefined);
    afterExpand();
  };

  const onPressLess = () => {
    setNumberOfLines(numberOfLines);
    afterCollapse();
  };

  const getWrapperStyle = () => {
    if (isFullTextShown) {
      return {
        opacity: 0,
      };
    }
    return {};
  };

  const _renderViewMore = () => (
    <Text onPress={onPressMore} style={styles.viewMoreText}>
      View more
    </Text>
  );

  const _renderViewLess = () => (
    <Text onPress={onPressLess} style={styles.viewMoreText}>
      View less
    </Text>
  );

  const renderFooter = () => {
    if (shouldShowMore) {
      if (numberOfLines > 0) {
        return (renderViewMore || _renderViewMore)(onPressMore);
      }
      return (readerViewLess || _renderViewLess)(onPressLess);
    }
    return null;
  };

  const renderFullText = () => {
    if (isFullTextShown) {
      return (
        <View onLayout={onLayoutFullText} style={styles.fullTextWrapper}>
          <Text style={textStyles}>{children}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <View style={getWrapperStyle()}>
      <View onLayout={onLayoutTrimmedText}>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={_numberOfLines}
          style={textStyles}>
          {children}
        </Text>
        {renderFooter()}
      </View>
      {renderFullText()}
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
  viewMoreText: {},
});

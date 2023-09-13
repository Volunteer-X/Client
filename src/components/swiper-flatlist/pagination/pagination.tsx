import React from 'react';
import { I18nManager, StyleSheet, View } from 'react-native';
import { PaginationProps } from './pagination-props';

import { MD3Colors, Text } from 'react-native-paper';

export const Pagination = ({
  size,
  paginationIndex = 0,
  paginationContainerStyle = {},
  paginationStyle = {},
  paginationTextStyle = {},
}: PaginationProps) => {
  return (
    <View style={[style.container, paginationContainerStyle]}>
      <View style={[style.paginationStyle, paginationStyle]}>
        <Text
          variant="labelMedium"
          style={[style.paginationTextStyle, paginationTextStyle]}>{`${
          paginationIndex + 1
        }/${size}`}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 25,
    justifyContent: 'flex-end',
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
  },
  paginationStyle: {
    borderRadius: 50,
    backgroundColor: MD3Colors.neutral10,
    opacity: 0.75,
    paddingHorizontal: 7.5,
    paddingVertical: 5,
  },
  paginationTextStyle: {
    fontWeight: '600',
  },
});

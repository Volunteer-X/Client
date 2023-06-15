import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';

const AddScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Text>Hello world</Text>
      </View>
    </View>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 300,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
});

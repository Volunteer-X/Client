import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, withTheme, Button } from 'react-native-paper';

const PingB = ({ theme }: { theme: any }) => {
  const styles = makeStyles(theme);
  return (
    <View style={styles.container}>
      <Text>Ping B here</Text>
      <Button>Ping!</Button>
    </View>
  );
};

export default withTheme(PingB);

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      paddingVertical: 30,
      paddingHorizontal: 20,
      marginHorizontal: 25,
      marginVertical: 50,
      borderRadius: 25,
      gap: 10,
      // changeable
      backgroundColor: theme.colors.background,
    },
  });

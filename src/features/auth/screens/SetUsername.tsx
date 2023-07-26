import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, withTheme } from 'react-native-paper';

const SetUsername = ({ theme }: { theme: any }) => {
  const styles = makeStyles(theme);

  return (
    <View>
      <Text>Set Username</Text>
    </View>
  );
};

export default withTheme(SetUsername);

const makeStyles = (theme: any) => {
  StyleSheet.create({});
};

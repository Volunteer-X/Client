import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, withTheme, Button } from 'react-native-paper';
import { PingProps } from '../../../navigation/type';

const PingA = ({ theme }: { theme: any }) => {
  const styles = makeStyles(theme);
  const navigation = useNavigation<PingProps>();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text variant="labelSmall" style={{ color: theme.colors.primary }}>
          1
        </Text>
        <Text
          variant="labelSmall"
          style={{ color: theme.colors.onSurfaceVariant }}>
          /2
        </Text>
      </View>
      <Text variant="headlineLarge">Create your Ping!</Text>
      <Text>Captions</Text>
      <Button
        onPress={() => {
          navigation.navigate('PingStepB');
        }}>
        Next step
      </Button>
    </View>
  );
};

export default withTheme(PingA);

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

import { Text, View } from 'react-native';
import React from 'react';
import { Button, makeStyles } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { PingProps } from '../../../navigation/type';

export const PingStepA = () => {
  const styles = useStyles();
  const navigation = useNavigation<PingProps>();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: '#e12' }}>1</Text>
        <Text style={styles.pagination}>/2</Text>
      </View>
      <Text style={{ color: '#000', fontWeight: '700', fontSize: 23 }}>
        Create your Ping!
      </Text>
      <Text>Captions</Text>
      <Button
        title={'Next step'}
        onPress={() => {
          navigation.navigate('PingStepB');
        }}
      />
    </View>
  );
};

export const PingStepB = () => {
  return (
    <View style={styles.container}>
      <Text>Ping B here</Text>
      <Button title={'Next step'} />
    </View>
  );
};

const useStyles = makeStyles(theme => ({
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
    backgroundColor: theme.colors.primary,
  },
  pagination: {
    color: '#000',
  },
}));

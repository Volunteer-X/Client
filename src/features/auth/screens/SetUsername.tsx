import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  withTheme,
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';

import { AuthStackParamList } from '../../../navigation/type';

type Props = StackScreenProps<AuthStackParamList, 'SetUsername'>;

const SetUsername = ({
  theme,
  route,
  navigation,
}: {
  theme: any;
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const [username, setUsername] = useState('');

  const styles = makeStyles(theme);

  useEffect(() => {
    console.log(username);
  }, [username]);

  const hasError = () => {
    return username === 'amil';
  };

  const handleContinue = () => {
    console.log('Clicked Continue');

    navigation.navigate('SetPicks', { username: username });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineLarge">Pick your Username</Text>
        <Text variant="titleSmall">subtitle text here</Text>
      </View>
      <View>
        <TextInput
          label="Username"
          mode="outlined"
          value={username}
          onChangeText={value => setUsername(value)}
          left={<TextInput.Icon icon="account-circle" />}
          right={
            username ? (
              <TextInput.Icon icon={hasError() ? 'close' : 'check'} />
            ) : (
              ''
            )
          }
        />
        <HelperText
          type="error"
          visible={hasError()}>{`${username} already exists`}</HelperText>
      </View>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        onPress={() => handleContinue()}>
        Continue
      </Button>
    </View>
  );
};

export default withTheme(SetUsername);

const makeStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      gap: 10,
      marginVertical: 50,
      marginHorizontal: 25,
    },
    buttonStyle: {
      borderRadius: 10,
    },
  });

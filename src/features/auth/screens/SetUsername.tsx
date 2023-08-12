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

import { AuthStackParamList } from '../../../types/type';
import { AppTheme } from '../../../theme';

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

  const possibleUsername = route.params.possibleUsername;

  const styles = makeStyles(theme);

  const subtitleText = possibleUsername ? (
    <View style={styles.possibleUsernameContainer}>
      <Text variant="titleMedium" style={styles.possibleUsername}>
        {possibleUsername}
      </Text>
      <Text variant="bodySmall" style={styles.subtitle}>
        Suggested username
      </Text>
    </View>
  ) : null;

  useEffect(() => {
    possibleUsername !== undefined ? setUsername(possibleUsername) : null;
  }, [possibleUsername]);

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
        <Text variant="headlineLarge" style={styles.headline}>
          Pick a username
        </Text>
        {subtitleText}
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

const makeStyles = (theme: AppTheme) =>
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
    headline: {
      fontWeight: '700',
    },
    possibleUsernameContainer: {
      alignItems: 'center',
      marginVertical: 10,
      gap: 5,
    },
    subtitle: {},
    possibleUsername: {
      fontStyle: 'normal',
      fontWeight: '900',
      color: theme.colors.onTertiaryContainer,
    },
  });

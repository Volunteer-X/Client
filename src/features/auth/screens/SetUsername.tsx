import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Button,
  Text,
  withTheme,
  TextInput as RNTextInput,
} from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { TextInput } from '../../../components';
import {
  useForm,
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InferType, object, string } from 'yup';

import { AuthStackParamList } from '../../../types/type';
import { AppTheme } from '../../../theme';
import { Defaults } from '../../../lib/constants/values';

type Props = StackScreenProps<AuthStackParamList, 'SetUsername'>;

// (?!.*\.{2,})(?!\.)(?!.*\.$)[a-zA-Z0-9_\.]+
const scheme = object({
  username: string()
    .trim()
    .matches(new RegExp('^(?!.*.{2,})(?!.)(?!.*.$)[a-zA-Z0-9_.]+$'))
    .min(Defaults.MIN_LEN_USERNAME)
    .max(Defaults.MAX_LEN_USERNAME)
    .required(),
}).required();

type FormValues = InferType<typeof scheme>;

const SetUsername = ({
  theme,
  route,
  navigation,
}: {
  theme: any;
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const { ...methods } = useForm<FormValues>({ resolver: yupResolver(scheme) });

  const [username, setUsername] = useState('');

  const { possibleUsername } = route.params;

  const styles = makeStyles(theme);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
    setUsername(data.username);
    // navigation.navigate('SetPicks', { username: username });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };

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

  return (
    <View style={styles.container}>
      <View>
        <Text variant="headlineLarge" style={styles.headline}>
          Pick a username
        </Text>
        {subtitleText}
      </View>
      <FormProvider {...methods}>
        <TextInput
          name="username"
          label="Username"
          defaultValue={possibleUsername}
          mode="outlined"
          left={<RNTextInput.Icon icon="account-circle" />}
          right={
            username ? (
              <RNTextInput.Icon
                icon={methods.formState.isValid ? 'check' : 'close'}
              />
            ) : (
              ''
            )
          }
          rules={{ required: true }}
          helperType="error"
          helperText={methods.formState.errors.username?.message}
        />
      </FormProvider>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        onPress={methods.handleSubmit(onSubmit, onError)}
        disabled={methods.formState.isValid}>
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

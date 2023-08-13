import React, { useCallback, useEffect, useState } from 'react';
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
  useWatch,
} from 'react-hook-form';
import { InferType } from 'yup';

import { AuthStackParamList } from '../../../types/type';
import { AppTheme } from '../../../theme';
import { useYupResolver } from '../../../hooks';
import { yupScheme } from '../helpers/yupSchema';

type Props = StackScreenProps<AuthStackParamList, 'SetUsername'>;

type FormValues = InferType<typeof yupScheme>;

const SetUsername = ({
  theme,
  route,
  navigation,
}: {
  theme: any;
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const styles = makeStyles(theme);
  const resolver = useYupResolver<FormValues>(yupScheme);
  const { control, trigger, formState, ...methods } = useForm<FormValues>({
    // resolver: yupResolver(scheme),
    resolver,
  });
  const [username, setUsername] = useState('');
  const { possibleUsername } = route.params;

  const _username = useWatch({
    control,
    name: 'username',
    defaultValue: possibleUsername ?? '',
  });

  const triggerRevalidation = useCallback(async () => {
    return await trigger('username', { shouldFocus: true });
  }, [trigger]);

  useEffect(() => {
    triggerRevalidation().then(result => console.log(result));
  }, [_username, triggerRevalidation]);

  // useEffect(() => {
  //   const subscription = watch(({ username }, { name, type }) =>
  //     console.log('🚀 ~ useEffect', username, formState.isValid),
  //   );
  //   if (formState.isValid) {
  //     console.log(
  //       '🚀 ~ file:  ~ useEffect ~ unsubscribe: Here',
  //       formState.isValid,
  //     );
  //     subscription.unsubscribe();
  //   }
  // }, [formState.isValid, watch]);

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log('🚀 ~ file: SetUsername.tsx:60 ~ data:', data);

    setUsername(data.username);
    // navigation.navigate('SetPicks', { username: username });
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    console.log('🚀 ~ file: SetUsername.tsx:65 ~ errors:', errors);
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
      <FormProvider
        trigger={trigger}
        control={control}
        formState={formState}
        {...methods}>
        <TextInput
          name="username"
          label="Username"
          defaultValue={possibleUsername}
          mode="outlined"
          left={<RNTextInput.Icon icon="account-circle" />}
          right={
            methods.getValues().username !== '' ? (
              <RNTextInput.Icon icon={formState.isValid ? 'check' : 'close'} />
            ) : (
              ''
            )
          }
          rules={{ required: true }}
          helperType="error"
          helperText={formState.errors.username?.message}
        />
      </FormProvider>
      <Button
        mode="contained"
        style={styles.buttonStyle}
        onPress={methods.handleSubmit(onSubmit, onError)}
        disabled={!formState.isValid}>
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

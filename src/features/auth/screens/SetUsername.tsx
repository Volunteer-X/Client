import { Button, TextInput as RNTextInput, Text } from 'react-native-paper';
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { AppIcons } from '@app/theme/icon';
import { AppTheme } from '@theme/index';
import { AuthStackParamList } from '@ts-types/type';
import { CHECK_USERNAME_AVAILABILITY } from '../graphql/auth.query';
import { InferType } from 'yup';
import { StackScreenProps } from '@react-navigation/stack';
import { SuggestionsComponent } from '../components/SuggestionsComponent';
import { TextInput } from '@components/index';
import useAppTheme from '@app/hooks/useAppTheme';
import { useLazyQuery } from '@apollo/client';
import { useYupResolver } from '@hooks/index';
import { yupScheme } from '../helpers/yupSchema';

type Props = StackScreenProps<AuthStackParamList, 'SetUsername'>;

type FormValues = InferType<typeof yupScheme>;

const SetUsername = ({
  route,
  navigation,
}: {
  route: Props['route'];
  navigation: Props['navigation'];
}) => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  const { suggestedUsername } = route.params;
  // const suggestedUsername = 'amilmohd155';

  const [getUsernameAvailability, { data, loading }] = useLazyQuery(
    CHECK_USERNAME_AVAILABILITY,
    {
      variables: { username: suggestedUsername ? suggestedUsername : '' },
    },
  );

  /*  yup Validation && useForm hook */
  const resolver = useYupResolver<FormValues>(yupScheme);

  const { trigger, formState, ...methods } = useForm<FormValues>({
    resolver,
    defaultValues: {
      username: suggestedUsername,
    },
  });

  const { isValid, errors } = formState;

  /* useWatch to watch changes in the text field. */
  const watchUsername = methods.watch('username');

  /* Tiggers revalidation based on the useWatch Hook */
  const triggerRevalidation = useCallback(async () => {
    return await trigger('username', { shouldFocus: true });
  }, [trigger]);

  // UseEffect to run tiggerRevalidation everytime watch value changes.
  useEffect(() => {
    triggerRevalidation().then(result => {
      if (result) {
        getUsernameAvailability({
          variables: { username: watchUsername },
          pollInterval: 10,
        });
      }
    });
  }, [getUsernameAvailability, triggerRevalidation, watchUsername]);

  useEffect(() => {
    if (isValid) {
      if (data?.isUsernameAvailable !== undefined) {
        if (!data?.isUsernameAvailable) {
          methods.setError('username', {
            type: 'manual',
            message: 'Username already exists',
          });
        }
      }
    }
  }, [methods, isValid, data?.isUsernameAvailable]);

  const onSubmit: SubmitHandler<FormValues> = formData => {
    navigation.navigate('SetPicks', { username: formData.username });
  };

  // Todo handle onSubmition errors
  const onError: SubmitErrorHandler<FormValues> = (submitionErrors, e) => {
    console.error('🚀 ~ file: SetUsername.tsx:65 ~ errors:', submitionErrors);
  };

  // ! possible error of suggested username being an exisitng username
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge" style={styles.headline}>
        Pick a username
      </Text>
      <SuggestionsComponent username={suggestedUsername} styles={styles} />

      <FormProvider trigger={trigger} formState={formState} {...methods}>
        <TextInput
          name="username"
          label="Username"
          // defaultValue={defaultValue}
          mode="outlined"
          placeholder="username..."
          left={<RNTextInput.Icon icon={AppIcons.AT} />}
          right={
            <RNTextInput.Icon
              loading={loading}
              color={
                isValid && (data?.isUsernameAvailable || loading)
                  ? '#75ed51'
                  : theme.colors.error
              }
              icon={
                isValid && data?.isUsernameAvailable
                  ? AppIcons.CHECK_DONE
                  : isValid
                  ? AppIcons.CHECK
                  : AppIcons.CLOSE
              }
            />
          }
          rules={{ required: true }}
          helperType="error"
          helperText={errors.username?.message}
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

export default SetUsername;

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
    subtitle: {
      fontStyle: 'italic',
    },
    possibleUsername: {
      // fontWeight: '900',
      color: '#FFF',
    },
  });

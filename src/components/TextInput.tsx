import {
  HelperText,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native-paper';
import {
  UseControllerProps,
  useController,
  useFormContext,
} from 'react-hook-form';

import React from 'react';
import { View } from 'react-native';

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
  helperText?: string;
  helperType?: 'error' | 'info';
}

const ControlledInput = ({
  label,
  name,
  rules,
  defaultValue,
  helperText,
  helperType = 'error',
  ...inputProps
}: TextInputProps) => {
  const {
    field,
    formState: { isValid },
  } = useController({ name, rules, defaultValue });

  return (
    <View>
      <RNTextInput
        label={label}
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        ref={field.ref}
        {...inputProps}
      />
      <HelperText type={helperType} visible={!isValid}>
        {helperText}
      </HelperText>
    </View>
  );
};

const TextInput = (props: TextInputProps) => {
  const formContext = useFormContext();

  const { name } = props;

  if (!formContext || !name) {
    const message = !formContext
      ? 'TextInput must be wrapped by the FormProvider'
      : 'Name must be defined';
    console.error(message);
    return null;
  }

  return <ControlledInput {...props} />;
};

export default TextInput;

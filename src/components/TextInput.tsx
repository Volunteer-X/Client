import React from 'react';
import { View } from 'react-native';
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

interface TextInputProps extends RNTextInputProps, UseControllerProps {
  label: string;
  defaultValue?: string;
  left: React.ReactNode;
  right: React.ReactNode;
  helperText: string;
}

const ControlledInput = (props: TextInputProps) => {
  const { formState } = useFormContext();

  const {
    label,
    name,
    rules,
    defaultValue,
    left,
    right,
    helperText,
    ...inputProps
  } = props;

  const { field } = useController({ name, rules, defaultValue });

  return (
    <View>
      <RNTextInput {...inputProps} label={label} />
      <RNTextInput
        label={label}
        mode="outlined"
        value={field.value}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        left={left}
        right={right}
        {...inputProps}
      />
      <HelperText type="error" visible={formState.isValid}>
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

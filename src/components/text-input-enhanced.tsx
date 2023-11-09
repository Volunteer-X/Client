import React, { useState } from 'react';
import { StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper';

interface Props extends TextInputProps {
  multiline?: boolean;
  required?: boolean; //visible of 'required' Helper text
  maxLength?: number;
  minLength?: number;
  textInputStyle?: StyleProp<TextStyle>;
  helperContainerStyle?: StyleProp<ViewStyle>;
  onTextChanged?: (text: string) => void;
}

export const TextInputEnhanced = ({
  maxLength = 500,
  minLength = 0,
  required = false,
  multiline = false,
  textInputStyle,
  helperContainerStyle,
  onTextChanged,
  ...textInputProps
}: Props) => {
  const [characterCount, setCharacterCount] = useState(0);

  const _onChangeText = (text: string) => {
    setCharacterCount(text.length);
    onTextChanged && onTextChanged(text);
  };

  return (
    <>
      <TextInput
        multiline={multiline}
        style={textInputStyle}
        textContentType="none"
        textBreakStrategy="highQuality"
        onChangeText={_onChangeText}
        maxLength={maxLength}
        dense
        {...textInputProps}
      />
      <View style={[helperContainerStyle]}>
        {required && (
          <HelperText type="error" visible={required}>
            Required
          </HelperText>
        )}
        {characterCount > maxLength / 1.5 && (
          <HelperText
            type={characterCount >= maxLength ? 'error' : 'info'}
            visible
            style={{ textAlign: 'right' }}>
            {characterCount}/{maxLength}
          </HelperText>
        )}
      </View>
    </>
  );
};

import React from 'react';
import { Text } from 'react-native-paper';
import { View } from 'react-native';

export const SuggestionsComponent = ({
  username,
  styles,
}: {
  username?: string;
  styles: any;
}) => (
  <>
    {username ? (
      <View style={styles.possibleUsernameContainer}>
        <Text variant="bodyLarge" style={styles.possibleUsername}>
          {`@${username}`}
        </Text>
        <Text variant="bodySmall" style={styles.subtitle}>
          Suggested username
        </Text>
      </View>
    ) : null}
  </>
);

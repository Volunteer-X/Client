import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Text,
  withTheme,
  IconButton,
  Chip,
  Divider,
  TextInput,
} from 'react-native-paper';
import { PingANavProp } from '@ts-types/type';
import { AppTheme } from '@app/theme';
import useAppTheme from '@hooks/useAppTheme';
import { PicksLabel } from '@app/lib';

const { height, width } = Dimensions.get('window');

const PingA = () => {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);
  const navigation = useNavigation<PingANavProp>();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text variant="titleLarge" style={styles.headerTitle}>
          Create a ping
        </Text>
        <IconButton icon="chevron-right" size={36} />
      </View>
      {/* Picks */}
      <View style={[styles.subContainer, styles.picksContainer]}>
        <Text variant="titleLarge" style={styles.pickTitle}>
          Picks
        </Text>
        <View style={styles.picksHorizontalContainer}>
          <Chip icon="home" style={styles.chip} mode="outlined">
            {PicksLabel.Technology}
          </Chip>
          <Chip icon="home" style={styles.chip} mode="outlined">
            {PicksLabel.Art}
          </Chip>
          <Chip icon="home" style={styles.chip} mode="outlined">
            {PicksLabel.Children}
          </Chip>
          <Chip icon="home" style={styles.chip} mode="outlined">
            {PicksLabel.Disaster}
          </Chip>
          <Chip
            icon="home"
            style={styles.chip}
            mode="outlined"
            selected
            showSelectedOverlay
            compact>
            {PicksLabel.Environment}
          </Chip>
        </View>
      </View>
      <View style={[styles.subContainer]}>
        <TextInput
          theme={{ colors: { primary: 'blue' } }}
          placeholder="An interesting title"
          underlineStyle={styles.textInput}
          contentStyle={styles.textInputContent}
        />
        <TextInput
          multiline
          placeholder="What's happening?"
          style={[styles.textInput, styles.textArea]}
        />
      </View>
    </View>
  );
};

export default withTheme(PingA);

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 15,
      paddingTop: 10,
      gap: 10,
      // ! Change
      backgroundColor: theme.colors.surface,
    },
    subContainer: {
      padding: 10,
      borderRadius: 10,

      // ! Change
      backgroundColor: theme.colors.surfaceDisabled,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      fontWeight: 'bold',
      letterSpacing: 2.5,
    },
    pickTitle: {
      fontWeight: '600',
      letterSpacing: 1.1,
    },
    picksContainer: {
      gap: 10,
    },
    picksHorizontalContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    chip: {
      paddingHorizontal: 2.5,
      paddingVertical: 5,
      marginRight: 7.5,
      marginVertical: 5,
    },
    textInput: {},
    textArea: {
      minHeight: height / 5,
    },
    textInputContent: {
      // backgroundColor: '#EEE',
      borderColor: '#432',
    },
  });

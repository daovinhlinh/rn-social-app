import React from 'react';
import {View, StyleSheet, TextInput, Button} from 'react-native';

export const MessageScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Heelo" style={styles.input} />

      <Button title="click me" onPress={() => navigation.push('Chat')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  input: {
    paddingVertical: 20,
    backgroundColor: 'white',
    marginBottom: 50,
  },
});

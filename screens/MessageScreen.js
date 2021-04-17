import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

export const MessageScreen = () => {
  const DismissKeyboard = ({children}) => (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      {children}
    </TouchableWithoutFeedback>
  );
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <TextInput placeholder="Heelo" style={styles.input} />
        <TextInput placeholder="Heelo" style={styles.input} />
        <TextInput placeholder="Heelo" style={styles.input} />
        <TextInput placeholder="Heelo" style={styles.input} />
        <TextInput placeholder="Heelo" style={styles.input} />
        <TextInput placeholder="Heelo" style={styles.input} />
      </View>
    </DismissKeyboard>
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

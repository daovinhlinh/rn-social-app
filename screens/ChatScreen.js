import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

export const ChatScreen = () => {
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
        <Text>This is chat sceren</Text>
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

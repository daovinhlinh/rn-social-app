import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Notification screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AddPost = () => {
  return (
    <View style={styles.container}>
      <Text>Add post screen</Text>
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

export default AddPost;

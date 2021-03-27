import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export const Search = (props) => {
  const {placeholder, textChange, value, bgColor, color, width} = props;
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" color="#000" size={20} />
      <TextInput
        keyboardType="default"
        placeholder={placeholder}
        style={[styles.search, {color: color, width: width}]}
        onChangeText={(text) => textChange(text)}
        value={value}
        multiline={false}
        placeholderTextColor="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
  },
  search: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
    borderRadius: 50,
  },
});

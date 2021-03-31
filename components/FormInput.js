import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const FormInput = (props) => {
  const {
    keyboardType,
    placeholder,
    autoCorrect,
    textChange,
    value,
    secure,
    bgColor,
    color,
    subText,
  } = props;
  return (
    <View>
      <Text
        style={{
          paddingLeft: 10,
          color: '#acacac',
          textTransform: 'capitalize',
          fontWeight: 'bold',
        }}>
        {subText}
      </Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        autoCorrect={autoCorrect}
        style={[
          styles.btn,
          {
            backgroundColor: bgColor || 'transparent',
            color: color || 'rgba(255,255,255,1)',
          },
        ]}
        onChangeText={(text) => textChange(text)}
        value={value}
        secureTextEntry={secure}
        multiline={false}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 0.8 * width,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 18,
    borderColor: '#a7a7a7',
    borderBottomWidth: 0.5,
    marginBottom: 20,
    color: 'rgba(255,255,255,1)',
  },
});

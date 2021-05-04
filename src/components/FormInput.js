import React from 'react';
import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

export const FormInput = (props) => {
  const {
    keyboardType,
    placeholder,
    textChange,
    value,
    secure,
    bgColor,
    color,
    subText,
    icon,
  } = props;
  return (
    <View
      style={{
        marginBottom: 20,
        backgroundColor: bgColor || 'transparent',
        alignItems: 'center',
      }}>
      {subText ? (
        <Text
          style={{
            paddingLeft: 10,
            color: '#acacac',
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}>
          {subText}
        </Text>
      ) : null}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderColor: '#a7a7a7',
          borderBottomWidth: 0.5,
        }}>
        <Ionicons
          name={icon}
          size={25}
          color={'black'}
          style={{paddingRight: 10}}
        />
        <TextInput
          keyboardType={keyboardType || 'default'}
          placeholder={placeholder}
          style={[
            styles.btn,
            {
              color: color || 'rgba(255,255,255,1)',
            },
          ]}
          onChangeText={(text) => textChange(text)}
          value={value}
          secureTextEntry={secure}
          multiline={false}
          placeholderTextColor="#acacac"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    width: 0.7 * width,
    fontSize: 18,
    color: 'rgba(255,255,255,1)',
  },
});

import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');

export const FormButton = (props) => {
  const {title, color, backgroundColor, onPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={[
        styles.btnContainer,
        {backgroundColor: backgroundColor || '#4E69A2'},
      ]}
      onPress={onPress}>
      <Text style={[styles.btnText, {color: color || 'rgba(255,255,255,0.7)'}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: width * 0.8,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 10,
    // elevation: 8,
  },
  btnText: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

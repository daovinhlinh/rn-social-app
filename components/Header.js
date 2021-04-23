import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('screen');

export const Header = ({header, btnText, bgColor, navigation, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>{header}</Text>
      {btnText ? (
        <TouchableOpacity style={{flex: 1}} onPress={onPress}>
          <Text style={[styles.btnText, {backgroundColor: bgColor}]}>
            {btnText}
          </Text>
        </TouchableOpacity>
      ) : (
        <View style={{flex: 1}}></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#acacac',
    elevation: 2,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    flex: 1,
    textAlign: 'center',
  },
  btnText: {
    backgroundColor: '#3360ff',
    textAlign: 'center',
    // width: 80,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
    elevation: 10,
  },
});

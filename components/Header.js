import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {width, height} = Dimensions.get('window');

const Header = ({header, btnText, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{flex: 1}} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" size={25} color="#000" />
      </TouchableOpacity>
      <Text style={styles.header}>{header}</Text>
      <TouchableOpacity style={{flex: 1}}>
        <Text style={styles.btnText}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '8%',
    width: '100%',
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
    width: 70,
    alignSelf: 'flex-end',
    paddingVertical: 8,
    borderRadius: 8,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
    textTransform: 'uppercase',
  },
});

export default Header;

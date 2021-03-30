import React, {useEffect, useContext, useState} from 'react';

import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Header, FormInput} from '../components';
import {AuthContext} from '../navigation/AuthProvider';
import {colorStyles} from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const EditProfile = ({navigation, route}) => {
  const {user, logOut} = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    console.log(fullName);
  }, [fullName]);

  return (
    <View style={styles.container}>
      <Header header="Edit Profile" btnText={null} navigation={navigation} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={{uri: route.params.userImg}}
          style={{width: 100, height: 100}}
        />
        <TouchableOpacity style={{position: 'absolute'}}>
          <Ionicons name="camera" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <FormInput
        keyboardType="default"
        placeholder="Enter your name"
        autoCorrect={false}
        textChange={(text) => setFullName(text)}
        value={fullName}
        secureTextEntry={false}
        bgColor={colorStyles.white}
        color="#000"
      />
      <FormInput
        keyboardType="default"
        placeholder="Enter your description"
        autoCorrect={false}
        textChange={(text) => setDescription(text)}
        value={description}
        secureTextEntry={false}
        bgColor={colorStyles.white}
        color="#000"
      />
      <FormInput
        keyboardType="default"
        placeholder="Enter your phone number"
        autoCorrect={false}
        textChange={(text) => setPhone(text)}
        value={phone}
        secureTextEntry={false}
        bgColor={colorStyles.white}
        color="#000"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
  },
});

import React, {useState} from 'react';
import {useContext} from 'react';

import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';

import {FormButton, FormInput} from '../components';
import {colorStyles} from '../styles/';
import {AuthContext} from '../navigation/AuthProvider';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, googleLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require('../img/globe.png')} />
      <View>
        <FormInput
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          textChange={(text) => setEmail(text)}
          secure={false}
          icon="mail"
        />
        <FormInput
          value={password}
          placeholder="Password"
          keyboardType="default"
          textChange={(text) => setPassword(text)}
          secure={true}
          icon="key"
        />
        <FormButton
          title="Log in"
          onPress={() => {
            if (email === '' || password === '') {
              alert('Please enter email and password');
            } else {
              login(email, password);
            }
          }}
        />
        <FormButton
          title="Sign in with Google"
          backgroundColor={colorStyles.mauvelous}
          onPress={() => googleLogin()}
        />
      </View>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Don't have an acount? Create here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colorStyles.chambray,
  },
  text: {
    color: colorStyles.white,
  },
});

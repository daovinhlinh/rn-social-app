import React, {useState} from 'react';
import {useContext} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

import {FormInput} from '../components/FormInput';
import {FormButton} from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

export const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {register, login, googleLogin} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Image source={require('../img/globe.png')} />
      <View>
        <FormInput
          value={email}
          placeholder="Email"
          keyboardType="email-address"
          autoCorrect={false}
          textChange={(text) => setEmail(text)}
          secure={false}
        />
        <FormInput
          value={password}
          placeholder="Password"
          keyboardType="default"
          autoCorrect={false}
          textChange={(text) => setPassword(text)}
          secure={true}
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
          backgroundColor="#f29191"
          onPress={() => googleLogin()}
        />
      </View>
      {/* <View>
        <FormButton
          title="create new account"
          onPress={() => navigation.push('Register')}
        />
      </View> */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Don't have an acount? Create here</Text>
      </TouchableOpacity>
      {/* <FormButton title="Sign in with Facebook" backgroundColor="#5579ab" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#3B5998',
  },
  text: {
    color: '#fff',
  },
});

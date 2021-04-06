import React, {useState} from 'react';
import {useContext} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import {FormInput} from '../components/FormInput';
import {FormButton} from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Register = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const {register, signUpWithGoogle} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', left: 30, top: -20}}>
          <Ionicons name="arrow-back-circle-outline" size={40} color="#fff" />
        </TouchableOpacity>
        <Image source={require('../img/globe.png')} />
      </View>
      <View>
        <FormInput
          value={fname}
          placeholder="First name"
          keyboardType="default"
          textChange={(text) => setFname(text)}
          secure={false}
          icon="person"
        />
        <FormInput
          value={lname}
          placeholder="Last name"
          keyboardType="default"
          textChange={(text) => setLname(text)}
          secure={false}
          icon="person"
        />
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
        <FormInput
          value={password2}
          placeholder="Confirm Password"
          keyboardType="default"
          textChange={(text) => setPassword2(text)}
          secure={true}
          icon="key"
        />
      </View>
      <View style={{paddingBottom: 15}}>
        <FormButton
          title="create new account"
          onPress={() => {
            if (password === password2) {
              register(email, password, fname, lname);
            } else {
              alert('Confirm password must match');
            }
          }}
        />

        <FormButton
          title="sign up with google"
          onPress={() => {
            signUpWithGoogle();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#3B5998',
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'center',
  },
});

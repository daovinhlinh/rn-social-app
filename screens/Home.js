import React from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

export const Home = () => {
  const {user, logOut} = useContext(AuthContext);
  useEffect(() => {
    console.log(user);
  }, []);
  return (
    <View style={styles.container}>
      <Text>Hello {user.email}</Text>
      <Text>Signed In</Text>

      <Button title="logout" onPress={() => logOut()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    height: 300,
    width: 300,
    backgroundColor: 'orange',
    elevation: 10,
  },
});

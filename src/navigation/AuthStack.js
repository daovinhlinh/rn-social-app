import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Login, Register, OnboardingScreen} from '../screens';

import AsyncStorage from '@react-native-community/async-storage';
import {GoogleSignin} from '@react-native-community/google-signin';

const Stack = createStackNavigator();

export const AuthStack = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  let routeName;

  useEffect(() => {
    AsyncStorage.getItem('launched').then((value) => {
      if (value === null) {
        //set giá trị true cho launch
        AsyncStorage.setItem('launched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });

    GoogleSignin.configure({
      webClientId:
        '337343746484-plfcck9e15up3sc7ccq7gnav2q96gu0i.apps.googleusercontent.com',
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routeName = 'Onboarding';
  } else {
    routeName = 'Login';
  }

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={routeName}>
      <Stack.Screen component={OnboardingScreen} name="Onboarding" />
      <Stack.Screen component={Login} name="Login" />
      <Stack.Screen component={Register} name="Register" />
    </Stack.Navigator>
  );
};

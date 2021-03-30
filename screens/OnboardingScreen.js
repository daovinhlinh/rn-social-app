import React from 'react';
import {StyleSheet, Image} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

export const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          subtitle: 'React native onboarding',
          image: <Image source={require('../img/globe.png')} />,
        },
        {
          backgroundColor: '#3e3e3e',
          title: 'Onboarding',
          subtitle: 'React native onboarding',
          image: <Image source={require('../img/globe.png')} />,
        },
      ]}
      onDone={() => navigation.navigate('Login')}
      onSkip={() => navigation.replace('Login')}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

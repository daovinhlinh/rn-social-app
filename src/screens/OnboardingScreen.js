import React from 'react';
import {Image} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

export const OnboardingScreen = ({navigation}) => {
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: colorStyles.white,
          title: 'Onboarding',
          subtitle: 'React native onboarding',
          image: <Image source={require('../img/globe.png')} />,
        },
        {
          backgroundColor: colorStyles.mineShaft,
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

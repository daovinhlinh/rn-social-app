import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import Post from '../components/Post';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const NewfeedScreen = ({navigation}) => {
  return (
    <ScrollView>
      <Post navigation={navigation} />
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

export default NewfeedScreen;

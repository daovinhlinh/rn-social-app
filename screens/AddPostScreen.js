import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from '../components/Header.js';

const {width, height} = Dimensions.get('window');

const AddPostScreen = ({navigation}) => {
  const [image, setImage] = useState('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
    });
  };

  return (
    <View style={styles.container}>
      <Header header="Add post" btnText="post" navigation={navigation} />
      <View style={{flex: 1}}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../img/avatar.png')}
              style={[styles.avatar]}
            />
            <View>
              <Text style={styles.name}>Linh</Text>
              <Text style={styles.time}>1 hour</Text>
            </View>
          </View>
        </View>

        <TextInput
          placeholder="What's on your mind?"
          multiline={true}
          style={{
            textAlign: 'left',
            width: width * 0.95,
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.attachBar}>
        <Pressable
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#d8d8d8' : '#fff',
            },
            styles.attachBtn,
          ]}>
          <Ionicons name="image" color="#00A400" size={30} />
          <Text style={{marginLeft: 10}}>Add Photos</Text>
        </Pressable>
        <Pressable
          onPress={takePhotoFromCamera}
          style={({pressed}) => [
            {
              backgroundColor: pressed ? '#d8d8d8' : '#fff',
            },
            styles.attachBtn,
          ]}>
          <Ionicons name="camera" color="#3360ff" size={30} />
          <Text style={{marginLeft: 10}}>Capture Photo</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 99,
    marginRight: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: width * 0.95,
    marginVertical: 10,
    backgroundColor: 'transparent',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  time: {
    fontSize: 12,
  },
  attachBar: {
    flexDirection: 'row',
    height: 50,
    width: width,
    alignItems: 'center',
    borderTopColor: '#acacac',
    borderTopWidth: 0.5,
    elevation: 2,
  },
  attachBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    flex: 1,
  },
});

export default AddPostScreen;

import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  Platform,
  Alert,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from 'react-native-loading-spinner-overlay';

import {Header} from '../components';
import {AuthContext} from '../navigation/AuthProvider.js';
import {colorStyles} from '../styles/ColorStyles';

const {width, height} = Dimensions.get('window');

const ImageContainer = ({image, onDelete}) => {
  return (
    <View style={{width: width * 0.25}}>
      <TouchableOpacity
        style={{zIndex: 1, top: 30, alignSelf: 'flex-end'}}
        onPress={onDelete}>
        <Ionicons name="close-circle" color="#fff" size={25} />
      </TouchableOpacity>
      <Image source={{uri: image}} style={{width: '100%', height: 100}} />
    </View>
  );
};

export const AddPostScreen = ({navigation}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const {user} = useContext(AuthContext);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: width,
      height: height,
      multiple: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      let newData = [...images];
      newData.push(imageUri);
      setImages(newData);
      console.log(image);
    });
  };

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: width,
      height: height,
      multiple: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      console.log(imageUri);
      // setImage(imageUri);
    });
  };

  const submitPost = async () => {
    setLoading(true);
    let imgUrl = await postImage();
    firestore()
      .collection('posts')
      .add({
        userId: user.uid,
        post: post,
        postImg: imgUrl,
        postTime: firestore.Timestamp.fromDate(new Date()),
        likes: 0,
        comments: 0,
      })
      .then(() => {
        Alert.alert('Uploaded', 'Your post has been uploaded!');
        setLoading(false);
        setPost(null);
        navigation.navigate('Home');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const postImage = async () => {
    if (images === null) return null;

    const uploadUri = images[0];
    let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    const extension = fileName.split('.').pop();
    const name = fileName.split('.').slice(0, -1).join('.');
    fileName = name + Date.now() + '.' + extension;

    const storageRef = storage().ref(`photo/${fileName}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    setTransferred(0);

    try {
      await task;

      const imgUrl = await storageRef.getDownloadURL();
      setImages(null);

      return imgUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header
        header="Add post"
        btnText="post"
        bgColor={images ? '#3360ff' : '#acacac' || post ? '#3360ff' : '#acacac'}
        navigation={navigation}
        onPress={images ? submitPost : null || post ? submitPost : null}
      />
      <Spinner
        visible={loading}
        animation="fade"
        textContent={`Uploading...${transferred}%`}
        color="white"
        textStyle={{fontWeight: 'normal', color: 'white'}}
      />
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
          value={post}
          onChangeText={(text) => setPost(text)}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row', width: width}}>
          <FlatList
            data={images}
            renderItem={({item}) => (
              <ImageContainer
                image={item}
                onDelete={() => setImages(images.filter((img) => img != item))}
              />
            )}
            legacyImplementation={true}
            horizontal={true}
          />
        </View>
        <View style={styles.attachBar}>
          <Pressable
            onPress={takePhotoFromLibrary}
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

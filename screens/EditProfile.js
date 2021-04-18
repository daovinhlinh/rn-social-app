import React, {useState, useContext, useEffect} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Header, FormInput, FormButton, DismissKeyboard} from '../components';
import {AuthContext} from '../navigation/AuthProvider';
import {colorStyles} from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Animated from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

export const EditProfile = ({navigation, route}) => {
  const {user} = useContext(AuthContext);
  const [image, setImage] = useState('');
  const [userData, setUserData] = useState(null);
  const [transferred, setTransferred] = useState(0);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 500,
      height: 500,
      compressImageQuality: 0.6,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      sheetRef.current.snapTo(1);
    });
  };

  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: width,
      height: height,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      sheetRef.current.snapTo(1);
    });
  };

  const getUser = async () => {
    const currentUser = await firestore()
      .collection('users')
      .doc(user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const renderInner = () => (
    <View
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        height: 300,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#acacac',
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}>
      <View style={{alignItems: 'center', marginBottom: 10}}>
        <Text style={{fontSize: 25}}>Upload photo</Text>
        <Text style={{color: '#a6a6a6'}}>Choose your profile picture</Text>
      </View>
      <TouchableOpacity
        onPress={takePhotoFromCamera}
        style={{
          padding: 13,
          backgroundColor: '#2e64e5',
          alignItems: 'center',
          marginVertical: 7,
          borderRadius: 10,
        }}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
          Take photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={takePhotoFromLibrary}
        style={{
          padding: 13,
          borderRadius: 10,
          backgroundColor: '#2e64e5',
          alignItems: 'center',
          marginVertical: 7,
        }}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
          Choose photo
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 13,
          borderRadius: 10,
          backgroundColor: '#D5212E',
          alignItems: 'center',
          marginVertical: 7,
        }}
        onPress={() => sheetRef.current.snapTo(1)}>
        <Text style={{fontWeight: 'bold', color: 'white', fontSize: 16}}>
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const postImage = async () => {
    if (image === null) return null;
    const uploadUri = image;
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
      setImage(null);

      return imgUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleUpdate = async () => {
    let imgUrl = await postImage();

    if (imgUrl === null && userData.userImg) {
      imgUrl = userData.userImg;
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .update({
        userImg: imgUrl,
        fname: userData.fname,
        lname: userData.lname,
        phone: userData.phone,
        introduction: userData.introduction,
        city: userData.city,
      })
      .then(() => {
        alert('Updated!');
      });
  };

  const sheetRef = React.useRef(null);
  const fall = new Animated.Value(1);

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Header header="Edit Profile" btnText={null} navigation={navigation} />
        <BottomSheet
          ref={sheetRef}
          snapPoints={[300, -5]}
          borderRadius={10}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
        />
        <Animated.View
          style={{
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}>
          <View
            style={{
              justifyContent: 'space-around',
              alignItems: 'center',
              flex: 1,
              paddingBottom: 25,
            }}>
            <View
              style={{
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                marginBottom: 50,
              }}>
              <Image
                source={{
                  uri: image
                    ? image
                    : userData
                    ? userData.userImg ||
                      'https://www.w3schools.com/howto/img_avatar.png'
                    : 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                style={{width: 100, height: 100, borderRadius: 90}}
              />
              <TouchableOpacity
                onPress={() => sheetRef.current.snapTo(0)}
                style={{
                  position: 'absolute',
                  backgroundColor: 'black',
                  borderRadius: 90,
                }}>
                <Ionicons
                  name="camera"
                  size={25}
                  color="white"
                  style={{padding: 5}}
                />
              </TouchableOpacity>
            </View>
            <View>
              <FormInput
                placeholder="Enter your first name"
                textChange={(text) => setUserData({...userData, fname: text})}
                value={userData ? userData.fname : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="person"
              />
              <FormInput
                placeholder="Enter your last name"
                textChange={(text) => setUserData({...userData, lname: text})}
                value={userData ? userData.lname : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="person"
              />
              <FormInput
                placeholder="Enter your introduction"
                textChange={(text) =>
                  setUserData({...userData, introduction: text})
                }
                value={userData ? userData.introduction : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="document-text"
              />
              <FormInput
                placeholder="Enter your phone number"
                textChange={(text) => setUserData({...userData, phone: text})}
                value={userData ? userData.phone : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="call"
              />
              <FormInput
                placeholder="Enter your city"
                textChange={(text) => setUserData({...userData, city: text})}
                value={userData ? userData.city : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="globe"
              />
              <FormInput
                placeholder="Enter your city"
                // textChange={(text) => setUserData({...userData, city: text})}
                // value={userData ? userData.city : ''}
                secureTextEntry={false}
                bgColor={colorStyles.white}
                color="#000"
                icon="globe"
              />
            </View>
            <FormButton
              title="Update profile"
              color="#fff"
              backgroundColor="#16b4f2"
              onPress={handleUpdate}
            />
          </View>
        </Animated.View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
  },
  header: {
    backgroundColor: '#FFFFFF',
    borderColor: '#acacac',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingTop: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
  },
});

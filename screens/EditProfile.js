import React, {useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Button,
} from 'react-native';
import {Header, FormInput, FormButton} from '../components';
import {AuthContext} from '../navigation/AuthProvider';
import {colorStyles} from '../styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Animated from 'react-native-reanimated';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';

const {width, height} = Dimensions.get('window');

export const EditProfile = ({navigation, route}) => {
  const [fullName, setFullName] = useState('');
  const [description, setDescription] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState('');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: width,
      height: height,
      compressImageQuality: 0.7,
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
      multiple: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      console.log(imageUri);
      sheetRef.current.snapTo(1);
    });
  };

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

  const sheetRef = React.useRef(null);

  return (
    <View style={styles.container}>
      <Header header="Edit Profile" btnText={null} navigation={navigation} />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[300, -5]}
        borderRadius={10}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
      />
      <View
        style={{
          justifyContent: 'space-around',
          alignItems: 'center',
          flex: 1,
        }}>
        <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <Image
            source={{uri: route.params.userImg}}
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
            keyboardType="default"
            placeholder="Enter your name"
            autoCorrect={false}
            textChange={(text) => setFullName(text)}
            value={fullName}
            secureTextEntry={false}
            bgColor={colorStyles.white}
            color="#000"
            subText="Full name"
          />
          <FormInput
            keyboardType="default"
            placeholder="Enter your introduction"
            autoCorrect={false}
            textChange={(text) => setDescription(text)}
            value={description}
            secureTextEntry={false}
            bgColor={colorStyles.white}
            color="#000"
            subText="Introduction"
          />
          <FormInput
            keyboardType="default"
            placeholder="Enter your phone number"
            autoCorrect={false}
            textChange={(text) => setPhone(text)}
            value={phone}
            secureTextEntry={false}
            bgColor={colorStyles.white}
            color="#000"
            subText="Phone number"
          />
        </View>
        <FormButton
          title="Update profile"
          color="#fff"
          backgroundColor="#16b4f2"
        />
      </View>
    </View>
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

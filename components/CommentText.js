import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  Pressable,
  Button,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';

import {AuthContext} from '../navigation/AuthProvider';
import {colorStyles} from '../styles';

const {width, height} = Dimensions.get('screen');

export const CommentText = ({creator, text, id, onDelete}) => {
  const [userData, setUserdata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const {user} = useContext(AuthContext);

  const toggleModal = () => {
    setVisible(!visible);
  };

  const isUser = user.uid === creator ? true : false;

  useEffect(() => {
    firestore()
      .collection('users')
      .doc(creator)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserdata(snapshot.data());
        }
        if (loading) setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );

  return (
    <View
      style={{
        flexDirection: isUser ? 'row-reverse' : 'row',
        width: width,
        paddingHorizontal: 5,
        marginBottom: 10,
        justifyContent: 'flex-start',
      }}>
      <Image
        source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 90,
          marginHorizontal: 5,
        }}
      />
      <Pressable
        style={{
          backgroundColor: isUser ? colorStyles.denim : '#d7d7d7',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 17,
          maxWidth: width * 0.8,
          alignItems: 'flex-start',
        }}
        onLongPress={isUser ? toggleModal : null}
        delayLongPress={1000}>
        <Text
          style={{
            fontWeight: 'bold',
          }}>{`${userData.fname} ${userData.lname}`}</Text>
        <Text>{text}</Text>
      </Pressable>
      <View style={{alignItems: 'center', flex: 1}}>
        <Modal isVisible={visible}>
          <View
            style={{
              width: '60%',
              justifyContent: 'space-around',
              alignItems: 'center',
              backgroundColor: '#fff',
              padding: 20,
              borderRadius: 10,
            }}>
            <Text style={{marginBottom: 20}}>Delete comment?</Text>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Button title="Cancel" onPress={toggleModal} />
              <Button title="Confirm" onPress={() => onDelete(id)} />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

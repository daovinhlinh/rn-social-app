import React, {useEffect, useState} from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore, {firebase} from '@react-native-firebase/firestore';
import {colorStyles} from '../styles';
import {Header, CommentText} from '../components';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const {width, height} = Dimensions.get('window');

export const Comment = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState('');
  const [text, setText] = useState('');
  const {user} = useContext(AuthContext);

  const fetchComment = () => {
    let list = [];
    if (route.params.postId !== postId) {
      firestore()
        .collection('posts')
        .doc(route.params.postId)
        .collection('comments')
        .orderBy('createdAt', 'asc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            list.push({
              id: doc.id,
              text: doc.data().text,
              creator: doc.data().creator,
            });
          });
          setComments(list);
        });
    }
  };

  const postComment = () => {
    firestore()
      .collection('posts')
      .doc(route.params.postId)
      .collection('comments')
      .add({
        text: text,
        creator: user.uid,
        createdAt: firestore.Timestamp.fromDate(new Date()),
      });
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <View style={styles.container}>
      <Header header="Comment" navigation={navigation} />
      <CommentText />
      <CommentText />
      <CommentText />
      <FlatList
        horizontal={false}
        style={{width: '100%'}}
        data={comments}
        renderItem={({item}) => (
          <View
            style={{
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <Text>{item.creator}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
      />

      <View
        style={{
          backgroundColor: '#d7d7d7',
          borderRadius: 25,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TextInput
          style={{
            width: width * 0.85,
            paddingVertical: 10,
            fontSize: 18,
          }}
          onChangeText={(text) => setText(text)}
          value={text}
          placeholder={'Comment...'}
        />
        <TouchableOpacity onPress={postComment}>
          <Ionicons name="send-sharp" size={24} color={colorStyles.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorStyles.white,
    paddingBottom: 15,
    width: '100%',
    paddingHorizontal: 10,
  },
});

import React, {useEffect, useRef, useState} from 'react';

import {
  View,
  Alert,
  StyleSheet,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Keyboard,
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
  const flatlistRef = useRef();

  const fetchComment = () => {
    if (route.params.postId !== postId) {
      // firestore()
      //   .collection('posts')
      //   .doc(route.params.postId)
      //   .collection('comments')
      //   .orderBy('createdAt', 'asc')
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       list.push({
      //         id: doc.id,
      //         text: doc.data().text,
      //         creator: doc.data().creator,
      //       });
      //     });
      //     setComments(list);
      //   });
      firestore()
        .collection('posts')
        .doc(route.params.postId)
        .collection('comments')
        .orderBy('createdAt', 'asc')
        .onSnapshot((snapshot) => {
          const comment = snapshot.docs.map((doc) => {
            const listComment = doc.data();

            const data = {
              id: doc.id,
              text: doc.data().text,
              creator: doc.data().creator,
              ...listComment,
            };
            return data;
          });
          setComments(comment);
          setPostId(route.params.postId);
          // flatlistRef.current.scrollToEnd({animating: false});
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
    setText('');
    Keyboard.dismiss();
  };

  const deleteComment = (id) => {
    firestore()
      .collection('posts')
      .doc(postId)
      .collection('comments')
      .doc(id)
      .delete()
      .then(() =>
        Alert.alert('Comment deleted', 'Your comment has been deleted'),
      );
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <View style={styles.container}>
      <Header header="Comment" navigation={navigation} />

      <FlatList
        horizontal={false}
        ref={flatlistRef}
        style={{
          width: '100%',
          paddingTop: 10,
          marginBottom: 10,
        }}
        data={comments}
        renderItem={({item}) => (
          <CommentText
            creator={item.creator}
            text={item.text}
            postId={postId}
            id={item.id}
            onDelete={deleteComment}
          />
        )}
      />

      <View
        style={{
          backgroundColor: '#d7d7d7',
          borderRadius: 25,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          marginBottom: 10,
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
        <TouchableOpacity onPress={postComment} disabled={text.length == 0}>
          <Ionicons
            name="send-sharp"
            size={24}
            color={text.length > 0 ? colorStyles.dodgerBlue : colorStyles.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
    paddingBottom: 15,
    width: '100%',
  },
});

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
  Text,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import {colorStyles} from '../styles';
import {Header, CommentText} from '../components';
import {useContext} from 'react';
import {AuthContext} from '../navigation/AuthProvider';

const {width, height} = Dimensions.get('window');

export const Comment = ({navigation, route}) => {
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(7);
  const [text, setText] = useState('');
  const {user} = useContext(AuthContext);
  const flatlistRef = useRef();

  const fetchComment = () => {
    firestore()
      .collection('posts')
      .doc(route.params.postId)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .limitToLast(7)
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

        // flatlistRef.current.scrollToEnd({animating: false});
      });
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

  const loadMore = async () => {
    await firestore()
      .collection('posts')
      .doc(route.params.postId)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .limitToLast(limit + 4)
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
        setComments([...comment]);
        setLimit(limit + 4);
      });
  };

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <View style={styles.container}>
      <Header header={`Comment: ${comments.length}`} navigation={navigation} />
      {/* {limit > comments.length ? null : ( */}
      <TouchableOpacity onPress={() => loadMore()}>
        <Text
          style={{
            color: colorStyles.dodgerBlue,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          Load more...
        </Text>
      </TouchableOpacity>
      {/* )} */}

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
            id={item.id}
            onDelete={deleteComment}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <View
        style={{
          backgroundColor: colorStyles.alto,
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
    // paddingBottom: 15,
    width: '100%',
  },
});

import React, {useEffect, useState} from 'react';
import {StatusBar, FlatList, Alert, TouchableOpacity, Text} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {Post} from '../components';

export const NewfeedScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);

  const fetchPost = async () => {
    try {
      let list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const {
              post,
              postImg,
              postTime,
              userId,
              likes,
              comments,
            } = doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: 'Default',
              userImg: 'https://www.w3schools.com/howto/img_avatar.png',
              post,
              likes: likes || 0,
              liked: false,
              comments,
              postImg,
              postTime,
            });
          });
        });
      setPosts(list);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Delete post', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Confirm',
        onPress: () => deletePost(id),
      },
    ]);
  };

  const deletePost = (id) => {
    firestore()
      .collection('posts')
      .doc(id)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          const {postImg} = documentSnapshot.data();
          if (postImg !== null) {
            const storageRef = storage().refFromURL(postImg);
            // console.log(storageRef.fullPath);
            const imageRef = storage().ref(storageRef.fullPath);
            imageRef
              .delete()
              .then(() => deteleFirestoreData(id))
              .catch((e) => {
                console.log('Error: ' + e);
              });
          } else {
            deteleFirestoreData(id);
          }
        }
      });
  };

  const deteleFirestoreData = (id) => {
    firestore()
      .collection('posts')
      .doc(id)
      .delete()
      .then(() => {
        Alert.alert('Post deleted', 'Your post has been deleted!');
        setDeleted(true);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  const renderItem = ({item}) => (
    <Post
      item={item}
      onDelete={handleDelete}
      onPress={() =>
        navigation.navigate('ProfileScreen', {userId: item.userId})
      }
    />
  );

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      {loading ? (
        <Spinner
          visible={loading}
          animation="fade"
          textContent={`Loading`}
          color="white"
          textStyle={{fontWeight: 'normal', color: 'white'}}
        />
      ) : (
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={(post) => post.id}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          initialNumToRender={5}
          maxToRenderPerBatch={5}
        />
      )}
    </>
  );
};

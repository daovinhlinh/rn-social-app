import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  FlatList,
  Alert,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Spinner from 'react-native-loading-spinner-overlay';

import {Post, Header} from '../components';
import {colorStyles} from '../styles';

export const NewfeedScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
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
            list.push({
              id: doc.id,
              userId: doc.data().userId,
              userImg: 'https://www.w3schools.com/howto/img_avatar.png',
              post: doc.data().post,
              likes: doc.data().likes || 0,
              postImg: doc.data().postImg,
              postTime: doc.data().postTime,
            });
          });
        });
      setPosts(list);
      setLoading(false);
      setRefresh(false);
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
            for (let i = 0; i < postImg.length; i++) {
              const storageRef = storage().refFromURL(postImg[i]);
              const imageRef = storage().ref(storageRef.fullPath);
              imageRef.delete().catch((e) => {
                console.log('Error: ' + e);
              });
            }
            deteleFirestoreData(id);
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
    navigation.addListener('focus', () => {
      fetchPost();
    });
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
      onComment={() =>
        navigation.push('Comment', {postId: item.id, userId: item.userId})
      }
      navigation={navigation}
    />
  );

  const onRefresh = () => {
    fetchPost();
    setRefresh(false);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colorStyles.mischka,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={colorStyles.white} />
      <Header header="Home" />

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
          onRefresh={onRefresh}
          refreshing={refresh}
          progressViewOffset={50}
          ListEmptyComponent={
            <View>
              <Text style={{textAlign: 'center'}}>No data</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

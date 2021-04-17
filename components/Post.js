import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';

export const Post = ({item, onDelete, onLike, onPress, onComment}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const {user} = useContext(AuthContext);

  const {post, likes, liked, comments, postImg, postTime, userId, id} = item;

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(userId)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        }
      });
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 20}}>
          <Text>Hello</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{
                  uri:
                    userData.userImg !== null
                      ? userData.userImg
                      : 'https://www.w3schools.com/howto/img_avatar.png',
                }}
                style={[styles.avatar]}
              />
              <View style={{width: '80%'}}>
                <TouchableOpacity onPress={onPress}>
                  <Text style={styles.name}>
                    {userData.fname + ' ' + userData.lname}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.time}>
                  {moment(postTime.toDate()).fromNow()}
                </Text>
              </View>
            </View>
            {user.uid === userId ? (
              <TouchableOpacity onPress={() => onDelete(id)}>
                <Ionicons name="close-outline" size={30} color="#000" />
              </TouchableOpacity>
            ) : null}
          </View>
          <>
            {post ? (
              <Text style={{marginBottom: 5, fontSize: 16}}>{post}</Text>
            ) : null}
          </>

          <View>
            {postImg ? (
              <Image
                source={{
                  uri: postImg,
                }}
                style={{
                  borderRadius: 20,
                  height: 250,
                  width: '100%',
                }}
                resizeMode="cover"
              />
            ) : null}
          </View>
          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.reactBtn}
              onPress={() => onLike(id)}>
              <Ionicons name="heart" size={25} color="red" />

              <Text style={styles.reactCount}>{likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reactBtn} onPress={onComment}>
              <Ionicons name="chatbox-outline" size={25} color="#AAA" />
              <Text style={styles.reactCount}>100</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={25} color="#AAA" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 99,
    marginRight: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  time: {
    fontSize: 12,
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  reactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactCount: {
    fontWeight: '500',
    marginLeft: 5,
  },
});

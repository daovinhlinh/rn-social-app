import React, {useEffect, useState, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import moment from 'moment';
import firestore from '@react-native-firebase/firestore';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';

const {height, width} = Dimensions.get('window');

export const Post = ({item, onDelete, onPress}) => {
  const [ratio, setRatio] = useState();
  const [loading, setLoading] = useState(true);
  const [imgHeight, setImgHeight] = useState(0);
  const {user} = useContext(AuthContext);

  const {
    userName,
    userImg,
    post,
    likes,
    liked,
    comments,
    postImg,
    postTime,
    userId,
    id,
  } = item;

  const [handleLike, setHandleLiked] = useState(liked);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{flexDirection: 'row'}}>
          <Image source={{uri: userImg}} style={[styles.avatar]} />
          <View style={{width: '80%'}}>
            <TouchableOpacity onPress={onPress}>
              <Text style={styles.name}>{userName}</Text>
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
      <Text style={{marginVertical: 10, fontSize: 16}}>{post}</Text>
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
          onPress={() => setHandleLiked(!handleLike)}>
          {handleLike ? (
            <Ionicons name="heart" size={25} color="red" />
          ) : (
            <Ionicons name="heart-outline" size={25} color="#aaa" />
          )}

          <Text style={styles.reactCount}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.reactBtn}>
          <Ionicons name="chatbox-outline" size={25} color="#AAA" />
          <Text style={styles.reactCount}>100</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={25} color="#AAA" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginBottom: 30,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginVertical: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 99,
    marginRight: 10,
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

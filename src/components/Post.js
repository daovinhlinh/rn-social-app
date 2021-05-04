import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Pressable,
} from 'react-native';

import Swiper from 'react-native-swiper';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../navigation/AuthProvider';
import {colorStyles} from '../styles';

export const Post = ({
  item,
  onDelete,
  onPress,
  onComment,
  onLongPress,
  navigation,
}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [like, setLike] = useState([]);
  const [liked, setLiked] = useState(false);
  const [images, setImages] = useState([]);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const {user} = useContext(AuthContext);

  const {post, postImg, postTime, userId, id} = item;

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

  const fetchLike = () => {
    try {
      firestore()
        .collection('posts')
        .doc(id)
        .collection('likes')
        .onSnapshot((snapshot) => {
          snapshot.docs.map((doc) => {
            if (doc.id == user.uid) {
              setLiked(true);
            }
          });
          setLike(snapshot.size);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const likePost = () => {
    firestore()
      .collection('posts')
      .doc(id)
      .collection('likes')
      .doc(user.uid)
      .set({}, {merge: true});
  };

  const unLikePost = () => {
    firestore()
      .collection('posts')
      .doc(id)
      .collection('likes')
      .doc(user.uid)
      .delete();
    setLiked(false);
  };

  const addImage = () => {
    let list = [];
    if (postImg.length > 0) {
      postImg.map((img) => list.push({url: img}));
    }
    setImages(list);
  };

  const closeModal = () => {
    if (modal) setModal(false);
  };

  useEffect(() => {
    getUser();
    fetchLike();
    addImage();
  }, []);

  return (
    <>
      {loading ? (
        <View style={{flex: 1, paddingHorizontal: 10, paddingTop: 20}}>
          <ActivityIndicator />
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
                resizeMode="cover"
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
              <>
                <Modal
                  visible={modal1}
                  transparent={true}
                  animationType="slide">
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 300,
                        width: '80%',
                        backgroundColor: '#fff',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        elevation: 10,
                      }}>
                      <Text>What do you want?</Text>
                      <View style={{width: '80%', alignItems: 'center'}}>
                        <Pressable
                          style={{
                            width: '60%',
                            backgroundColor: colorStyles.dodgerBlue,
                            paddingVertical: 10,
                            marginBottom: 10,
                          }}
                          onPress={() => {
                            navigation.navigate('EditPost', {
                              userData: userData,
                              postId: id,
                              post,
                            });
                            setModal1(false);
                          }}>
                          <Text
                            style={{
                              color: colorStyles.white,
                              textAlign: 'center',
                              fontWeight: '400',
                            }}>
                            Edit post
                          </Text>
                        </Pressable>
                        <Pressable
                          style={{
                            width: '60%',
                            backgroundColor: colorStyles.dodgerBlue,
                            paddingVertical: 10,
                            marginBottom: 10,
                          }}>
                          <Text
                            style={{
                              color: colorStyles.white,
                              textAlign: 'center',
                              fontWeight: '400',
                            }}>
                            Delete post
                          </Text>
                        </Pressable>
                        <Pressable
                          style={{
                            width: '60%',
                            backgroundColor: colorStyles.red,
                            paddingVertical: 10,
                          }}
                          onPress={() => setModal1(false)}>
                          <Text
                            style={{
                              color: colorStyles.white,
                              textAlign: 'center',
                              fontWeight: '400',
                            }}>
                            Close
                          </Text>
                        </Pressable>
                      </View>
                    </View>
                  </View>
                </Modal>
                <TouchableOpacity
                  onPress={() => {
                    setModal1(true);
                  }}>
                  <Ionicons name="close-outline" size={30} color="#000" />
                </TouchableOpacity>
              </>
            ) : null}
          </View>

          {post ? (
            <Text style={{marginBottom: 5, fontSize: 16}}>{post}</Text>
          ) : null}

          <View>
            {postImg.length > 0 ? (
              <TouchableOpacity onPress={() => setModal(true)}>
                <Swiper
                  showsButtons={true}
                  height={250}
                  loop={false}
                  showsButtons={false}
                  key={postImg.length}>
                  {postImg.map((img, key) => (
                    <View style={styles.slide} key={key}>
                      <FastImage
                        source={{
                          uri: img,
                          priority: FastImage.priority.normal,
                        }}
                        style={{
                          borderRadius: 20,
                          height: 250,
                          width: '100%',
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  ))}
                </Swiper>
                <Modal
                  visible={modal}
                  transparent={true}
                  onRequestClose={closeModal}>
                  <ImageViewer
                    imageUrls={images}
                    enableSwipeDown={true}
                    onSwipeDown={closeModal}
                  />
                </Modal>
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.actionBar}>
            <TouchableOpacity
              style={styles.reactBtn}
              onPress={() => {
                liked ? unLikePost() : likePost();
              }}>
              <Ionicons
                name="heart"
                size={25}
                color={liked ? colorStyles.red : '#c4c4c4'}
              />

              <Text style={styles.reactCount}>{like}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.reactBtn} onPress={onComment}>
              <Ionicons name="chatbox-outline" size={25} color="#AAA" />
              {/* <Text style={styles.reactCount}>100</Text> */}
            </TouchableOpacity>
            {/* <TouchableOpacity>
              <Ionicons name="bookmark-outline" size={25} color="#AAA" />
            </TouchableOpacity> */}
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorStyles.white,
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
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: colorStyles.mineShaft,
    paddingTop: 10,
  },
  reactBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reactCount: {
    fontWeight: '500',
    marginLeft: 5,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sheetHeader: {
    backgroundColor: colorStyles.white,
    borderColor: colorStyles.silver,
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
    backgroundColor: colorStyles.black,
  },
});

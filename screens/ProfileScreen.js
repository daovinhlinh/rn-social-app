import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import Ionicons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';

import {Post, Header} from '../components';
import {colorStyles} from '../styles/';

export const ProfileScreen = ({navigation, route}) => {
  const {user, logOut} = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserdata] = useState(null);
  const [follow, setFollow] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [following, setFollowing] = useState();

  const fetchPost = async () => {
    try {
      let list = [];

      await firestore()
        .collection('posts')
        .orderBy('postTime', 'desc')
        .where('userId', '==', route.params ? route.params.userId : user.uid)
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
      if (loading) setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFollowing = () => {
    let list = [];

    firestore()
      .collection('following')
      .doc(user.uid)
      .collection('userFollowing')
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          const id = doc.id;
          list.push(id);
        });
        console.log(list.length);
        setFollowing(list.length);
        if (list.indexOf(route.params?.userId) > -1) {
          setFollow(true);
        } else {
          setFollow(false);
        }
      });
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          setUserdata(snapshot.data());
        }
      });
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

  const onFollow = async () => {
    await firestore()
      .collection('following')
      .doc(user.uid)
      .collection('userFollowing')
      .doc(route.params.userId)
      .set({});
    fetchFollowing();
  };

  const onUnfollow = async () => {
    await firestore()
      .collection('following')
      .doc(user.uid)
      .collection('userFollowing')
      .doc(route.params.userId)
      .delete();
    fetchFollowing();
  };

  useEffect(() => {
    getUser();
    fetchPost();
    fetchFollowing();
  }, []);

  useEffect(() => {
    navigation.addListener('focus', () => {
      getUser();
      fetchPost();
      fetchFollowing();
    });
  }, [navigation]);

  useEffect(() => {
    fetchPost();
    setDeleted(false);
  }, [deleted]);

  return (
    <>
      {loading ? (
        <Spinner
          visible={true}
          animation="fade"
          textContent={`Loading`}
          color="white"
          textStyle={{fontWeight: 'normal', color: 'white'}}
        />
      ) : (
        <View style={styles.container}>
          <Header
            header="Profile"
            btnText={'Log Out'}
            bgColor={colorStyles.red}
            navigation={navigation}
            onPress={logOut}
          />
          <ScrollView
            style={{
              backgroundColor: 'white',
            }}
            contentContainerStyle={{alignItems: 'center'}}
            showsVerticalScrollIndicator={false}>
            <Image
              source={{
                uri: userData
                  ? userData.userImg ||
                    'https://www.w3schools.com/howto/img_avatar.png'
                  : 'https://www.w3schools.com/howto/img_avatar.png',
              }}
              style={styles.avatar}
            />

            <View style={{alignItems: 'center'}}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>
                {userData.fname + ' ' + userData.lname}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {userData.city ? (
                  <>
                    <Ionicons
                      name="globe"
                      size={18}
                      color={colorStyles.black}
                    />
                    <Text style={{textAlign: 'center', marginLeft: 5}}>
                      {userData.city}
                    </Text>
                  </>
                ) : null}
              </View>
              <Text style={{textAlign: 'center'}}>{userData.introduction}</Text>
            </View>
            {route.params ? (
              route.params.userId !== user.uid ? (
                <>
                  {follow ? (
                    <TouchableOpacity
                      style={styles.button}
                      onPress={onUnfollow}>
                      <Text
                        style={{color: colorStyles.white, fontWeight: 'bold'}}>
                        Following
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity style={styles.button} onPress={onFollow}>
                      <Text
                        style={{color: colorStyles.white, fontWeight: 'bold'}}>
                        Follow
                      </Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('EditProfile', {
                      userImg: 'https://www.w3schools.com/howto/img_avatar.png',
                    })
                  }
                  style={styles.button}>
                  <Text style={{color: colorStyles.white, fontWeight: 'bold'}}>
                    Edit Profile
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <TouchableOpacity
                onPress={() =>
                  navigation.push('EditProfile', {
                    userImg: 'https://www.w3schools.com/howto/img_avatar.png',
                  })
                }
                style={styles.button}>
                <Text style={{color: colorStyles.white, fontWeight: 'bold'}}>
                  Edit Profile
                </Text>
              </TouchableOpacity>
            )}
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
                  {posts.length}
                </Text>
                <Text>Posts</Text>
              </View>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>10000</Text>
                <Text>Followers</Text>
              </View>
              <View style={{alignItems: 'center', flex: 1}}>
                <Text style={{fontWeight: 'bold', fontSize: 22}}>
                  {following}
                </Text>
                <Text>Following</Text>
              </View>
            </View>
            <Text style={styles.headerText}>Posts</Text>
            {posts !== null ? (
              <>
                {posts.map((item) => (
                  <Post
                    key={item.id}
                    item={item}
                    onDelete={() => handleDelete(item.id)}
                  />
                ))}
              </>
            ) : (
              <View style={{width: '100%'}}>
                <Text style={{textAlign: 'center'}}>
                  You don't have any post
                </Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 90,
    marginVertical: 20,
  },
  button: {
    backgroundColor: colorStyles.dodgerBlue,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  headerText: {
    textAlign: 'left',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    borderColor: colorStyles.black,
    borderTopWidth: 0.5,
  },
});

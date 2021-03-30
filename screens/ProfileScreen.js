import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import firestore from '@react-native-firebase/firestore';
import Spinner from 'react-native-loading-spinner-overlay';
import {Post, Header} from '../components';
import {colorStyles} from '../styles/';

export const ProfileScreen = ({navigation, route}) => {
  const {user, logOut} = useContext(AuthContext);
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userImg, setUserImg] = useState('');

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
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    await firestore()
      .collection('users')
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) {
          console.log(snapshot.data());
        }
      });
  };

  useEffect(() => {
    getUser();
    fetchPost();
  }, []);

  return (
    <ScrollView style={{flex: 1}}>
      {loading ? (
        <Spinner
          visible={loading}
          animation="fade"
          textContent={`Loading`}
          color="white"
          textStyle={{fontWeight: 'normal', color: 'white'}}
        />
      ) : (
        <View style={styles.container}>
          <Header
            header="Profile"
            btnText="Log Out"
            bgColor={colorStyles.red}
            navigation={navigation}
            onPress={logOut}
          />

          <Image
            source={require('../img/avatar.png')}
            style={{
              width: 150,
              height: 150,
              borderRadius: 90,
              marginVertical: 20,
            }}
          />

          <View>
            <Text style={{fontWeight: 'bold', fontSize: 20}}>
              Dao Vinh Linh
            </Text>
            <Text style={{textAlign: 'center'}}>Dao Vinh Linh</Text>
          </View>
          {route.params?.userId == user.uid ? null : (
            <TouchableOpacity
              onPress={() =>
                navigation.push('EditProfile', {
                  userImg: 'https://www.w3schools.com/howto/img_avatar.png',
                })
              }
              style={{
                backgroundColor: colorStyles.dodgerBlue,
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}>
              <Text style={{color: colorStyles.white, fontWeight: 'bold'}}>
                Edit Profile
              </Text>
            </TouchableOpacity>
          )}
          <View style={{flexDirection: 'row', marginVertical: 10}}>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>5</Text>
              <Text>Posts</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>10000</Text>
              <Text>Followers</Text>
            </View>
            <View style={{alignItems: 'center', flex: 1}}>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>100</Text>
              <Text>Friends</Text>
            </View>
          </View>
          <Text
            style={{
              textAlign: 'left',
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 10,
              fontSize: 20,
              fontWeight: 'bold',
              marginTop: 10,
              borderColor: colorStyles.black,
              borderTopWidth: 0.5,
            }}>
            Posts
          </Text>
          {loading ? (
            <Spinner
              visible={loading}
              animation="fade"
              textContent={`Loading`}
              color="white"
              textStyle={{fontWeight: 'normal', color: 'white'}}
            />
          ) : (
            <>
              {posts.map((item) => (
                <Post
                  key={item.id}
                  item={item}
                  onDelete={() => console.log('hello')}
                />
              ))}
            </>
          )}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
  },
});

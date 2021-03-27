import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';

const {height, width} = Dimensions.get('window');

const Post = ({navigation}) => {
  const [ratio, setRatio] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    Image.getSize(
      'https://moonart.vn/wp-content/uploads/2020/02/4-dieu-can-xac-dinh-de-thiet-ke-poster-dep-hon1.jpg',
      (imgWidth) => setRatio(imgWidth / width),
    );
    setLoading(false);
  }, [loading]);

  return (
    <>
      {loading ? (
        <View>
          <Text>Loading</Text>
        </View>
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../img/avatar.png')}
                style={[styles.avatar]}
              />
              <View>
                <Text style={styles.name}>Linh</Text>
                <Text style={styles.time}>1 hour</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="ellipsis-horizontal-outline"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <Text style={{marginVertical: 10, fontSize: 16}}>hello</Text>
          <Image
            source={{
              uri:
                'https://fedudesign.vn/wp-content/uploads/2020/07/Web-1920-%E2%80%93-2-2.jpg',
            }}
            style={{aspectRatio: ratio, borderRadius: 20}}
            resizeMode="cover"
          />
          <View style={styles.actionBar}>
            <TouchableOpacity style={styles.reactBtn}>
              <Ionicons name="heart-outline" size={25} color="#AAA" />
              <Text style={styles.reactCount}>100</Text>
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
      )}
    </>
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
    alignItems: 'center',
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

export default Post;

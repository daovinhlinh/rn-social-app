import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Text,
  Dimensions,
  ActivityIndicator,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {colorStyles} from '../styles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const {width, height} = Dimensions.get('window');

export const NotificationScreen = () => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(7);
  const [loading, setLoading] = useState(true);

  const apikey = 'EkbmNXo3bI3cQdb41bCbR5XvgfknOsKhcMuKG4HZTsHni1tnfh4SQPbwJIpx';
  useEffect(() => {
    fetchData(limit);
    console.log(limit);
  }, [limit]);

  const fetchData = async (limit) => {
    const res = await fetch(
      'https://gnewsapi.net/api/search?q=news&language=vi&limit=' +
        limit +
        '&country=vn&api_token=EkbmNXo3bI3cQdb41bCbR5XvgfknOsKhcMuKG4HZTsHni1tnfh4SQPbwJIpx',
    );
    const data = await res.json();
    setData(data.articles);
    setLoading(false);
  };

  const NewWrapper = ({item}) => {
    const {
      title,
      image_url,
      published_timestamp,
      source_name,
      article_url,
    } = item;
    return (
      <TouchableOpacity onPress={() => openUrl(article_url)}>
        <View style={{width: width * 0.6, marginRight: 12}}>
          <Image
            source={{
              uri: image_url,
            }}
            style={{width: '100%', height: '60%', borderRadius: 17}}
            resizeMode="cover"
          />
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {textTruncate(title, 50)}
          </Text>
          <Text style={{fontSize: 15, color: colorStyles.silver}}>
            {moment.unix(published_timestamp).fromNow()}
          </Text>
          <Text style={{fontSize: 15, color: colorStyles.silver}}>
            {source_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const textTruncate = (str, length) => {
    if (str.length > length) {
      return `${str.substring(0, length - 3)}...`;
    } else {
      return str;
    }
  };

  const openUrl = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Link does not support');
      }
    });
  };

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            paddingHorizontal: 25,
            paddingBottom: 10,
            height: width / 2,
            width: width,
            justifyContent: 'space-around',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: colorStyles.white,
              padding: 5,
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: 10,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            {data[0].source_name}
          </Text>
          <Text
            style={{
              color: colorStyles.white,
              fontSize: 30,
              fontWeight: 'bold',
            }}>
            {textTruncate(data[0].title, 78)}
          </Text>
          <TouchableOpacity onPress={() => openUrl(data[0].article_url)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: colorStyles.white,
                  marginRight: 10,
                  fontSize: 18,
                }}>
                Read more
              </Text>
              <Ionicons
                name="arrow-forward"
                size={25}
                color={colorStyles.white}
              />
            </View>
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri:
              'https://gnewsapi.net/redirect-news-image/41b184cf460ce95079ba637bc6b29d84',
          }}
          style={{width: width, height: width, zIndex: 0}}
        />
      </View>

      <View
        style={{
          width: width,
          height: height * 0.35,
          paddingHorizontal: 10,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 28,
            alignSelf: 'flex-start',
            marginVertical: 10,
          }}>
          Breaking new
        </Text>
        <FlatList
          data={data}
          renderItem={({item}) => <NewWrapper item={item} />}
          maxToRenderPerBatch={3}
          initialNumToRender={5}
          horizontal={true}
          keyExtractor={(item) => item.title}
          onEndReachedThreshold={0.4}
          onEndReached={() => (limit < 20 ? setLimit(limit + 5) : null)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colorStyles.white,
  },
});

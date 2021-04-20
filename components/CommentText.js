import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');

export const CommentText = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: width,
        paddingHorizontal: 10,
        marginBottom: 10,
      }}>
      <Image
        source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}}
        style={{
          height: 50,
          width: 50,
          borderRadius: 90,
          marginRight: 10,
          flex: 1,
        }}
      />
      <View
        style={{
          backgroundColor: '#d7d7d7',
          paddingVertical: 5,
          paddingHorizontal: 10,
          borderRadius: 17,
          maxWidth: width * 0.8,
          flex: 9,
        }}>
        <Text style={{fontWeight: 'bold'}}>Linh</Text>
        <Text>
          123421341234213412342134123421341234213412342134123421341234213412342134
        </Text>
      </View>
    </View>
  );
};

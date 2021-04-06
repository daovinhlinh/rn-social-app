import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const MessageScreen = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 60, height: 60, borderRadius: 50}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
        <View style={{marginTop: 10, marginBottom: 30}}>
          <View style={{width: 300, height: 20, borderRadius: 4}} />
          <View
            style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}}
          />
          <View
            style={{marginTop: 6, width: 350, height: 200, borderRadius: 4}}
          />
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
});

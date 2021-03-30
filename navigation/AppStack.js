import React from 'react';
import {View, Text, TextInput} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  NewfeedScreen,
  NotificationScreen,
  ProfileScreen,
  MessageScreen,
  AddPostScreen,
  EditProfile,
} from '../screens';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const FeedStack = ({navigation}) => (
  <Stack.Navigator>
    <Stack.Screen
      component={NewfeedScreen}
      name="Newfeed"
      options={{
        headerStyle: {
          shadowColor: '#fff',
          elevation: 0,
        },
        headerTitle: 'Social App',
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      component={ProfileScreen}
      name="ProfileScreen"
      options={{headerShown: false}}
    />
  </Stack.Navigator>
);

const ProfileStack = ({navigation}) => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen component={ProfileScreen} name="Profile" />
    <Stack.Screen component={EditProfile} name="EditProfile" />
  </Stack.Navigator>
);

export const AppStack = () => {
  const getTabBarVisibility = (route) => {
    // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

    if (route.name === 'AddPost') {
      return false;
    }
    return true;
  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#3578E5',
        inactiveTintColor: '#aaaaaa',
        showLabel: false,
      }}>
      <Tab.Screen
        component={FeedStack}
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="newspaper" size={25} color={color} />
          ),
        }}
      />
      <Tab.Screen
        component={MessageScreen}
        name="Message"
        options={({route}) => ({
          tabBarIcon: ({color}) => (
            <Ionicons name="chatbubble" size={25} color={color} />
          ),
        })}
      />
      <Tab.Screen
        component={AddPostScreen}
        name="AddPost"
        options={({route}) => ({
          tabBarIcon: ({color, focused}) => (
            <Ionicons
              name="add-circle"
              size={focused ? 0 : 70}
              color="red"
              style={{
                marginTop: -20,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 6,
                },
                shadowOpacity: 0.37,
                shadowRadius: 7.5,
                elevation: 12,
              }}
            />
          ),
          tabBarVisible: getTabBarVisibility(route),
        })}
      />
      <Tab.Screen
        component={NotificationScreen}
        name="Notification"
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="notifications" size={25} color={color} />
          ),
        }}
      />

      <Tab.Screen
        component={ProfileStack}
        name="Profile"
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="person" size={25} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

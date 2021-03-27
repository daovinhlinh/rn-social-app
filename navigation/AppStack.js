import React from 'react';
import {View, Text, TextInput} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import NewfeedScreen from '../screens/NewfeedScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MessageScreen from '../screens/MessageScreen';
import AddPost from '../screens/AddPost';

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
    <Stack.Screen component={NotificationScreen} name="noti" />
    <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
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
        component={AddPost}
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
        component={ProfileScreen}
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

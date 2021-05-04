import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  NewfeedScreen,
  NotificationScreen,
  ProfileScreen,
  MessageScreen,
  ChatScreen,
  AddPostScreen,
  EditProfile,
  Comment,
  EditPost,
} from '../screens';

// const NewfeedScreen = lazy(
//   () => import('../screens/NewfeedScreen'),
//   'NewfeedScreen',
// );

// import {NotificationScreen} from '../screens/NotificationScreen';
// import {ProfileScreen} from '../screens/ProfileScreen';
// import {MessageScreen} from '../screens/MessageScreen';
// import {AddPostScreen} from '../screens/AddPostScreen';
// import {EditProfile} from '../screens/EditProfile';
// import {Comment} from '../screens/Comment';
// import {NewfeedScreen} from '../screens/NewfeedScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// const FeedStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       component={NewfeedScreen}
//       name="Newfeed"
//       options={{
//         headerStyle: {
//           shadowColor: '#fff',
//           elevation: 0,
//         },
//         headerTitle: 'Social App',
//         headerTitleAlign: 'center',
//       }}
//     />
//     <Stack.Screen
//       component={ProfileScreen}
//       name="ProfileScreen"
//       options={{headerShown: false}}
//     />
//     <Stack.Screen
//       component={Comment}
//       name="Comment"
//       options={{headerShown: false}}
//     />
//   </Stack.Navigator>
// );

// const ProfileStack = () => (
//   <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen component={ProfileScreen} name="Profile" />
//     <Stack.Screen component={Comment} name="Comment" />
//     <Stack.Screen component={EditProfile} name="EditProfile" />
//   </Stack.Navigator>
// );

// const MessageStack = () => (
//   <Stack.Navigator screenOptions={{headerShown: false}}>
//     <Stack.Screen component={MessageScreen} name="Messages" />
//     <Stack.Screen component={ChatScreen} name="Chat" />
//   </Stack.Navigator>
// );

const HomeTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: '#3578E5',
      inactiveTintColor: '#aaaaaa',
      showLabel: false,
    }}
    lazy={true}>
    <Tab.Screen
      name="Newfeed"
      component={NewfeedScreen}
      options={({route}) => ({
        tabBarIcon: ({color}) => (
          <Ionicons name="home" size={25} color={color} />
        ),
      })}
    />
    <Tab.Screen
      component={NotificationScreen}
      name="Notification"
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="newspaper" size={25} color={color} />
        ),
      }}
    />
    <Tab.Screen
      component={AddPostScreen}
      name="AddPost"
      options={({route}) => ({
        tabBarIcon: ({color, focused}) => (
          <Ionicons
            name="add-circle"
            size={focused ? 33 : 70}
            color="red"
            style={{
              marginTop: focused ? 0 : -20,
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
        tabBarVisible: false,
      })}
    />
    <Tab.Screen
      name="Messages"
      component={MessageScreen}
      options={({route}) => ({
        tabBarIcon: ({color}) => (
          <Ionicons name="chatbubble" size={25} color={color} />
        ),
      })}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({color}) => (
          <Ionicons name="person" size={25} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

export const AppStack = () => {
  // const getTabBarVisibility = (route) => {
  //   if (route.name === 'AddPost' || route.name === 'Comment') {
  //     return false;
  //   }
  //   return true;
  // };

  return (
    // <Tab.Navigator
    //   lazy={true}
    //   tabBarOptions={{
    //     activeTintColor: '#3578E5',
    //     inactiveTintColor: '#aaaaaa',
    //     showLabel: false,
    //   }}>
    //   <Tab.Screen
    //     component={FeedStack}
    //     name="Home"
    //     options={({route}) => ({
    //       tabBarIcon: ({color}) => (
    //         <Ionicons name="newspaper" size={25} color={color} />
    //       ),
    //       // tabBarVisible: route.state && route.state.index === 0,
    //     })}
    //   />
    //   <Tab.Screen
    //     component={MessageStack}
    //     name="Message"
    //     options={({route}) => ({
    //       tabBarIcon: ({color}) => (
    //         <Ionicons name="chatbubble" size={25} color={color} />
    //       ),
    //       // tabBarVisible: route.state && route.state.index === 0,
    //     })}
    //   />
    //   <Tab.Screen
    //     component={AddPostScreen}
    //     name="AddPost"
    //     options={({route}) => ({
    //       tabBarIcon: ({color, focused}) => (
    //         <Ionicons
    //           name="add-circle"
    //           size={focused ? 0 : 70}
    //           color="red"
    //           style={{
    //             marginTop: -20,
    //             shadowColor: '#000',
    //             shadowOffset: {
    //               width: 0,
    //               height: 6,
    //             },
    //             shadowOpacity: 0.37,
    //             shadowRadius: 7.5,
    //             elevation: 12,
    //           }}
    //         />
    //       ),
    //       tabBarVisible: getTabBarVisibility(route),
    //     })}
    //   />
    //   <Tab.Screen
    //     component={NotificationScreen}
    //     name="Notification"
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <Ionicons name="notifications" size={25} color={color} />
    //       ),
    //     }}
    //   />

    //   <Tab.Screen
    //     component={ProfileStack}
    //     name="Profile"
    //     options={{
    //       tabBarIcon: ({color}) => (
    //         <Ionicons name="person" size={25} color={color} />
    //       ),
    //     }}
    //   />
    // </Tab.Navigator>

    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={HomeTab} />
      <Stack.Screen
        component={Comment}
        name="Comment"
        options={{headerShown: false}}
      />
      <Stack.Screen component={EditProfile} name="EditProfile" />
      <Stack.Screen component={EditPost} name="EditPost" />
    </Stack.Navigator>
  );
};

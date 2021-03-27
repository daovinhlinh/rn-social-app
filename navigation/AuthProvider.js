import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
            switch (e.code) {
              case 'auth/user-not-found':
                alert('User not found');
              case 'auth/invalid-email':
                alert('That email address is invalid!');
              case 'auth/wrong-password':
                alert('Wrong password');
              case 'auth/user-disabled':
                alert('Account has been disabled');
              default:
                console.log(e);
            }
          }
        },
        googleLogin: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );
            await auth().signInWithCredential(googleCredential);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);
          } catch (e) {
            if (e.code === 'auth/email-already-in-use') {
              alert('That email address is already in use!');
            }

            if (e.code === 'auth/invalid-email') {
              alert('That email address is invalid!');
            }
          }
        },
        logOut: async () => {
          try {
            await auth().signOut();
            alert('Signed out');
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};

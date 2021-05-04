import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';
import firestore from '@react-native-firebase/firestore';

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
                break;
              case 'auth/invalid-email':
                alert('That email address is invalid!');
                break;
              case 'auth/wrong-password':
                alert('Wrong password');
                break;
              case 'auth/user-disabled':
                alert('Account has been disabled');
                break;
              default:
                console.log(e.code);
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
        signUpWithGoogle: async () => {
          try {
            const {idToken} = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(
              idToken,
            );
            const currentUser = await GoogleSignin.getCurrentUser();
            // await auth()
            //   .signInWithCredential(googleCredential)
            //   .then(() => {
            //     firestore()
            //       .collection('users')
            //       .doc(auth().currentUser.uid)
            //       .set({
            //         fname: '',
            //         lname: '',
            //         email: auth().currentUser.email,
            //         createdAt: firestore.Timestamp.fromDate(new Date()),
            //         userImg: null,
            //       })
            //       .catch((e) => {
            //         console.log(e);
            //       });
            //   });
            // let id = await auth().signInWithCredential(googleCredential);
            console.log(currentUser);
          } catch (e) {
            console.log(e);
          }
        },
        register: async (email, password, fname, lname) => {
          try {
            await auth()
              .createUserWithEmailAndPassword(email, password)
              .then(() => {
                firestore()
                  .collection('users')
                  .doc(auth().currentUser.uid)
                  .set({
                    fname: fname,
                    lname: lname,
                    email: email,
                    createdAt: firestore.Timestamp.fromDate(new Date()),
                    userImg: null,
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              });
            alert('Your account has been created');
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

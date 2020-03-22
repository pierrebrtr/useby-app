import * as firebase from "firebase";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBMRNnU4BKjFRbYogiRzUn93wju65Bxd5I",
  authDomain: "react-native-tutorial.firebaseapp.com",
  databaseURL: "https://react-native-tutorial.firebaseio.com",
  storageBucket: "react-native-tutorial.appspot.com"
};

firebase.initializeApp(firebaseConfig);

export default firebase;

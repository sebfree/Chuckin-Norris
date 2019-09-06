// firebase.js
import firebase from 'firebase';

// Initialize Firebase
// USE YOUR CONFIG OBJECT
const config = {
    apiKey: "AIzaSyD4gqpG5lRbZoCL-dx6CNVkzDMD6eedW64",
    authDomain: "chuckin-norris.firebaseapp.com",
    databaseURL: "https://chuckin-norris.firebaseio.com",
    projectId: "chuckin-norris",
    storageBucket: "",
    messagingSenderId: "655340571020",
    appId: "1:655340571020:web:5bb1812b2e61d4ffe92ea9"
};
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;
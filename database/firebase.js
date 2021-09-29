import firebase from "firebase";
import 'firebase/firestore';

//Se guardaran las variables en una Varible de entorno
//Localizadas en el archivo '.env.local'
const firebaseConfig = {
    apiKey: "AIzaSyAlJA4f5GwhFWYy8t80buMyJjy1lxgpWtk",
    authDomain: "tecnobooth-a37c0.firebaseapp.com",
    projectId: "tecnobooth-a37c0",
    storageBucket: "tecnobooth-a37c0.appspot.com",
    messagingSenderId: "1069000362437",
    appId: "1:1069000362437:web:f65f9f08b3906ee740e3ac"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export default {
    firebase,
    db,
}
import firebase from "firebase";
import 'firebase/firestore';
import 'firebase/auth';

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

try {
    firebase.initializeApp(firebaseConfig);
}
catch (error) {
    if(!/already exists/.test(error.message)) {
        console.error("Error de inicializacion de Firebase", error.stack);
    }
}

const db = firebase.firestore();
const auth = firebase.auth();

export default {
    firebase,
    db,
    auth,
}
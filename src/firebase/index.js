import firebase from "firebase";

if(process.env.NODE_ENV == 'production'){
    var config = {
        apiKey: process.env.API_KEY.toString(),
        authDomain: process.env.AUTH_DOMAIN.toString(),
        databaseURL: process.env.DATABASE_URL.toString(),
        projectId: process.env.PROJECT_ID.toString(),
        storageBucket: process.env.STORAGE_BUCKET.toString(),
        messagingSenderId: process.env.MESSAGING_SENDER_ID.toString()
    };
} else {
    var config = require('../../config/config').config;
    
}


try {
    firebase.initializeApp(config);
} catch (e) {

}

export var twitterProvider = new firebase.auth.TwitterAuthProvider();
export var firebaseRef = firebase.database().ref();
export default firebase;

import firebase from "firebase";

if(process.env.NODE_ENV == 'production'){
    var config = {
        apiKey: process.env.API_KEY,
        databaseURL: process.env.DATABASE_URL,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID
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

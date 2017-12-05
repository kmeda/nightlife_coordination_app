import firebase from "firebase";

if(process.env.NODE_ENV == 'production'){
    var config = {
        apiKey: JSON.stringify(process.env.API_KEY),
        authDomain: JSON.stringify(process.env.AUTH_DOMAIN),
        databaseURL: JSON.stringify(process.env.DATABASE_URL),
        projectId: JSON.stringify(process.env.PROJECT_ID),
        storageBucket: JSON.stringify(process.env.STORAGE_BUCKET),
        messagingSenderId: JSON.stringify(process.env.MESSAGING_SENDER_ID)
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

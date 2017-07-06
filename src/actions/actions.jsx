import firebase, {firebaseRef, twitterProvider} from '../firebase/index.js';
import axios from "axios";

export var setSearchTerm = (term)=>{
  return {
    type: "SET_SEARCH_TERM",
    term
  }
}

export var saveSearch = ()=>{
  //if uid
  //cpature and set searchTerm in state and push to user recent searches in firebase on enter
  //else
  //return the search results fitering all users
}


export var getRecentSearch = (searchTerm)=>{

  return (dispatch, getState)=>{

    axios.get("http://localhost:3050/yelpapi").then((res)=>{
      console.log(res.data.data);
    })
  };

}




//Login Logout actions
export var login = (uid, name) =>{
  return {
    type: "LOGIN",
    uid,
    name
  }
}

export var loggingIn = (setFlag) =>{
  return {
    type: "LOGGING_IN",
    setFlag
  }
}

export var startLogin = () => {
  return (dispatch, getState)=>{

    return firebase.auth().signInWithPopup(twitterProvider).then((result)=>{
      dispatch(loggingIn(false));
    }, (error)=>{
      console.log("Unable to Auth.", error);
    });
  };
}
export var logout = ()=>{
  return {
    type: "LOGOUT"
  }
};
export var startLogout = () => {
  return (dispatch, getState)=>{
    return firebase.auth().signOut().then(()=> {
      dispatch(logout());
  console.log("Logged out!");
});
  };
}

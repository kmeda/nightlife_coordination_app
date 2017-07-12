import firebase, {firebaseRef, twitterProvider} from '../firebase/index.js';
import axios from "axios";


//Search input set/clear actions
export var setSearchTerm = (term)=>{
  return {
    type: "SET_SEARCH_TERM",
    term
  }
}

export var clearSearchTerm = ()=>{
  return {
    type: "CLEAR_SEARCH_TERM"
  }
}

export var saveSearchTerm = (term)=>{
  return {
    type: "SAVE_SEARCH_TERM",
    term
  }
}

export var saveSearchHistory = (term)=>{
  //if user logged in update to firebase
}

export var fetchItems = (payload)=>{
  return {
    type: "FETCH_ITEMS",
    payload
  }
}

export var clearItems = ()=>{
    return {
      type: "CLEAR_ITEMS"
    }
}

export var getRecentSearch = (searchTerm, offset)=>{

  return (dispatch, getState)=>{
    axios.get(`http://localhost:3050/yelpapi?location=${searchTerm}&offset=${offset}`).then((res)=>{
      dispatch(fetchItems(res.data.data.businesses));
      console.log(res.data.data);
    })
  };
}

//set offset

export var incrementOffset = (val) =>{
  return {
    type: "INCREMENT_OFFSET",
    val
  }
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

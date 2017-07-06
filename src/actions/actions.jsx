import firebase, {firebaseRef, twitterProvider} from '../firebase/index.js';


export var saveSearch = ()=>{
  //if uid
  //cpature and set searchTerm in state and push to user recent searches in firebase on enter
  //else
  //return the search results fitering all users
}


export var getRecentSearch = (searchTerm)=>{
  // import yelpAPI calls
  // call should post credentials and retrive an auth token
  // call should set header token and return a promise
  // returned promise accepts the searchTerm and gets the search results
  //invoke axios requests and dispatch actions to get results and set new state.

  //state change will trigger component to render the list.

  // go with the flow and then refactor

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
  console.log("Logged out!");
});
  };
}

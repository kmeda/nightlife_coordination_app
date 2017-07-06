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
  // import yelpAPI calls
  // call should post credentials and retrive an auth token
  // call should set header token and return a promise
  // returned promise accepts the searchTerm and gets the search results
  //invoke axios requests and dispatch actions to get results and set new state.

  //state change will trigger component to render the list.

  // go with the flow and then refactor

  return (dispatch, getState)=>{

    const config = {
            method: 'post',
            url: "https://api.yelp.com/oauth2/token",
            data:null,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
              grant_type: "client_credentials",
              client_id: "W4toIoITHRYWdM2Ye27wsQ",
              client_secret: "h8hEAuzO9TvuXjriOwqdrLaPm0j4UYCCOroRwvsvZ0odI3iJmLEsnYAaaZ1PUJR3"
            },
      };

    var headers = {
      'Access-Control-Allow-Origin': '*',
      grant_type: "client_credentials",
      client_id: "W4toIoITHRYWdM2Ye27wsQ",
      client_secret: "h8hEAuzO9TvuXjriOwqdrLaPm0j4UYCCOroRwvsvZ0odI3iJmLEsnYAaaZ1PUJR3"
    }

    axios.request(config).then((res)=>{
      console.log(res);
    }).catch((error)=>console.log(error));
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

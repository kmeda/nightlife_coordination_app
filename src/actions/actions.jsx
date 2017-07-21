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

//actions to fetch results

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
export var totalBars = (total)=>{
  return {
    type: "TOTAL_BARS",
    total
  }
}
export var cleartotalBars = ()=>{
  return {
    type: "CLEAR_TOTAL_BARS"
  }
}
export var getRecentSearch = (searchTerm, offset)=>{

  return (dispatch, getState)=>{

    axios.get(`https://nightlife-coordination-fcc.herokuapp.com/yelpapi/businesses?location=${searchTerm}&offset=${offset}`).then((res)=>{
      let businesses = [];
      dispatch(totalBars(res.data.data.total));

        var resolveAll = res.data.data.businesses.map((business)=>{
         return axios.get(`https://nightlife-coordination-fcc.herokuapp.com/yelpapi/reviews?id=${business.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`).then((result)=>{

            let obj = Object.assign({}, business, {reviews: result.data.data.reviews});
            businesses.push(obj);

        });
      });
      axios.all(resolveAll).then(()=>{
        dispatch(fetchItems(businesses));
      });
      // dispatch(fetchItems(businesses));
    });
  };
}

// Loading progress
export var initialLoading = (val) =>{
  return {
    type: "INITIAL_LOADING",
    val
  }
}
export var loadingMore = (val) =>{
  return {
    type: "LOADING_MORE",
    val
  }
}


//set offset
export var incrementOffset = () =>{
  return {
    type: "INCREMENT_OFFSET"
  }
}
export var clearOffset = ()=>{
  return {
    type: "CLEAR_OFFSET"
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

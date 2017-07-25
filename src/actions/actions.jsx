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
  return (dispatch, getState)=>{
    var uid = getState().auth.uid;

    var setSearchTerm = firebaseRef.child(`users/${uid}/searchHistory`);
    setSearchTerm.set(term);

  }
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
    var uid = getState().auth.uid || null;

    var fetchUserList = firebaseRef.child(`goingList`);
    var getBars = process.env.NODE_ENV === 'production'
                  ? `https://nightlife-coordination-fcc.herokuapp.com/yelpapi/businesses?location=${searchTerm}&offset=${offset}`
                  : `http://localhost:3050/yelpapi/businesses?location=${searchTerm}&offset=${offset}`;

    axios.get(getBars).then((res)=>{
      let businesses = [];
      dispatch(totalBars(res.data.data.total));

        var resolveAll = res.data.data.businesses.map((business)=>{
         var getReviews = process.env.NODE_ENV === 'production'
                          ? `https://nightlife-coordination-fcc.herokuapp.com/yelpapi/reviews?id=${business.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`
                          : `http://localhost:3050/yelpapi/reviews?id=${business.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`;

         return axios.get(getReviews).then((result)=>{
            let obj = Object.assign({}, business, {reviews: result.data.data.reviews});
            businesses.push(obj);
        });
      });
      resolveAll.push(fetchUserList.once("value"));

      axios.all(resolveAll).then((res)=>{
        // var fetchUserList = firebaseRef.child(`goingList`);

           var barsList = res[res.length-1].val() || [];
           Object.keys(barsList).map((key)=>{
             businesses.map((business)=>{
               if(business.id.normalize('NFD').replace(/[\u0300-\u036f]/g, "") === key){
                 business["userData"] = barsList[key];
               }
             })
           })
           console.log(businesses);
          //console.log(res[res.length-1].val());
           
          //  console.log(res);
           dispatch(fetchItems(businesses));


      });
    });
  };
}

export var getRecentSearchfromHistory = ()=>{
  return (dispatch, getState)=>{
    //should fetch searchterm from firebase
    //should set state searchTerm
    //should fetch results from yelp
    var uid = getState().auth.uid;
    var fetchSearchTerm = firebaseRef.child(`users/${uid}/searchHistory`);
    fetchSearchTerm.once("value").then((snapshot)=>{
      var term = snapshot.val();
      dispatch(saveSearchTerm(term));
      var searchTerm = getState().recentSearch.savedSearch;
      if (searchTerm === null) {
        return;
      } else {
        dispatch(initialLoading(true));
        dispatch(getRecentSearch(searchTerm, 0));
      }

    });

  };
}



// isGoing reducer actions
export var toggleGoing = (val)=>{
  return {
    type: "TOGGLE_GOING",
    val
  }
}

export var addUsertoBar = (id)=>{
  return (dispatch, getState)=>{
    var uid = getState().auth.uid;
    var bar_id = id.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    var addBar = firebaseRef.child(`goingList/${bar_id}`);
    addBar.push({uid: uid});
  }
}

export var removeUserfromBar = (id)=>{
  return (dispatch, getState)=>{
    var uid = getState().auth.uid;
    var removeBar = firebaseRef.child(`goingList/${id}`);

    removeBar.orderByChild('uid').equalTo(uid)
    .once('value').then((snapshot)=> {
        snapshot.forEach((childSnapshot)=> {
        removeBar.child(childSnapshot.key).remove();
    });
});

  }
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
      dispatch(clearItems());
      dispatch(clearOffset());
      dispatch(cleartotalBars());
  console.log("Logged out!");
});
  };
}

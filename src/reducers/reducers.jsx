export var authReducer = (state={loggingIn: false}, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        uid: action.uid,
        name: action.name
      };
    case "LOGGING_IN":
      return {
        ...state,
        loggingIn: action.setFlag
      }
    case "LOGOUT":
      return {loggingIn: false};
    default:
      return state;
  }
}


export var recentSearchReducer = (state={searchTerm: ""}, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.term
      }
    case "CLEAR_SEARCH_TERM":
    return {
      ...state,
      searchTerm: ""
    }
    case "SAVE_SEARCH_TERM":
    return {
      ...state,
      savedSearch: action.term
    }
    default:
      return state;
  }
}

export var searchResultsReducer = (state=[], action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return state.concat(action.payload)
    case "CLEAR_ITEMS":
      return [];
    default:
    return state;
  }
}

export var offsetReducer = (state={value: 0}, action)=>{
  switch (action.type) {
    case "INCREMENT_OFFSET":
      return {
        value: action.val
      }
    default:
      return state;
  }
}

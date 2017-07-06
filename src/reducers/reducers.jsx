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


export var recentSearchReducer = (state={}, action) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.term
      }
    default:
      return state;
  }
}

export var searchResultsReducer = (state={bars: []}, action) => {
  switch (action.type) {
    case "GET_SEARCH_RESULTS":
      return {
        bars: action.payload
      };
    default:
    return state;
  }
}

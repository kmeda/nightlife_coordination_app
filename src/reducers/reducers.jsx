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

export var searchResultsReducer = (state={bars: []}, action) => {
  switch (action.type) {
    case "FETCH_ITEMS":
      return {
        ...state,
        bars: state.bars.concat(action.payload)
      }
    case "UPDATE_COUNT":
      return {
        ...state,
        bars: action.businnesses
      }
    case "CLEAR_ITEMS":
      return {
        ...state,
        bars: []
      };
    case "TOTAL_BARS":
    return {
      ...state,
      totalBars: action.total
    }
    case "CLEAR_TOTAL_BARS":
    return {
      ...state,
      totalBars: null
    }
    default:
    return state;
  }
}

export var isGoingReducer = (state={isGoing: true}, action)=>{
  switch (action.type) {
    case "TOGGLE_GOING":
      return {
        ...state,
        isGoing: action.val ? false : true
      }
    default:
      return state;
  }

}

export var offsetReducer = (state={value: 0}, action)=>{
  switch (action.type) {
    case "INCREMENT_OFFSET":
      return {
        value: state.value+20
      }
    case "CLEAR_OFFSET":
      return {
        value: 0
      }
    default:
      return state;
  }
}

export var loadingProgressReducer = (state={loading: false}, action) =>{
  switch (action.type) {
    case "INITIAL_LOADING":
      return {
        ...state,
        loading: action.val
      };
    case "LOADING_MORE":
      return {
        ...state,
        loadingMore: action.val
      }
    default:
      return state;
  }
}

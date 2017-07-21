import * as Redux from 'redux';
import thunk from 'redux-thunk';

import {authReducer, recentSearchReducer, searchResultsReducer, offsetReducer, loadingProgressReducer} from '../reducers/reducers.jsx';

export var configure = (initialState = {}) => {

  var reducer = Redux.combineReducers({
    auth: authReducer,
    recentSearch: recentSearchReducer,
    searchResults: searchResultsReducer,
    offset: offsetReducer,
    loadingProgress: loadingProgressReducer
  });

  var store = Redux.createStore(
    reducer,
    initialState,
    Redux.compose(
      Redux.applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
}
   

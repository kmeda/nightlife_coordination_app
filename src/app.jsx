import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import firebase, {firebaseRef, twitterProvider} from './firebase/index.js';

import Home from './components/Home.jsx';

import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/main.scss';
const actions = require('./actions/actions.jsx');
var store = require('./store/configureStore.jsx').configure();



firebase.auth().onAuthStateChanged((user)=>{
  if (user) {
    store.dispatch(actions.login(user.uid, user.displayName));
    store.dispatch(actions.getRecentSearchfromHistory());
  } else {
    store.dispatch(actions.logout());
  }
});

var fetchCount = firebaseRef.child(`goingList`);
fetchCount.on('value', (data)=>{
  ReactDOM.render(
    <Provider store={store}>
      <Home countData={data.val()}/>
    </Provider>,
    document.getElementById('root'));

})

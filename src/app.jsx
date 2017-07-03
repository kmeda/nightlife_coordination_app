import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";

import Home from './components/Home.jsx';

import '../styles/main.scss';

var store = require('./store/configureStore.jsx').configure();


ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('root'));

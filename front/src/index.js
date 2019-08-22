import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';

import './styles/index.scss';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';

import * as reducers from './store/reducer';
const store =  createStore(combineReducers(reducers));//, applyMiddleware(thunk));

ReactDOM.render(<App/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

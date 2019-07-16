import React from 'react'
import ReactDOM from 'react-dom'
import Login from './login'
import {applicationReducer, foldersReducer, documentsReducer} from './reducers'
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger'
import initDataStore from './data-store';
import {documentsUpdate$, applicationExit$} from './application-events.js'
import firebase from 'firebase'

const loggerMiddleware = createLogger()

let store = createStore(
    combineReducers({
    applicationState: applicationReducer,
    foldersPanel: foldersReducer,
    documentsFolder: documentsReducer    
    }), 
    applyMiddleware(
      thunkMiddleware/*,
      loggerMiddleware*/
    )
  );

const debounceTimeInSeconds = 30;
initDataStore(documentsUpdate$, applicationExit$, debounceTimeInSeconds, firebase.firestore());

ReactDOM.render(
<Provider store={store}>
    <Login />
</Provider>, 
  document.getElementById('root'));

if (module.hot) {
    module.hot.accept()
  }

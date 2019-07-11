import React, {useState, useEffect} from 'react'
import App from './app'
import firebase from 'firebase'
import firebaseConfig from './firebaseconfig.json'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {connect} from 'react-redux'
import {setLoggedUserEmail} from './actions'
import {GlobalState} from './types'

firebase.initializeApp(firebaseConfig);

const firebaseSigninConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID      
    ],
    callbacks: {      
      signInSuccessWithAuthResult: () => false
    }
  };

function mapStateToProps(state : GlobalState) {
  return {
    loggedUserEmail : state.applicationState.loggedUserEmail
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setLoggedUserEmail : (loggedUserEmail) => dispatch(setLoggedUserEmail(loggedUserEmail))
  }
}

function ConnectedLogin(props)
{
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => 
        {
            props.setLoggedUserEmail(user ? user.email : "");       
        });
    });    
    
    if(props.loggedUserEmail === "")
    {
        return <StyledFirebaseAuth uiConfig={firebaseSigninConfig} firebaseAuth={firebase.auth()}/>
    }
    else
    {
        return <App firebase={firebase}></App>
    }    
}

const Login = connect(mapStateToProps, mapDispatchToProps)(ConnectedLogin);

export default Login
import React, {useState, useEffect} from 'react'
import App from './app.js'
import firebase from 'firebase'
import firebaseConfig from './firebaseconfig.json'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

firebase.initializeApp(firebaseConfig);

const firebaseSigninConfig = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID      
    ],
    callbacks: {      
      signInSuccessWithAuthResult: () => false
    }
  };

function Login()
{
    const [user, setUser] = useState(firebase.auth().currentUser);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => 
        {
            setUser(user);       
        });
    });

    if(!user)
    {
        return <StyledFirebaseAuth uiConfig={firebaseSigninConfig} firebaseAuth={firebase.auth()}/>
    }
    else
    {
        return <App userEmail={user.email}></App>
    }    
}
export default Login
import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from './../../App';
import { useHistory, useLocation } from 'react-router-dom';

if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
}else{
    firebase.apps();
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleLogIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
          var credential = result.credential;
          var token = credential.accessToken;
          var {displayName, email} = result.user;
          const newUserInfo = {name:displayName, email};
          setLoggedInUser(newUserInfo);
          history.replace(from);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          var email = error.email;
          var credential = error.credential;
          console.log(errorCode, errorMessage)
        });
    }


    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleLogIn}>Google</button>
        </div>
    );
};

export default Login;
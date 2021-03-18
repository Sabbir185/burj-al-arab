import React, { useContext, useState } from 'react';
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
    const [user, setUser] = useState({
        isSignIn:false,
        email:'',
        password:'',
        name:''
    });
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


    // user login by email and password
    const handleForm = () => {

    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if(e.target.name === 'email'){
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if(e.target.name === 'password'){
            const isPasswordValid = e.target.value.length > 5 ;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }


    return (
        <div className="text-center">
            <h1>This is Login</h1>
            <button onClick={handleGoogleLogIn} className='btn btn-primary'>Google</button>

            <div className="row">
                <div className="col-3"></div>
                <div className="col-6 mt-5 mb-5">

                    <h4>Name : {user.name}</h4>
                    <h4>Email : {user.email}</h4>
                    <h4>Password : {user.password}</h4>
                    <h4 className='text-primary'>User sign up form</h4>
                    <form onClick={handleForm}>
                        <input type="text" name="name" onBlur={handleBlur} className='form-control' placeholder='Name'/>
                        <br/>
                        <input type="text" name="email" onBlur={handleBlur} className='form-control' placeholder='Email'/>
                        <br/>
                        <input type="password" name="password" onBlur={handleBlur}
                        className='form-control' placeholder='Password'/>
                        <br/>
                        <input type="submit" value="Submit" className='btn btn-primary'/>
                    </form>

                </div>
                <div className="col-3"></div>
            </div>
        </div>
    );
};

export default Login;
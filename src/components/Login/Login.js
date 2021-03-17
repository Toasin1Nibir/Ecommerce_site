import React, { useContext, useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  }
function Login() {
  const [ newUser , setnewUser] = useState(false)
  const [user , setUser] = useState({
    isSignedin : false,
    name :'',
    photo:'',
    email:'',
    password:''
  })

  var provider = new firebase.auth.GoogleAuthProvider();
  var fbprovider = new firebase.auth.FacebookAuthProvider();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const handleSignIn =()=>{
    firebase.auth().signInWithPopup(provider)
    .then(res => {
      const { displayName ,photoURL ,email} = res.user;
      const signedInuser = {
        isSignedin : true,
        name :displayName,
        photo:photoURL,
        email:email
      }
      setUser(signedInuser)
      console.log(displayName ,photoURL ,email)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handleSignOut =()=>{
    firebase.auth().signOut()
    .then(res => {
      const signedOutuser = {
        isSignedin : false,
        name :'',
        photo:'',
        email:'',
        error:'',
        success: false
      }
      setUser(signedOutuser)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  const handleFbSignin=()=>{
    firebase.auth().signInWithPopup(fbprovider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // The signed-in user info.
    var user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var accessToken = credential.accessToken;
   console.log('fb after',user)

    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;

    // ...
  });
  }

  const handleChange =(e) =>{
    let isFormValid = true
    // console.log(e.target.name, e.target.value)
    if(e.target.name === 'email')
    {
      isFormValid = /\S+@\S+\.\S+/.test(e.target.value)
    }
    if(e.target.name === 'password'){
      const isPassword = e.target.name.length > 6
      const passwordFormat = /\d{1}/.test(e.target.value)
      isFormValid = isPassword && passwordFormat
    }
    if(isFormValid)
    {
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value
      setUser(newUserInfo)
    }
  }
  const handleSubmit =(e)=>{
    if(newUser && user.email && user.password){
      firebase.auth().createUserWithEmailAndPassword(user.email ,user.password)
      .then(res => {
      const newUserInfo = {...user}
      newUserInfo.error = ''
      newUserInfo.success = true
      setUser(newUserInfo)
      updateUserName(user.name)
      })
      .catch(error => {
      const newUserInfo = {...user}
      newUserInfo.error = error.message
      newUserInfo.success = false
      setUser(newUserInfo)
      });
    }
    if(!newUser && user.email && user.password){
      firebase.auth().signInWithEmailAndPassword(user.email ,user.password)
      .then(res => {
      const newUserInfo = {...user}
      newUserInfo.error = ''
      newUserInfo.success = true
      setLoggedInUser(newUserInfo)
      setUser(newUserInfo)
      console.log('sign in user info',res.user)
      })
      .catch(error => {
      const newUserInfo = {...user}
      newUserInfo.error = error.message
      newUserInfo.success = false
      setUser(newUserInfo)
      });
    }
    e.preventDefault()
  }
  const updateUserName = name =>{
    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
     }).then(function() {
      console.log('user name update successful')
     }).catch(function(error) {
        console.log(error)
});
  }
  return (
    <div style={{textAlign:'center'}}>
      
      {
        user.isSignedin ? <button onClick={handleSignOut}>sign out</button> : <button onClick={handleSignIn}>sign in</button>
      }
      <br/>
      <button onClick={handleFbSignin}>Facebook sign in</button>
      {
        user.isSignedin &&
        <div>
           <p>welcome is {user.name}</p>
           <h1>email is {user.email}</h1>
           <img src={user.photo} alt=""></img>
        </div>
       
      }

      <h1>Welcome to authorization</h1>
      <input type="checkbox" onChange={()=>setnewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign Up</label>
      

      <form onSubmit={handleSubmit}>
     { newUser && <input type="text" name="name" onBlur={handleChange} placeholder="enter name"/>}
      <br/>
      <input type="text" name="email" onBlur={handleChange} placeholder='Your name' required/>
      <br/>
      <input type="password" name="password" id="" onBlur={handleChange} placeholder='Your password' required/>
      <br/>
      <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>
      </form>
      <p style={{color: 'red'}}>{user.error} </p>
      {user.success && <p style={{color: 'green'}}> {newUser ? 'Created ' : 'logged in'} Suceessful </p>}
      
    </div>
  );
}




export default Login;

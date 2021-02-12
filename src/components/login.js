import React, { useState, useContext } from 'react';
import { AuthContext } from "../App";
import firebase from 'firebase'
import PropTypes from 'prop-types';
import './login.css';

require('firebase/auth')

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setErrors] = useState();
  
  const Auth = useContext(AuthContext);
  
  const handleSubmit = e => {
    e.preventDefault();
    firebase
       .auth()
       .signInWithEmailAndPassword(email, password)
       .then(res => {
          console.log(res)
          if (res.user) Auth.setLoggedIn(true);
       })
       .catch(e => {
          setErrors(e.message);
       });
  };
  
  return(
    <div>
      <h1>Log In</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <a href="/signup">
        Create an account
      </a>
    </div>
  )
}

export default Login;
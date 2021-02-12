import React, { useState, useContext } from 'react';
import firebase from 'firebase'
import { AuthContext } from "../App";
import './Signup.css';

require('firebase/auth')

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setErrors] = useState("");
    
    const Auth = useContext(AuthContext);
    
    const handleSubmit = e => {
       e.preventDefault();
       firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(res => {
             console.log(res)
             if (res.user) Auth.setLoggedIn(true);
          })
          .catch(e => {
             setErrors(e.message);
          });
    };
    
    return (
        <div>
            <h1>Sign Up</h1>
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
                  <button type="submit">Sign In</button>
                </div>
                
                <span>{error}</span>
            </form>
        </div>      
    );
};

export default Signup;
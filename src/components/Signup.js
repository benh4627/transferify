import React, { useContext, useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import firebase from 'firebase';
import './Signup.css';
import Logo from './Logo.js';

var countRef;

const Signup = ({ history }) => {
  var database = firebase.database();
  
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password, name, year, major } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then((res) => { 
          res.user.updateProfile({ displayName: name.value })
          database.ref("names/" + res.user.uid).set({ name: name.value })
          database.ref("years/" + res.user.uid).set({ gradYear: year.value })
          database.ref("majors/" + res.user.uid).set({ major: major.value })
          database.ref("emails/" + res.user.uid).set({ email: email.value })
          countRef = database.ref("userCount/")
          countRef.transaction(function (currUsers) {
            return (currUsers || 0) + 1;
          })
        })
      history.push("/");
      
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <div className="Home Signup">
      <Logo />
        <form onSubmit={handleSignUp}>
            <input name="name" type="name" placeholder="Full Name" />
            <input name="email" type="email" placeholder="Email" />
            <input name="year" type="year" placeholder="Graduation Year" />
            <input name="major" type="major" placeholder="Major" />
            <input name="password" type="password" placeholder="Password" /> 
            <button type="submit">Sign Up</button>
        </form>
      </div>      
    );
};

export default Signup;
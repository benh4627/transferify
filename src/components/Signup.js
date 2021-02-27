import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import './Signup.css';
import Logo from './Logo.js';

const Signup = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value);
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
            <input name="password" type="password" placeholder="Password" />
         <div>
            <button type="submit">Sign Up</button>
         </div>

        </form>
      </div>      
    );
};

export default withRouter(Signup);
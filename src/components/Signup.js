import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "../base";
import './Signup.css';

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
    <div>
      <h1>Sign Up</h1>
        <form onSubmit={handleSignUp}>
          <label>
            <p>Email</p>
            <input name="email" type="email" placeholder="Email" />
          </label>
                  
          <label>
            <p>Password</p>
            <input name="password" type="password" placeholder="Password" />
          </label>
                  
         <div>
            <button type="submit">Sign Up</button>
         </div>

        </form>
      </div>      
    );
};

export default withRouter(Signup);
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth.js";
import './login.css';
import './Home.css';
import Logo from './Logo.js';


const Login = ({ history }) => {
  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return(
    <div className="Home Login">
      
      <Logo />
      <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" />
        <br/>
          <input name="password" type="password" placeholder="Password" />
        <div>
          <button type="submit">Log In</button>
        </div>
      </form>
      <a href="/signup">
        Create an account
      </a>
    </div>
  )
};

export default withRouter(Login);
import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "../base.js";
import { AuthContext } from "../Auth.js";
import './Login.css';

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
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Email</p>
          <input name="email" type="email" placeholder="Email" />
        </label>
        <label>
          <p>Password</p>
          <input name="password" type="password" placeholder="Password" />
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
};

export default withRouter(Login);
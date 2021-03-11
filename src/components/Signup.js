import React, { useContext, useCallback, useState } from "react";
import { withRouter } from "react-router";
import app from "../base";
import firebase from 'firebase';
import './Signup.css';
import Logo from './Logo.js';
import { storage } from "../base.js"

var countRef;
var img;

const Signup = ({ history }) => {
  var database = firebase.database();
  const [image, setImage] = useState(null);

  const handleChange = useCallback(async event => {
    event.preventDefault();
    if (event.target.files[0]) {
      img = (event.target.files[0]);
    }
  }, []);

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
          database.ref("prereqs/" + res.user.uid).set({prereqs: "N/A"})
          database.ref("classplanner/" + res.user.uid).set({classPlanner: "N/A"})
          database.ref("emails/" + res.user.uid).set({ email: email.value })
          storage.ref("images/" + res.user.uid).put(img);
          database.ref("uids/" + res.user.uid).set({ uid: res.user.uid });
          database.ref("class1/" + res.user.uid).set({ class1: "N/A" });
          database.ref("class2/" + res.user.uid).set({ class2: "N/A" });
          database.ref("class3/" + res.user.uid).set({ class3: "N/A" });
          database.ref("class4/" + res.user.uid).set({ class4: "N/A"});
          countRef = database.ref("userCount/")
          countRef.transaction(function (currUsers) {
            return (currUsers || 0) + 1;
          })
        })
      history.push("/");

    } catch (error) {
      alert(error);
    }
  }, [history, image]);

  return (
    <div className="Home Signup">
      <Logo />
        <p>Sign up with a profile picture, name, email, graduation year, major, and password</p>
        <input type="file" onChange={handleChange} />
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

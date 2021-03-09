import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth.js";
import firebase from 'firebase';
import { storage } from "../base.js"
import "./ProfilePage.css"

var year;
var major;
var count;
  
const ProfilePage = () => {
  const {currentUser} = useContext(AuthContext);
  var database = firebase.database();
  
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  
  const handleChange = e => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    const uploadTask = storage.ref("images/" + currentUser.uid).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("images/" + currentUser.uid)
          .getDownloadURL()
          .then(url => {
            setUrl(url);
          });
      }
    );
  };
  
  const imgRef = storage.ref("images/" + currentUser.uid);
  const imgUrl = imgRef.getDownloadURL().then(url => {setUrl(url)});
  
  const yearRef = database.ref("years/" + currentUser.uid);
  yearRef.on("value", getYear);

  const majorRef = database.ref("majors/" + currentUser.uid);
  majorRef.on("value", getMajor);

  const countRef = database.ref("userCount/");
  countRef.on("value", getCount);
  
  function getYear(data) {
    var yearData = data.val();
    var key = Object.keys(yearData);
    year = yearData[key];
  }

  function getMajor(data) {
    var majorData = data.val();
    var key = Object.keys(majorData);
    major = majorData[key];
  }
  
  function getCount(snap) {
    count = snap.val();
  }
  
  console.log(count);

  return ( 
    <div className = "profileInfoCard">
      <h1 class='profileTitle'>Student Information</h1>
 
      <div class = "Pic">
         <img src={url} alt="studentPic" />
      </div>
      <form class = "profileLabels">
        <label>Name: {currentUser.displayName}</label>
        <br></br>
        <label>Email: {currentUser.email}</label>
        <br></br>
        <label>Graduation Year: {year}</label>
        <br></br>
        <label>Major: {major}</label>
      </form>

      
      <div className = "uploadPhoto">
        <input type="file" onChange={handleChange} />
        <button onClick={handleUpload}>Upload</button>
        <progress value={progress} max="100" />
      </div>
      
    </div>
  );
};

export default withRouter(ProfilePage);

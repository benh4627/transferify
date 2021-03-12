import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth.js";
import firebase from 'firebase';
import { storage } from "../base.js"
import "./ProfilePage.css"
import blankPic from '../images/blank_profile.png'

var year;
var major;
var count;
var myclass;
var completedPrereqs;
var class1;
var class2;
var class3;
var class4;

function Planner() {
  var ret = [];
  var classList = [];
  if (myclass){
    console.log(myclass)
    var classes = myclass;
    var end = classes.search(",");
    var eachClass;
    while (end > 0) {
      eachClass = classes.slice(0, end)
      classList.push(eachClass);
      classes = classes.slice(end+1);
      var end = classes.search(",");
    }
    eachClass = classes;
    classList.push(eachClass);
    console.log("class list: ", classList);

    for (var i = 0; i < classList.length; i++) {
        var newid = "planCard".concat(i+1);
      ret.push(
        <div class = "droptarget">
            <div draggable="true" class="planCard" >
              {classList[i]}
            </div>
        </div>
      );
    }
    return ret;
  }
  return ret;
}

function Dropzone() {
    return(
        <div>
            <div id="class12" class="droptarget"></div>
            <div id="class12" class="droptarget"></div>
            <div id="class34" class="droptarget"></div>
            <div id="class34" class="droptarget"></div>
        </div>
    );
}

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

   useEffect(() => {
        const imgRef = storage.ref("images/" + currentUser.uid);
        const imgUrl = imgRef.getDownloadURL().then(url => {setUrl(url)});

        const yearRef = database.ref("years/" + currentUser.uid);
        yearRef.on("value", (data) => {
            var yearData = data.val();
            var key = Object.keys(yearData);
            year = yearData[key];
        });

        const majorRef = database.ref("majors/" + currentUser.uid);
        majorRef.on("value", (data) => {
            var majorData = data.val();
            var key = Object.keys(majorData);
            major = majorData[key];
        });

        const countRef = database.ref("userCount/");
        countRef.on("value", (snap) => {
            count = snap.val();
        });

        const classRef = database.ref("classplanner/" + currentUser.uid);
        classRef.on("value", (data) => {
            var classData = data.val();
            var key = Object.keys(classData);
            myclass = classData[key];
        });
        const prereqsRef = database.ref("prereqs/" + currentUser.uid);
        prereqsRef.on("value", (data) => {
            var prereqsData = data.val();
            var key = Object.keys(prereqsData);
            completedPrereqs = prereqsData[key];
        });
        const class1Ref = database.ref("class1/" + currentUser.uid);
        class1Ref.on("value", (data) => {
            var class1Data = data.val();
            var key = Object.keys(class1Data);
            class1 = class1Data[key];
        });
        const class2Ref = database.ref("class2/" + currentUser.uid);
        class2Ref.on("value", (data) => {
            var class2Data = data.val();
            var key = Object.keys(class2Data);
            class2 = class2Data[key];
        });
        const class3Ref = database.ref("class3/" + currentUser.uid);
        class3Ref.on("value", (data) => {
            var class3Data = data.val();
            var key = Object.keys(class3Data);
            class3 = class3Data[key];
        });
        const class4Ref = database.ref("class4/" + currentUser.uid);
        class4Ref.on("value", (data) => {
            var class4Data = data.val();
            var key = Object.keys(class4Data);
            class4 = class4Data[key];
        });
    }, []);

  return (
    <div>
        <div className = "profileInfoCard">
            <h1 class='profileTitle'>Student Information</h1>

            <div class = "Pic">
                <img src={url ? url : blankPic} alt="studentPic" />
            </div>
            <form class = "profileLabels">
              <label>Name: {currentUser.displayName}</label>
              <br></br>
              <label>Email: {currentUser.email}</label>
              <br></br>
              <label>Graduation Year: {year ? year : "Retrieving data"}</label>
              <br></br>
              <label>Major: {major ? major : "Retrieving data"}</label>
             </form>


            <div className = "uploadPhoto">
                <input type="file" onChange={handleChange} />
                <progress value={progress} max="100" />
                <br></br>
                <button onClick={handleUpload}>Upload</button>
            </div>
        </div>

        <div class='profilePlan'>
            <h1 class='planTitle'>Planning Schedule</h1>
                <div>Completed Prereqs: {completedPrereqs} </div>
                <div class='planner'>
                  <Planner/>
                </div>
            </div>
    </div>

  );
};

export default withRouter(ProfilePage);

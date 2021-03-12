import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth.js";
import firebase from 'firebase';
import { storage } from "../base.js"
import "./ProfilePage.css"
import blankPic from '../images/blank_profile.png'

var name;
var year;
var major;
var count;
var myclass;

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
      ret.push(
        <div draggable="true" class="planCard">     
          {classList[i]}
        </div>
      );
    }
    return ret;
  }
  return ret;
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
  
  const EditProfile = () => {
    var setinfo = document.getElementsByClassName("setProfile");
    for (var i = 0; i < setinfo.length; i++) {
      console.log("hide");
      setinfo[i].style.display = "none";
    }
    document.getElementById("editButton").style.display = "none";
    var editinfo = document.getElementsByClassName("editProfile");
    for (var i = 0; i < editinfo.length; i++) {
      console.log("show");
      editinfo[i].style.display = "initial";
    }
    document.getElementById("submitButton").style.display = "initial";
  };

  const UpdateProfile = () => {
    var newName = document.getElementById("newName").value;
    var newYear = document.getElementById("newYear").value;
    var newMajor = document.getElementById("newMajor").value;
    console.log(newName, newYear, newMajor);
    if (newName != "") {
      database.ref("names/" + currentUser.uid).update({name: newName});
    }
    if (newYear != "") {
      database.ref("years/" + currentUser.uid).update({gradYear: newYear});
    }
    if (newMajor != "") {
      database.ref("majors/" + currentUser.uid).update({major: newMajor});
    }

    var setinfo = document.getElementsByClassName("setProfile");
    for (var i = 0; i < setinfo.length; i++) {
      setinfo[i].style.display = "initial";
    }
    document.getElementById("editButton").style.display = "initial";
    var editinfo = document.getElementsByClassName("editProfile");
    for (var i = 0; i < editinfo.length; i++) {
      editinfo[i].style.display = "none";
    }
    document.getElementById("submitButton").style.display = "none";
  };


   useEffect(() => { 
        const imgRef = storage.ref("images/" + currentUser.uid);
        const imgUrl = imgRef.getDownloadURL().then(url => {setUrl(url)});

        const nameRef = database.ref("names/" + currentUser.uid);
        nameRef.on("value", (data) => {
            var nameData = data.val();
            var key = Object.keys(nameData);
            name = nameData[key];
        });

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
    }, []);

  return ( 
    <div>
        <div className = "profileInfoCard">
            <h1 class='profileTitle'>Student Information</h1>
 
            <div class = "Pic">
                <img src={url ? url : blankPic} alt="studentPic" />
            </div>
            <form class = "profileLabels">
              <label class="setProfile">Name: {name ? name : "Retrieving data"}</label>
              <label class="editProfile">Name:    </label><input id="newName" type='text' class="editProfile" placeholder={name ? name : "Retrieving data"}></input>
              <br></br>
              
              <label >Email: {currentUser.email}</label>
              <br></br>

              <label class="setProfile">Graduation Year: {year ? year : "Retrieving data"}</label>
              <label class="editProfile">Graduation Year:  </label><input id="newYear" type='text' class="editProfile" placeholder={year ? year : "Retrieving data..."}></input>
              <br></br>

              <label class="setProfile">Major: {major ? major : "Retrieving data"}</label>
              <label class="editProfile">Major:    </label><input id="newMajor" type='text' class="editProfile" placeholder={major ? major : "Retrieving data..."}></input>
              <br/>
              
              <button type="button" id="editButton" class="editButton" width="50px" onClick={EditProfile}>Edit</button>
              <button type="button" id="submitButton" class="submitButton" onClick={UpdateProfile}>Submit</button>
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
                <div class='planner'>
                  <Planner/>
                </div>
            </div>
    </div>
    
  );
};

export default withRouter(ProfilePage);

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

function dragstart_handler(ev) {
    console.log("dragStart");
    // Change the source element's background color to signify drag has started
    ev.currentTarget.style.border = "dashed";
    // Set the drag's format and data. Use the event target's id for the data
    ev.dataTransfer.setData("text/plain", ev.target.id);
}
   
function dragover_handler(ev) {
    console.log("dragOver");
    ev.preventDefault();
}
   
function drop_handler(ev) {
    console.log("Drop");
    ev.preventDefault();
    // Get the data, which is the id of the drop target
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    // Clear the drag data cache (for all formats/types)
    ev.dataTransfer.clearData();
}

//-----------------------

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
                <button onClick={handleUpload}>Upload</button>
                <progress value={progress} max="100" />
            </div>
        </div>
        
        <div class='profilePlan'> 
            <h1 class='planTitle'>Planning Schedule</h1>
                <div class='planner'>
                    Drag and drop stuff...
                    <div>
                        <p id="source" draggable="true" ondragstart="dragstart_handler(event);" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
                            Class 1
                        </p>
                        <p id="source" draggable="true" ondragstart="dragstart_handler(event);" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
                            Class 2
                        </p>
                        <p id="source" draggable="true" ondragstart="dragstart_handler(event);" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
                            Class 3
                        </p>
                    </div>
                    <div id="target" ondrop="drop_handler(event);" ondragover="dragover_handler(event);">
                        Plan
                    </div>
                </div>
            </div>
    </div>
    
  );
};

export default withRouter(ProfilePage);

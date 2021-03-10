import React, { Component, useContext, useState } from 'react';
import './Profile.css';
import { withRouter } from "react-router";
import Logo from './Logo.js';
import { AuthContext } from "../Auth.js";
import { storage } from "../base.js"

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

    const handleUploadName = () => {
        const uploadTask = storage.ref("name/" + currentUser.uid).put(image);
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
    
  const ref = storage.ref("images/" + currentUser.uid);
  const murl = ref.getDownloadURL().then(url => {setUrl(url)});

    return (
        <div>
            {/*<Logo />*/}
            <div class='profileInfoCard'>
                <h1 class='profileTitle'>Student Information</h1>
                <img class='studentPic' src={url} alt="profilePic"  />
                <br></br>
                <div text-align='center'>
                    <progress value={progress} max="100" />
                    <input type="file" accept="image/*" onChange={handleChange} />
                    <button class="buttonhere" onClick={handleUpload}>Upload</button>
                </div>
                <form class='profileLabels'>
                    <label>Name:     </label>
                    <input type='text' class="placeholder" placeholder={currentUser.displayName} size='50'></input>
                    <br></br>
                    <br></br>
                    <label>Major:     </label>
                    <input type='text' class="placeholder" placeholder={currentUser.major} size='50'></input>
                    <br></br>
                    <br></br>
                    <label>Year:        </label>
                    <input type='text' class="placeholder" placeholder={currentUser.year} size='50'></input>
                    <br></br>
                    <br></br>
                    <label>Email:      </label>
                    <input type='text' class="placeholder" placeholder={currentUser.email} size='50'></input>
                    <br></br>
                    <button class="buttonhere" >Submit</button>
                </form>
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
}

export default withRouter(ProfilePage);

import React, { useContext, useState } from "react";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth.js";
import { storage } from "../base.js"
import "./ProfilePage.css"


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
  
  const ref = storage.ref("images/" + currentUser.uid);
  const murl = ref.getDownloadURL().then(url => {setUrl(url)});
  
  /*
  const Status =({
    onChange,
    value
  })=>
    <div className="field">
      <label htmlFor="status">
        status:
      </label>
      <input 
        id="status" 
        type="text" 
        onChange={onChange} 
        maxLength="35" 
        value={value} 
        placeholder="It's a nice day!" 
        required/>
    </div>
  */
  
  return (
    <div className = "Profile">
      <p>{currentUser.email}</p>
      <p>{currentUser.displayName}</p>
      <input year="year" type="year" placeholder="Graduation Year" />
      <progress value={progress} max="100" />
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
      <div class = "Pic">
         <img src={url} alt="profilePic" />
      </div>
      
    </div>
  );
};

export default withRouter(ProfilePage);

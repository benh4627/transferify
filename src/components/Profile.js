import React from 'react';
import './Profile.css';

const Profile = (props) => {
    return(
        <div className="Profile">
            <img src={props.image} />
            <h2>{props.name}</h2>
            {props.classes}
        </div>
    );
}

export default Profile;
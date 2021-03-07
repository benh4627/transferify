import React, { Component } from 'react';
import './Profile.css';
import { withRouter } from "react-router";
//const db = firebase.firestore();

import studentPic from '../images/Paul_Eggert.jpg';
class student {
    constructor(firstName, lastName, major, year, email) {
        this.image = studentPic;
        this.firstName = firstName;
        this.lastName = lastName
        this.major = major;
        this.year = year;
        this.email = email;
    }
};
let person = new student('First', 'Last', 'Computer Science', 2020, 'emailaddress@gmail.com');

function dragStart(ev) {
    ev.dataTransfer.effectAllowed = 'move';
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,0,0);
    return true;
}
function dragEnter(ev) {
    ev.preventDefault();
    return true;
}
function dragOver(ev) {
    return false;
}
function dragDrop(ev) {
    var src = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(src));
    ev.stopPropagation();
    return false;
}

class Profile extends React.Component {
    render() {
        return (
            <div>
                <div class='profileInfoCard'>
                    <h1 class='profileTitle'>Student Information</h1>
                    <img class='studentPic' src={person.image} />
                    <br></br>
                    <div text-align='center'>
                        <input type="file"   accept="image/*" name="image" id="file"></input>
                    </div>
                    <form class='profileLabels'>
                        <label>Name:     </label>
                        <input type='text' placeholder={person.firstName + ' ' + person.lastName} size='50'></input>
                        <br></br>
                        <br></br>
                        <label>Major:     </label>
                        <input type='text' placeholder={person.major} size='50'></input>
                        <br></br>
                        <br></br>
                        <label>Year:        </label>
                        <input type='text' placeholder={person.year} size='50'></input>
                        <br></br>
                        <br></br>
                        <label>Email:      </label>
                        <input type='text' placeholder={person.email} size='50'></input>
                        <input type="submit" value="Submit" float="right"></input>
                    </form>
                </div>
                <div class='profilePlan'> 
                    <h1 class='planTitle'>Planning Schedule</h1>
                    <div class='planner'>
                        Drag and drop stuff...
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Profile);

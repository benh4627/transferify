import React, { Component, useContext } from 'react';
import Button from "react-bootstrap/Button";
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Logo from './Logo.js';
import { AuthContext } from "../Auth.js";
import firebase from 'firebase';
import { storage } from "../base.js"
import { withRouter } from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./classcard.css";

const data = require('./CourseInformation.json');

const testCurrClassNameList = "CS 1,CS M152A";


class ClassData {
     constructor(className, classType, classDescription, prereqs, units, difficulty) {
         this.className = className;
         this.classType = classType;
         this.classDescription = classDescription;
         this.prereqs = prereqs;
         this.units = units;
         this.difficulty = difficulty;
     }
 };
const classList = [];

for (var i = 0; i < data.length; i++) {
    let currData = data[i];
    let newClass = new ClassData(currData.ClassName, currData.ClassType, currData.ClassDescription, currData.prereqs, currData.Units, currData.Difficulty);
    classList.push(newClass);
}

function PrereqList(props) {
    var listItems = [];
    if (props.prereqs == "N/A") {
        return(
            <Card.Text style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem'}}>None!</Card.Text>
        );
    }
    else {
        var split_reqs = props.prereqs.split(',');
        for (var i = 0; i < split_reqs.length; i++) {
            listItems.push(<ListGroup.Item>{split_reqs[i]}</ListGroup.Item>);
        }
    }
    return(
        <ListGroup variant="flush">
            {listItems}
        </ListGroup>
    );
}


const DifficultyBar = (props) => {
    let percentage = (props.difficulty / 5) * 100;
    return (
        <div className = "bar">
            <div style={{display: 'block'}}>
                <p className = "left"> Easy</p>
                <p className = "right"> Hard </p>
            </div>
            <div className = "pb-comp">
                <div className = "progress-bar">
                    <div className = "filler" style={{width: `${percentage}%`}}/>
                </div>
            </div>
        </div>
    )
}

function ClassCard(props) {
    const {currentUser} = useContext(AuthContext);

    return(
        <div className="box">
            <b>{props.ClassData.className}</b>
            <div>
                <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.ClassData.units} Units</Card.Subtitle>
                <div className="description">
                    <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.ClassData.classType}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem'}}>{props.ClassData.classDescription}</Card.Text>
                </div>
                <div>
                    <DifficultyBar difficulty = {props.ClassData.difficulty}/>
                    <div className = "prereqs">
                        <Card.Subtitle>Prerequisites:</Card.Subtitle>
                        <PrereqList prereqs = {props.ClassData.prereqs}/>
                    </div>
                </div>
                <Button className='addPlanner' onClick={() => addToPlanner(currentUser,props.ClassData.className,props.ClassData.prereqs)}>Add to Planner</Button>
                <Button className='addPrereq' onClick={() => addToPrereqs(currentUser,props.ClassData.className)}>Add to Completed Prereqs</Button>
            </div>
        </div>
    );
}

function ClassPlannerCard(props) {

    return(
        <div className="box">
            <b>{props.ClassData.className}</b>
            <div>
                <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.ClassData.units} Units</Card.Subtitle>
                <div className="description">
                    <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.ClassData.classType}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem'}}>{props.ClassData.classDescription}</Card.Text>
                </div>
                <div>
                    <DifficultyBar difficulty = {props.ClassData.difficulty}/>
                    <div className = "prereqs">
                        <Card.Subtitle>Prerequisites:</Card.Subtitle>
                        <PrereqList prereqs = {props.ClassData.prereqs}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

var classPlanner;
var userPrereqs;

function getClassPlanner(data) {
  var classPlannerData = data.val();
  var key = Object.keys(classPlannerData);
  classPlanner = classPlannerData[key];
}

function getUserPrereqs(data) {
  var userPrereqsData = data.val();
  var key = Object.keys(userPrereqsData);
  userPrereqs = userPrereqsData[key];
}

function addToPlanner(currentUser, className, prerequisites) {
    var needPrereqs = false;

    var database = firebase.database();

    const userPrereqsRef = database.ref("prereqs/" + currentUser.uid);
    userPrereqsRef.on("value", getUserPrereqs);

    const classPlannerRef = database.ref("classplanner/" + currentUser.uid);
    classPlannerRef.on("value", getClassPlanner);

    if (classPlanner != "N/A" && classPlanner != undefined) {
        var currentClasses = classPlanner.split(',');
        for (var i = 0; i < currentClasses.length; i++) {
            if (className == currentClasses[i]) {
                alert("Error: Already added " + className + " to plan");
                return;
            }
        }
    }

    if (prerequisites == "N/A") {
        needPrereqs = false;
    }
    else {
        if (userPrereqs == "N/A" || userPrereqs == undefined) {

            alert("Error: Missing Required Prereq: " + prerequisites);
            return;
        }
        var split_reqs = prerequisites.split(',');
        var split_userreqs = userPrereqs.split(',');
        for (var i = 0; i < split_reqs.length; i++) {
            if(split_reqs[i].includes("or")) {
                var mult_options = split_reqs[i].split(" or ");
                var completed = false;
                for (var j = 0; j < mult_options.length; j++) {
                    if (split_userreqs.includes(mult_options[j])) {
                        completed = true;
                    }
                }
                if (completed == false) {
                    alert("Error: Missing Required Prereq: " + split_reqs[i]);
                    return;
                }
            }
            else {
                if (!split_userreqs.includes(split_reqs[i])) {
                    alert("Error: Missing Required Prereq: " + split_reqs[i]);
                    needPrereqs = true;
                    break;
                }
            }
        }
    }
    if (needPrereqs == false) {
        if (classPlanner == "N/A" || classPlanner == undefined) {
            classPlannerRef.set({classPlanner: className});
        }
        else {
            classPlannerRef.set({classPlanner: classPlanner.concat("," + className)});
        }
        alert("ADDED TO PLANNER");

    }
}

function addToPrereqs(currentUser, className) {
    var database = firebase.database();

    const userPrereqsRef = database.ref("prereqs/" + currentUser.uid);
    userPrereqsRef.on("value", getUserPrereqs);
    console.log(userPrereqs);

    if (userPrereqs == "N/A" || userPrereqs == undefined) {
        userPrereqsRef.set({prereqs: className});
    }
    else {
        userPrereqsRef.set({prereqs: userPrereqs.concat("," + className)});
    }
    alert("ADDED TO PREREQS");
}

function CurrClasses(props) {
    const {currentUser} = useContext(AuthContext);
    var database = firebase.database();
    var listItems = [];
    var currClassList = [];

    const classPlannerRef = database.ref("classplanner/" + currentUser.uid);
    classPlannerRef.on("value", getClassPlanner);

    if (classPlanner == "N/A" || classPlanner == undefined) {
        return(
            <p style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem'}}>No Classes in Planner. Add from classes below!</p>
        );
    }
    else {
        var classNames = classPlanner.split(',');
        for (var i = 0; i < classNames.length; i++) {
            for (var j = 0; j < classList.length; j++) {
                if (classNames[i] == classList[j].className) {
                    let newClass = new ClassData(classList[j].className, classList[j].classType, classList[j].classDescription, classList[j].prereqs, classList[j].units, classList[j].difficulty);
                    currClassList.push(newClass);
                    j = classList.length;
                }
            }
        }

        for (var i = 0; i < currClassList.length; i++) {
            listItems.push(<ClassPlannerCard ClassData = {currClassList[i]}/>);

        }
        return listItems;
    }

}

function CardGroup(props) {
    var listItems = [];

    for (var i = 0; i < classList.length; i++) {
        listItems.push(<ClassCard ClassData = {classList[i]}/>);

    }
    return listItems;
}

function ClassCardGroup(props) {

    return(
        <div className="center">
            {/*<Logo />*/}
            <div className="bkgd_div">
                <h1>Classes in Your Planner</h1>
                <div className = "grid">
                    <CurrClasses />
                </div>
            </div>
            <div className="bkgd_div">
                <h1>All Required CS Courses</h1>
                <div className = "grid">
                    <CardGroup />
                </div>
            </div>
        </div>

    );
}

export default withRouter(ClassCardGroup);

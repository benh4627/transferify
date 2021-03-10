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
    if (props.prereqs == "N/A" || props.prereqs == undefined) {
        return(
            <Card.Text style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem'}}>None!</Card.Text>
        );
    }
    {/*else {
        var split_reqs = props.prereqs.split(',');
        for (var i = 0; i < split_reqs.length; i++) {
            listItems.push(<ListGroup.Item>{split_reqs[i]}</ListGroup.Item>);
        }
    }*/}
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
                <Button className='addPlanner' onClick='addToPlanner()'>Add to Planner</Button>
                <Button className='addPrereq' onClick='addToPrereqs()'>Add to Completed Prereqs</Button>
                <div id="addedToPlanner" style="display:none;" >Added to Planner</div>
                <div id="addedToPrereqs" style="display:none;" >Added to Prereqs</div>
            </div>
        </div>
    );
}

function addToPlanner() {
    document.getElementById("addedToPlanner").style.display = "";
}

function addToPrereqs() {
    document.getElementById("addedToPrereqs").style.display = "";
}

var classPlanner;

function getClassPlanner(data) {
  var classPlannerData = data.val();
  var key = Object.keys(classPlannerData);
  classPlanner = classPlannerData[key];
}

function CurrClasses(props) {
    const {currentUser} = useContext(AuthContext);
    var database = firebase.database();
    var listItems = [];
    var currClassList = [];

    const classPlannerRef = database.ref("classplanner/" + currentUser.uid);
    classPlannerRef.on("value", getClassPlanner);
    console.log(classPlanner);

    if (classPlanner == "N/A") {
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
            listItems.push(<ClassCard ClassData = {currClassList[i]}/>);

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
            <Logo />
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

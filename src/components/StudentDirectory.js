import React, { Component, useState, useEffect } from 'react';
import './StudentDirectory.css';
import { withRouter } from "react-router";
import Logo from './Logo.js';

import studentPic from '../images/Paul_Eggert.jpg';
import { render } from '@testing-library/react';
import Menu from './navbar.js';

import firebase from 'firebase';
var database = firebase.database();

const studentList = [];
const yearList = [];
const nameList = [];
const majorList = [];

var count;
var nameVals = {};
var yearVals = {}; 
var majorVals = {};

class student {
    constructor(name, email, major, year, image) {
        this.name = name;
        this.email = email;
        this.major = major;
        this.year = year;
        this.image = image;
    }
};

function StudentCard(props) {
    function getMajor() {
        var studentMajor = Object.keys(props.student.major).map((key) => props.student.major[key]);
        return studentMajor;
    }
    
    function getYear() {
        var studentYear = Object.keys(props.student.year).map((key) => props.student.year[key]);
        return studentYear;
    }
    return (
        <button type='button' class='studentCard'>
            <div class='studentName'>
                <b>{props.student.name}</b>
            </div> <br/>
            <img class='studentPicture' src={props.student.image} />
            <div class='studentInfo'>
                <p>Major: {getMajor()}</p>
                <p>Year: {getYear()}</p> 
                <p>Email: <a href="">{student.email}</a></p>
            </div>
        </button>
    );
}

function StudentDirectory(props) {
    let ret = [];
    for (let i = 0; i < count; i++) {
        ret.push(
            <StudentCard student={studentList[i]}/>
        );
    }
    return ret;
}

function SearchStudentList() {
    let ret = [];
    var search = document.getElementById("search");
    for (let i = 0 ; i < studentList.length ; i++) {
        if (search==studentList[i].lastName || search==studentList[i].firstName)
        ret.push(
            <StudentCard student={studentList[i]}/>
        );
    }
    console.log(ret);
    return ret;
}

function StudentDirectoryPage() {
    const [nameKeys, setNameKeys] = useState([]);
    const [yearKeys, setYearKeys] = useState([]);
    const [majorKeys, setMajorKeys] = useState([]);
    
    useEffect(() => { 
        const countRef = database.ref("userCount/");
        countRef.on("value", (snapshot) => {
            count = snapshot.val();
        });
        
        const namesRef = database.ref("names/");
        namesRef.on("value", (data) => {
            nameVals = data.val();
            setNameKeys(Object.keys(nameVals));
        });
        
        const yearsRef = database.ref("years/");
        yearsRef.on("value", (data) => {
            yearVals = data.val();
            setYearKeys(Object.keys(yearVals));
        });
        
        const majorsRef = database.ref("majors/");
        majorsRef.on("value", (data) => {
            majorVals = data.val();
            setMajorKeys(Object.keys(majorVals));  
        });
        
    }, []);
    
    
    useEffect(() => { 
        for(var i = 0; i < nameKeys.length; i++) {
            nameList.push(nameVals[nameKeys[i]]);
        }
    }, [nameKeys]);

    useEffect(() => { 
        for(var i = 0; i < count; i++) {
            yearList.push(yearVals[yearKeys[i]]);
        }
    }, [yearKeys]);
    
    useEffect(() => { 
        for(var i = 0; i < majorKeys.length; i++) {
            majorList.push(majorVals[majorKeys[i]]);
        }
    }, [majorKeys]);
    
    useEffect(() => {
        for (let i = 0; i < count; i++) {
            let person = new student('First Last', 'emailaddress@gmail.com', majorList[i], yearList[i], studentPic);
            studentList.push(person);
        }
    }, [nameList, yearList, majorList]);


    console.log("StudentDirectoryPage");
    return (
        <div>
            <Logo />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form id='search' class='top'>
                <input class='searchBar' type="text" placeholder="Search"></input>
                <button type="submit" onClick='SearchStudentList'><i class="fa fa-search"></i></button>
            </form>
            <div id='studentDirectory' class='studentDirectory'>
                {studentList && <StudentDirectory />}
            </div>
        </div>
    );
}
export default withRouter(StudentDirectoryPage);

import React, { Component, useState, useEffect } from 'react';
import { withRouter } from "react-router";
import { render } from '@testing-library/react';
import { storage } from "../base.js"
import firebase from 'firebase';

import Logo from './Logo.js';
import blankPic from '../images/blank_profile.png'
import './StudentDirectory.css';

var database = firebase.database();
const storageRef = storage.ref();

var studentList = [];
var yearList = [];
var nameList = [];
var majorList = [];
var emailList = [];
var imageList = [];

var count;
var nameVals = {};
var yearVals = {}; 
var majorVals = {};
var emailVals = {};

var keyword = "";

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
        try {
            var studentMajor = Object.keys(props.student.major).map((key) => props.student.major[key]);
            return studentMajor;
        } catch(e) {
            return "Major unspecified";
        }
    }
    
    function getYear() {
        try {
            var studentYear = Object.keys(props.student.year).map((key) => props.student.year[key]);
            return studentYear;
        } catch (e) {
            return "Year unspecified";
        }
    }
    
    function getName() {
        try {
            var studentName = Object.keys(props.student.name).map((key) => props.student.name[key]);
            return studentName;
        } catch (e) {
            return "Name unspecified";
        }
    }
    
    function getImage() {
        var studentImage = props.student.image;
        if (studentImage != undefined)
            return studentImage;
        else
            return blankPic;
    }
    
    function getEmail() {
        var studentEmail = Object.keys(props.student.email).map((key) => props.student.email[key]);
        return studentEmail;
    }
    
    if (props.student) {
        return (
            <button id={props.id} type='button' class='studentCard'>
                <div class='studentName'>
                    <b>{getName()}</b>
                </div> <br/>
                <img class='studentPicture' src={getImage()} />
                <div class='studentInfo'>
                    <p>Major: {getMajor()}</p>
                    <p>Year: {getYear()}</p> 
                    <p>Email: <a href="">{getEmail()}</a></p>
                </div>
            </button>
        );
    }
    else {
        return (
            <div>
            <p>Loading</p>
            </div>
        );
    }
}

function StudentDirectory(props) {
    let ret = [];
    for (let i = 0; i < count; i++) {  
        let person = new student(nameList[i], emailList[i], majorList[i], yearList[i], imageList[i]);     
        studentList.push(person);
        var thisID = "student"+i
        ret.push(
            <StudentCard id={thisID} student={studentList[i]}/>
        );
    }
    return ret;
}


function SearchStudentList() {
    var search = document.getElementById("search").value;
    console.log("searching ", search);
    for (let i = 0; i < count; i++) {
        var thisName = nameList[i].name;
        if (thisName.toUpperCase().indexOf(search.toUpperCase()) > -1){
            console.log("match")
            document.getElementById("student"+i).style.display = "";
        }
        else {
            document.getElementById("student"+i).style.display = "none";
        }
    }
    
    /*
    let ret = [];
    var search = document.getElementById("search").value;
    for (let i = 0 ; i < studentList.length ; i++) {
        if (search==studentList[i].name)
        ret.push(
            <StudentCard student={studentList[i]}/>
        );
    }
    console.log(ret);
    return ret;
    */
}

function StudentDirectoryPage() {
    const [ready, setReady] = useState(false);

    useEffect(() => { 
        getData();
    }, []);
    
    useEffect(() => { 
        console.log("nameList", nameList);
        console.log("yearList", yearList);
        console.log("majorList", majorList);
        console.log("emailList", emailList);
        console.log("imageList", imageList);
        
        for(let i = 0; i < count; i++) {
            if ((nameList[i] == undefined) || (emailList[i] == undefined) || 
                (majorList[i] == undefined) || (yearList[i] == undefined) ||
                (imageList[i] == undefined)) {
                console.log("something is undefined")
                return;
            }
            else {
                let person = new student(nameList[i], emailList[i], majorList[i], yearList[i], imageList[i]);
                studentList.push(person);
            }
            console.log("done with for loop")
            setReady(true);
        }
        
        console.log("studentList", studentList);
    }, [nameList, yearList, majorList, yearList, emailList, imageList]);

    function getData() {
        const countRef = database.ref("userCount/");
        countRef.on("value", (snapshot) => {
            count = snapshot.val();
        });
        
        const namesRef = database.ref("names/");
        namesRef.on("value", (data) => {
            nameVals = data.val();
            var names = Object.keys(nameVals);
            for (var i = 0; i < names.length; i++)
                nameList.push(nameVals[names[i]]);  
        });
        
        const yearsRef = database.ref("years/");
        yearsRef.on("value", (data) => {
            yearVals = data.val();
            var years = Object.keys(yearVals);
            for (var i = 0; i < years.length; i++)
                yearList.push(yearVals[years[i]]);    
        });
        
        const majorsRef = database.ref("majors/");
        majorsRef.on("value", (data) => {
            majorVals = data.val();
            var majors = Object.keys(majorVals);
            for (var i = 0; i < majors.length; i++)
                majorList.push(majorVals[majors[i]]);    
        });
        
        const emailsRef = database.ref("emails/");
        emailsRef.on("value", (data) => {
            emailVals = data.val();
            var emails = Object.keys(emailVals);
            for (var i = 0; i < emails.length; i++) 
                emailList.push(emailVals[emails[i]]);  
        });
        
        const imagesRef = storageRef.child("images/");        
        imagesRef.listAll().then((res) => {
            res.items.forEach((itemRef) => {
                itemRef.getDownloadURL().then(url => imageList.push(url));
            });   
        });    
    }

    console.log("StudentDirectoryPage");
    return (
        <div>
            {/*<Logo />*/}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form class='top'>
                <input id="search" type="text" placeholder="Search"></input>
                <button type="button" onClick={SearchStudentList}><i class="fa fa-search"></i></button>
            </form>
            <div id='studentDirectory' class='studentDirectory'>
                {ready ? <StudentDirectory /> : <p>Gathering data, return later</p>}
            </div>
        </div>
    );
}
export default withRouter(StudentDirectoryPage);
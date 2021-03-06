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

const studentList = [];
var uidList = [];
var urlList = [];

var count;
var keyword = "";
var nameVals = {};
var yearVals = {}; 
var majorVals = {};
var emailVals = {};
var uidVals = {};

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
                    <b id={props.id+"name"}>{getName()}</b>
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
    console.log("uidList: ", uidList)
    for (let i = 0; i < uidList.length; i++) {  
        var thisID = "student"+uidList[i];
        console.log("show ", thisID)
        ret.push(
            <StudentCard id={thisID} student={studentList[i]}/>
        );
    }
    return ret;
}

function SearchStudentList() {
    var search = document.getElementById("search").value;
    console.log("searching ", search);
    for (let i = 0; i < uidList.length; i++) {
        var thisID = "student"+uidList[i];
        var thisName = document.getElementById(thisID+"name").textContent;
        if (thisName.toUpperCase().indexOf(search.toUpperCase()) > -1){
            console.log("match", thisName, i)
            document.getElementById("student"+uidList[i]).style.display = "inline";
        }
        else {
            document.getElementById("student"+uidList[i]).style.display = "none";
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
    return ret;
    */
}

function StudentDirectoryPage() {    
    useEffect(() => { 
        getData();
    }, []);
    
    useEffect(() => { 
        uidList = Array.from(new Set(uidList));
        for (var i = 0; i < uidList.length; i++) {
            const name = nameVals[uidList[i]];
            const email = emailVals[uidList[i]];
            const major = majorVals[uidList[i]];
            const year = yearVals[uidList[i]];
            const imgRef = storage.ref("images/" + uidList[i]);
            imgRef.getMetadata().then(metadata => {
                if (metadata.contentType == "application/octet-stream") {
                    console.log(metadata.contentType);
                    studentList.push((new student(name, email, major, year, blankPic)));
                }
                else
                    var imgUrl = imgRef.getDownloadURL().then(url => studentList.push((new student(name, email, major, year, url))));
            });
            //const imgUrl = imgRef.getDownloadURL().then(url => studentList.push((new student(name, email, major, year, url))));
        }
    }, [uidList, urlList]);

    function getData() {
        const uidsRef = database.ref("uids/");
        uidsRef.on("value", (data) => {
            uidVals = data.val();
            var uids = Object.keys(uidVals);
            for (var i = 0; i < uids.length; i++)
                Object.values(uidVals[uids[i]]).map(result => uidList.push(result));
        });
        
        const countRef = database.ref("userCount/");
        countRef.on("value", (snapshot) => {
            count = snapshot.val();
        });
        
        const namesRef = database.ref("names/");
        namesRef.on("value", (data) => {
            nameVals = data.val();
            var names = Object.keys(nameVals);
        });
        
        const yearsRef = database.ref("years/");
        yearsRef.on("value", (data) => {
            yearVals = data.val();    
        });
        
        const majorsRef = database.ref("majors/");
        majorsRef.on("value", (data) => {
            majorVals = data.val();   
        });
        
        const emailsRef = database.ref("emails/");
        emailsRef.on("value", (data) => {
            emailVals = data.val(); 
        });  
    }

    return (
        <div>
            {/*<Logo />*/}
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <div class='top'>
                <input id="search" type="text" placeholder="Search"></input>
                <button type="button" onClick={SearchStudentList}><i class="fa fa-search"></i></button>
            </div>
            <div id='studentDirectory' class='studentDirectory'>
                {(studentList.length > 0) ? <StudentDirectory /> : <p>Gathering data, return later</p>}
            </div>
        </div>
    );
}
export default withRouter(StudentDirectoryPage);
import React from 'react';
import './StudentDirectory.css';
import { withRouter } from "react-router";
import Logo from './Logo.js';

import studentPic from '../images/Paul_Eggert.jpg';
import { render } from '@testing-library/react';
import Menu from './navbar.js';

const studentList = [];
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

for (let i = 0 ; i < 40 ; i++) {
    let person = new student('First', 'Last', 'Computer Science', 2020+i, 'emailaddress@gmail.com');
    studentList.push(person);
}
console.log(studentList);

//---------------------------------------

function StudentCard(props) {
    return (
        <button type='button' class='studentCard'>
            <div class='studentName'>
                <b>{props.student.firstName} {props.student.lastName}</b>
            </div> <br/>
            <img class='studentPicture' src={props.student.image} />
            <div class='studentInfo'>
                <p>Major: {props.student.major}</p>
                <p>Year: {props.student.year}</p> 
                <p>Email: <a href="">{props.student.email}</a></p>
            </div>
        </button>
    );
}

function StudentDirectory(props) {
    let ret = [];
    for (let i = 0 ; i < studentList.length ; i++) {
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
    return (
        <div>
            <Logo />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <form id='search' class='top'>
                <input class='searchBar' type="text" placeholder="Search"></input>
                <button type="submit" onClick='SearchStudentList'><i class="fa fa-search"></i></button>
            </form>
            <div id='studentDirectory' class='studentDirectory'>
                <StudentDirectory />
            </div>
        </div>
    )
}

export default withRouter(StudentDirectoryPage);

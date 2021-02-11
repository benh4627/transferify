import React from 'react';
import './StudentDirectory.css';

const studentList = [];
class student {
    constructor(name, major, year, email) {
        this.name = name;
        this.major = major;
        this.year = year;
        this.email = email;
    }
};
var person = new student('A', 'CS', 2020, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
person = new student('B', 'CS', 2021, '@@');
studentList.push(person);
person = new student('C', 'CS', 2022, '@@');
studentList.push(person);
person = new student('D', 'CS', 2023, '@@');
studentList.push(person);
person = new student('E', 'CS', 2023, '@@');
studentList.push(person);
person = new student('F', 'CS', 2023, '@@');
studentList.push(person);
person = new student('G', 'CS', 2023, '@@');
studentList.push(person);
console.log(studentList);

//---------------------------------------

function Student(props) {
    return (
        <div class='studentRow'>
            <strong>{props.student.name}</strong>
            <p>{props.student.major}</p>
            <p>{props.student.year}</p>
            <button>{props.student.email}</button>
            <p><a href="">Visit</a></p>
        </div>
    );
}

function StudentRow(props) {
    let ret = [];
    let t = true;
    for (let i=0; i<studentList.length; i++){
        t = (i%5==0? !t: t);
        let setStyle = (t? 'studentEvenRow': 'studentOddRow' )
        ret.push(
            <div class={setStyle}>
                <Student student={studentList[i]}/>
            </div>);
    }
    return ret;
}

function StudentDirectory() {
    return (
        <div>
            <center>
                <input type="text" id="myInput" onkeyup="myFunction()" placeholder="Search for names.." title="Type in a name"></input>
                <br /><br />
            </center>
            <ul id='header' class='headerStyle'>
                <div>Name</div>
                <div>Major</div>
                <div>Year</div>
                <div>Email</div>
                <div>Site</div>
            </ul>
            <ul id='stdList'>
                <StudentRow />
            </ul>
        </div>
    )
}

export default StudentDirectory;

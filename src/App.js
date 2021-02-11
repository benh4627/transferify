import React from 'react';

import Menu from './components/navbar2.js';
import Home from './components/Home.js';
import ClassCard from './classcard.js';
import './App.css'

function App() {
    return(
        <div>
            <ClassCard
                className="Class 1"
                classType = "Lower Division Course"
                classDescription = "Course Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
                prereqs = {["prereq 1", "prereq 2"]}
            />
            <ClassCard
                className="Class 2"
                classType = "Upper Division Course"
                classDescription = "Course Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante."
                prereqs = {[]}
            />
        </div>
    );
}

export default App;

{/*<div className="App">
    <div className="HomeModule"><Home /></div>
</div>*/}

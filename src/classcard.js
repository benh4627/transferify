import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import * as data from './CourseInformation.json';
import "./classcard.css";

const data = require('./CourseInformation.json');

class ClassData {
     constructor(className, classType, classDescription, prereqs) {
         this.className = className;
         this.classType = classType;
         this.classDescription = classDescription;
         this.prereqs = prereqs;
     }
 };
const classList = [];

for (var i = 0; i < data.length; i++) {
     let newClass = new ClassData(data.className, data.classType, data.classDescription, data.prereqs);
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
        var split_reqs = props.prereqs.split(',')
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

function ClassCard(props) {

    return(
        <Card style={{ width: '18rem', margin: '1.1rem'}} className="box">
            <Card.Header>{props.class.className}</Card.Header>
            <Card.Body>
                <div className="description">
                    <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.class.classType}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem'}}>{props.class.classDescription}</Card.Text>
                </div>
                <Card.Subtitle>Prerequisites:</Card.Subtitle>
                <PrereqList prereqs = {props.class.prereqs}/>
                <Button variant="primary">Add to Planner</Button>
            </Card.Body>
        </Card>
    );
}

function ClassCardGroup(props) {
    var listItems = [];

    for (var i = 0; i < classList.length; i++) {
        listItems.push(<ClassCard class = {classList[i]}/>);

    }

    return(

            <div className = "grid">
                <listItems/>
            </div>

    );
}



export default ClassCardGroup;

{/*
    const renderCard = (card, index) => {
        return (
            <Card style={{ width: '18rem'}} key={index} className="box">
                <Card.Header>{card.className}</Card.Header>
                <Card.Body>
                    <div className="description">
                        <Card.Subtitle style={{marginBottom: '1.1rem'}}>{card.classType}</Card.Subtitle>
                        <Card.Text style={{ fontSize: '1.1rem'}}>{card.classDescription}</Card.Text>
                    </div>
                    <Card.Subtitle>Prerequisites:</Card.Subtitle>
                    <PrereqList prereqs = {card.prereqs}/>
                    <Button variant="primary">Add to Planner</Button>
                </Card.Body>
            </Card>
        );
    };


    return(

            <div className = "grid">
                {props.listItems.map(renderCard)}
            </div>

    );
    */}

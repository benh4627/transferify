import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import "./classcard.css";

function PrereqList(props) {
    var listItems = [];
    if (props.prereqs.length == 0) {
        return(
            <Card.Text style={{ paddingTop: '1.1rem', paddingBottom: '1.1rem'}}>None!</Card.Text>
        );
    }
    else {
        for (var i = 0; i < props.prereqs.length; i++) {
            listItems.push(<ListGroup.Item>{props.prereqs[i]}</ListGroup.Item>);
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
            <Card.Header>{props.className}</Card.Header>
            <Card.Body>
                <div className="description">
                    <Card.Subtitle style={{marginBottom: '1.1rem'}}>{props.classType}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem'}}>{props.classDescription}</Card.Text>
                </div>
                <Card.Subtitle>Prerequisites:</Card.Subtitle>
                <PrereqList prereqs = {props.prereqs}/>
                <Button variant="primary">Add to Planner</Button>
            </Card.Body>
        </Card>
    );
}

function ClassCardGroup(props) {
    var listItems = [];

    for (var i = 0; i < props.classList.length; i++) {
        listItems.push(<ClassCard className = {props.classList[i].className}
                                  classType = {props.classList[i].classType}
                                  classDescription = {props.classList[i].classDescription}
                                  prereqs = {props.classList[i].prereqs}/>);

    }
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
                {props.classList.map(renderCard)}
            </div>

    );
}



export default ClassCardGroup;

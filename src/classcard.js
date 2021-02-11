import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
import "./classcard.css";

function ClassCard() {
    return(
        <Card style={{ width: '40rem' , font-size: 50rem,}}>
            <Card.Header>Class Name</Card.Header>
            <Card.Body>
                <div className="description">
                    <Card.Subtitle>Graduation Requirement Type</Card.Subtitle>
                    <Card.Text>Course Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</Card.Text>
                </div>
                <Card.Subtitle>Prerequisites:</Card.Subtitle>
                <ListGroup variant="flush">
                    <ListGroup.Item>Prereq 1</ListGroup.Item>
                    <ListGroup.Item>Prereq 2</ListGroup.Item>
                </ListGroup>
                <Button variant="primary">Add to Planner</Button>
            </Card.Body>
        </Card>
    );
}

export default ClassCard;

import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import {Card} from 'react-bootstrap';
import {ListGroup} from 'react-bootstrap';
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
        <Card style={{ width: '40rem'}}>
            <Card.Header>{props.className}</Card.Header>
            <Card.Body>
                <div className="description">
                    <Card.Subtitle>{props.classType}</Card.Subtitle>
                    <Card.Text style={{ fontSize: '1.1rem'}}>{props.classDescription}</Card.Text>
                </div>
                <Card.Subtitle>Prerequisites:</Card.Subtitle>
                <PrereqList prereqs = {props.prereqs}/>
                <Button variant="primary">Add to Planner</Button>
            </Card.Body>
        </Card>
    );
}

export default ClassCard;

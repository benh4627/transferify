import React, { Component } from 'react';
import { withRouter } from "react-router";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './navbar.css';

class Menu extends Component {
    container = React.createRef();
    state = {
        showMenu: false,
    };

    handleClickButton = () => {
        if (this.state.numClicks === 0) {
            this.setState( state => {
                return {
                    open: !state.open,
                }
            });
        }
        else {
            this.setState({
                showMenu: false,
                numClicks: 0,
            });
        }
    }
    handleClickOutside = event => {
        if (this.container.current &&  !this.container.current.contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    render() {
        return (
                    <div class = "dropdown">
                        <ul>
                            <li><Link to="/"> Home </Link></li>
                            <li><Link to="/studentdirectory">   Student Directory</Link> </li>
                            <li><Link to="/profile">Your Profile</Link></li>
                            <li> <Link to="/classplanner"> Class Planner</Link></li>
                        </ul>
                    </div>
                
        );
    }
}

export default withRouter(Menu);


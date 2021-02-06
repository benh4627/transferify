import React, { Component } from 'react';
import './navbar.css';

class Card extends Component {
    render() {
        return (
            <div>
                <button>Show Pages </button>
                <div className = "menu">
                    <button>item 1</button>
                    <button>item 2</button>
                    <button>item 3</button>
                </div>
            </div>
        );
    }
}

export default Card;

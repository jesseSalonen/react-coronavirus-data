import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router-dom';

class Nav extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fontColor: "white"
        };
    }
    
    render () {
        return (
            <nav>
                <h3>KoronaData</h3>
                <ul className="nav-links">
                    <Link style={{'color': this.state.fontColor}} to='/'>
                    <li>Etusivu</li>
                    </Link>
                    <Link style={{'color': this.state.fontColor}} to='/data'>
                    <li>Päädata</li>
                    </Link>
                    <Link style={{'color': this.state.fontColor}} to='/interesting'>
                    <li>Mielenkiintoinen data</li>
                    </Link>
                </ul>
            </nav>
          );
    }

}


export default Nav;
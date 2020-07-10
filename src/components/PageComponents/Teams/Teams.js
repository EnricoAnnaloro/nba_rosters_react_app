import React, { Component } from 'react';

import Team from './Team/Team'

import './Teams.css'

class Teams extends Component {

    render() {
        return (
            <div className="TeamsPage">
                <h1>This is the Teams Page</h1>
                <div className="Teams">
                    <Team />
                    <Team />
                </div>                
                <div className="Teams">
                    <Team />
                    <Team />
                </div>                
                <div className="Teams">
                    <Team />
                    <Team />
                </div>                
            </div>
        );
    }
}

export default Teams;

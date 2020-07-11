import React, { Component } from 'react';

import Team from './Team/Team'

import './Teams.css'

class Teams extends Component {

    render() {
        return (
            <div className="TeamsPage">
                <h1>This is the Teams Page</h1>
                <div className="Teams">
                    <div className="col">
                        <Team className="child"/>
                        <Team className="child"/>
                        <Team className="child"/>
                    </div>
                    <div className="col">
                        <Team className="child"/>
                        <Team className="child"/>
                        <Team className="child"/>
                    </div>
                </div>                
            </div>
        );
    }
}

export default Teams;

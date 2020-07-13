import React, { Component } from 'react';
import queryString from 'query-string';
import Axios from 'axios'
import Player from '../../Player/Player'

import './Roster.css'

class Roster extends Component {

    state = {
        roster: []
    }

    componentDidMount() {

        const apiURL = "https://api.sportsdata.io/v3/nba/stats/json/Players/" + this.props.match.params.teamName + "?key=f6416fdce5e1433cb10eaf9ce9488d60";

        console.log(apiURL);

        Axios.get(apiURL)
            .then( response => {
                console.log(response);

                this.setState({roster: response.data});
            })
            .catch( error => {
                console.log(error);
            })
    }

    setUpBackgroundStyle = () => {
        const teamColors = queryString.parse(this.props.location.search);
        const backGroundColors = "linear-gradient(90deg, #" + teamColors['col1'] + " 0%, #" + teamColors['col2'] + " 33%, #" + teamColors['col1'] + " 66%, #" + teamColors['col2'] + " 100%";
        return {background: backGroundColors}
    }
    
    render() {

        console.log(this.state.roster);
                
        const backgroundStyle = this.setUpBackgroundStyle();

        const col1_players = this.state.roster.map( player => {
            if(this.state.roster.findIndex(toFind => toFind['PlayerID'] === player['PlayerID']) < (this.state.roster.length/2) ){
                return <Player info={player} key={player['PlayerID']}/>
            } else {
                return null;
            }
        })

        const col2_players = this.state.roster.map( player => {
            if(this.state.roster.findIndex(toFind => toFind['PlayerID'] === player['PlayerID']) >= (this.state.roster.length/2) ){
                return <Player info={player} key={player['PlayerID']}/>
            } else {
                return null;
            }
        })

        return (
            <div className="RosterPage" style={backgroundStyle}>
                <div className="Roster">
                    <div className="col">
                        {col1_players}                
                    </div>
                    <div className="col">
                        {col2_players}                
                    </div>
                </div>            
            </div>
        );
    }
}

export default Roster;


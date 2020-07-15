import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom'
import Team from './Team/Team'
import './Teams.css'

const API_KEY = `${process.env.REACT_APP_NBA_API_KEY}`

class Teams extends Component {

    state = {
        teams: [],
        stats: []
    }

    componentDidMount() {

        const teamURL = 'https://api.sportsdata.io/v3/nba/scores/json/teams?key=' + API_KEY;
        const statsURL = 'https://api.sportsdata.io/v3/nba/scores/json/Standings/2020?key=' + API_KEY;

        const teamsReq = Axios.get(teamURL);
        const statsReq = Axios.get(statsURL);

        Axios.all([teamsReq, statsReq])
            .then( Axios.spread((...responses) => {
                const teamsResponse = responses[0];
                const statsResponse = responses[1];

                statsResponse.data.sort((a, b) => {return a['Percentage'] - b['Percentage']});
                statsResponse.data.reverse();

                this.setState({teams: teamsResponse.data, stats: statsResponse.data})
            }))
            .catch ( errors => {
                console.log(errors);
            })        
    }

    render() {

        let Eseed = 1;

        const easternTeams = this.state.stats.map( teamStats => {

            if(teamStats['Conference'] === "Eastern"){
                const team = this.state.teams.find( toFind => toFind['TeamID'] === teamStats['TeamID'] );
                const teamSeed = Eseed;
                Eseed = Eseed + 1;
                const link = team['Key'];

                return( <Link to={link} style={{ textDecoration: 'none' }} key={team['TeamID']}><Team className="child" team={team} stats={teamStats} seed={teamSeed} /></Link>)
            }

            return null;
        });

        let Wseed = 1;

        const westernTeams = this.state.stats.map( teamStats => {

            if(teamStats['Conference'] === "Western"){
                const team = this.state.teams.find( toFind => toFind['TeamID'] === teamStats['TeamID'] );
                const teamSeed = Wseed;
                Wseed = Wseed + 1;
                const link = team['Key'];

                return( <Link to={link} style={{ textDecoration: 'none' }} key={team['TeamID']}><Team className="child" team={team} stats={teamStats} seed={teamSeed} /></Link>)
            }

            return null;
        });

        return (
            <div className="TeamsPage">
                <div className="Teams">
                    <div className="col">
                        <h2>Western Conference</h2>
                        <div className="divisor"></div>
                        {westernTeams}
                    </div>
                    <div className="col">
                        <h2>Eastern Conference</h2>
                        <div className="divisor"></div>
                        {easternTeams}
                    </div>
                </div>                
            </div>
        );
    }
}

export default Teams;

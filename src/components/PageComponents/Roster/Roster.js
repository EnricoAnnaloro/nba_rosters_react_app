import React, { Component } from 'react';
import Axios from 'axios'
import Player from '../../Player/Player'
import './Roster.css'

const API_KEY = `${process.env.REACT_APP_NBA_API_KEY}`

class Roster extends Component {

    state = {
        roster: [],
        stats: [],
        team: []
    }

    componentDidMount() {

        const rosterURL = "https://api.sportsdata.io/v3/nba/stats/json/Players/" + this.props.match.params.teamName + "?key=" + API_KEY;
        const statsURL = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByTeam/2020/" + this.props.match.params.teamName + "?key=" + API_KEY;
        const teamsURL = "https://api.sportsdata.io/v3/nba/scores/json/teams?key=" + API_KEY;

        const rosterReq = Axios.get(rosterURL);
        const statsReq = Axios.get(statsURL);
        const teamsReq = Axios.get(teamsURL);

        Axios.all([rosterReq, statsReq, teamsReq])
            .then( Axios.spread((...responses) => {
                const rosterRes = responses[0];
                const statsRes = responses[1];
                const teamsRes = responses[2];

                const team = teamsRes.data.find(team => team['Key'] === this.props.match.params['teamName']);

                this.setState({roster: rosterRes.data, stats: statsRes.data, team: team});
            }))
            .catch ( errors => {
                console.log(errors);
            })        
    }

    setUpBackgroundStyle = () => {
        const col1 = this.state.team['PrimaryColor']
        const col2 = this.state.team['SecondaryColor']
        const backGroundColors = "linear-gradient(90deg, #" + col1 + " 0%, #" + col2 + " 33%, #" + col1 + " 66%, #" + col2 + " 100%";
        return {background: backGroundColors}
    }
    
    render() {
                
        const backgroundStyle = this.setUpBackgroundStyle();

        const col1_players = this.state.roster.map( player => {
            const playerStats = this.state.stats.find( stats => stats['PlayerID'] === player['PlayerID'])
            if(this.state.roster.findIndex(toFind => toFind['PlayerID'] === player['PlayerID']) < (this.state.roster.length/2) ){
                return <Player info={player} logo={this.state.team['WikipediaLogoUrl']} stats={playerStats} isFromSearch={false} key={player['PlayerID']} url={this.props.match.url}/>
            } else {
                return null;
            }
        })

        const col2_players = this.state.roster.map( player => {
            const playerStats = this.state.stats.find( stats => stats['PlayerID'] === player['PlayerID'])
            if(this.state.roster.findIndex(toFind => toFind['PlayerID'] === player['PlayerID']) >= (this.state.roster.length/2) ){
                return <Player info={player} logo={this.state.team['WikipediaLogoUrl']} stats={playerStats} isFromSearch={false} key={player['PlayerID']} url={this.props.match.url}/>
            } else {
                return null;
            }
        })

        let teamNameStyle = null;
        if(this.state.team){
            teamNameStyle = {
                color: "#" + this.state.team['PrimaryColor'],
                filter: "invert(1)"
            }
        }

        return (
            <div className="RosterPage" style={backgroundStyle}>
                <div className="TeamName" style={teamNameStyle}>
                    <p>
                        {this.state.team['Name']}
                    </p>
                </div>
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


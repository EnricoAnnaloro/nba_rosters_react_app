import React, { Component } from 'react';
import Axios from 'axios'
import Player from '../../Player/Player'

import './SearchPage.css'

const API_KEY = `${process.env.REACT_APP_NBA_API_KEY}`

class SearchPage extends Component {

    state = {
        playersInfo: [],
        playersStats: [],
        search: ""
    }

    componentDidMount () {
        const playersInfoURL = "https://api.sportsdata.io/v3/nba/scores/json/Players?key=" + API_KEY;
        const playersStatsURL = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStats/2020?key=" + API_KEY;

        const playersInfoReq = Axios.get(playersInfoURL);
        const playersStatsReq = Axios.get(playersStatsURL);

        Axios.all([playersInfoReq, playersStatsReq])
            .then( Axios.spread((...responses) => {
                const playersInfoRes = responses[0];
                const playersStatsRes = responses[1];

                this.setState({playersInfo: playersInfoRes.data, playersStats: playersStatsRes.data});
            }))
            .catch( errors => {
                console.log(errors)
            });
    }

    handleChange = (e) => {

        this.setState({
            search: e.target.value
          });
    }

    render() {

        let playersSearchedLeft = [];
        let playersSearchedRight = [];
        let counter = 0;

        if(this.state.search !== ""){
            this.state.playersInfo.map( player => {
                const playerName = player['FanDuelName'].toLowerCase();
                const searchedName = this.state.search.toLowerCase();
                if( playerName.includes( searchedName )){
                    const playerStats = this.state.playersStats.find( stats => stats['PlayerID'] === player['PlayerID']);
                    if( counter % 2 === 0){
                        const foundPlayer = (<Player info={player} stats={playerStats} isFromSearch={true} key={player['PlayerID']} />)
                        playersSearchedLeft.push(foundPlayer);
                    } else {
                        const foundPlayer = (<Player info={player} stats={playerStats} isFromSearch={true} key={player['PlayerID']} />)
                        playersSearchedRight.push(foundPlayer);
                    }
                    counter = counter + 1;
                }
                return null;
            })
        }

        return (
            <div className="SearchPage">
                <input type="text" placeholder="Search.." value={this.state.search} onChange={this.handleChange}></input>
                <div className="Roster">
                    <div className="col">
                        {playersSearchedLeft}
                    </div>
                    <div className="col">
                        {playersSearchedRight}
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchPage;

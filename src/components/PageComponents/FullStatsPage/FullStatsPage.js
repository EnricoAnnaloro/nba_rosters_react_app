import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom';
import './FullStatsPage.css'

const API_KEY = `${process.env.REACT_APP_NBA_API_KEY}`

class FullStatsPage extends Component {

    state = {
        stats: [],
        info: [],
    }

    componentDidMount() {
        const statsURL = "https://api.sportsdata.io/v3/nba/stats/json/PlayerSeasonStatsByPlayer/2020/" + this.props.match.params['playerID'] + "?key=" + API_KEY;
        const infoURL = "https://api.sportsdata.io/v3/nba/scores/json/Player/" + this.props.match.params['playerID'] + "?key=" + API_KEY;

        const statsReq = Axios.get(statsURL);
        const infoReq = Axios.get(infoURL);

        Axios.all([statsReq, infoReq])
            .then( Axios.spread((...responses) => {
                const statsRes = responses[0];
                const infoRes = responses[1];

                this.setState({stats: statsRes.data, info: infoRes.data});
            }))
            .catch ( errors => {
                console.log(errors);
            })      
    }

    render() {

        let birthDate = null
        if(this.state.info['BirthDate']){
            birthDate = this.state.info['BirthDate'].slice(0, 10);
        }

        let ppg, apg, rpg, bpg, spg, games = 0;
        let team = "";
        if(this.state.stats){
            team = this.state.stats["Team"];
            games = this.state.stats['Games'];
            ppg = this.state.stats['Points'] !== 0 ? (this.state.stats['Points']/games).toFixed(2) : 0;
            apg = this.state.stats['Assists'] !== 0 ? (this.state.stats['Assists']/games).toFixed(2) : 0;
            rpg = this.state.stats['Rebounds'] !== 0 ? (this.state.stats['Rebounds']/games).toFixed(2) : 0;
            bpg = this.state.stats['BlockedShots'] !== 0 ? (this.state.stats['BlockedShots']/games).toFixed(2) : 0;
            spg = this.state.stats['Steals'] !== 0 ? (this.state.stats['Steals']/games).toFixed(2) : 0;
        }

        console.log(this.state.stats);

        return (
            <div className="FullStatsPage">
                <div className="PlayerPhoto">
                    <img src={this.state.info['PhotoUrl']} alt="xxx" />
                </div>
                <div className="StatsContainer">
                    <h1>{this.state.stats['Name']}</h1>
                    <div className="Stats">
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Team</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                {team ? <Link to={"/" + team} style={{ textDecoration: 'none' }}>{team}</Link> : "none"} 
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Jersey</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.info['Jersey']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Position</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.info['Position']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Height</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{(this.state.info['Height']*0.0254).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Weight</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{(this.state.info['Weight']*0.453592).toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Born</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{birthDate}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>PPG</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{ppg}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>APG</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{apg}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>RPG</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{rpg}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>SPG</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{spg}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>BPG</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{bpg}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Games Played</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{games ? games : "none"}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Years in NBA</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.info['Experience']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Two Pointers Made</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['TwoPointersMade']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Two Pointers Attempted</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['TwoPointersAttempted']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Two Pointers Percentage</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['TwoPointersPercentage']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Three Pointers Made</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['ThreePointersMade']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Three Pointers Attempted</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['ThreePointersAttempted']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Three Pointers Percentage</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['ThreePointersPercentage']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Free Throws Made</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['FreeThrowsMade']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Free Throws Attempted</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['FreeThrowsAttempted']}</p>
                            </div>
                        </div>
                        <div className="Stat">
                            <div className="LeftCol">
                                <p>Free Throws Percentage</p>
                            </div>
                            <div className="Vseparation"></div>
                            <div className="RightCol">
                                <p>{this.state.stats['FreeThrowsPercentage']}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FullStatsPage;

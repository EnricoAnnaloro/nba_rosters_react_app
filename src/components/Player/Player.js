import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import './Player.css'

class Player extends Component {

    state = {
        isRotated: false
    }

    rotateHandler = () => {
        this.setState( (prevState) => ({isRotated: !prevState.isRotated}) );
    }

    render() {

        let contentStyle = "CardContent";
        let cardStyle = "PlayerCard";

        if(this.state.isRotated){
            contentStyle = "CardContent Rotate";
            cardStyle = "PlayerCardShow"
        }

        let birthDate = null
        if(this.props.info['BirthDate']){
            birthDate = this.props.info['BirthDate'].slice(0, 10);
        }

        let ppg, apg, rpg, bpg, spg, games = null;
        let team = "";
        if(this.props.stats){
            team = this.props.stats["Team"];
            games = this.props.stats['Games'];
            ppg = (this.props.stats['Points']/games).toFixed(2);
            apg = (this.props.stats['Assists']/games).toFixed(2);
            rpg = (this.props.stats['Rebounds']/games).toFixed(2);
            bpg = (this.props.stats['BlockedShots']/games).toFixed(2);
            spg = (this.props.stats['Steals']/games).toFixed(2);
        }

        let bottonSection = (<Link to={this.props.url + "/" + this.props.info['PlayerID']}>
                                <button>
                                    <strong>Full Stats</strong>
                                </button>
                            </Link>);

        if(this.props.isFromSearch){
            bottonSection = (<Fragment>
                                <Link to={"/" + team} style={{ textDecoration: 'none' }}>
                                    <button style={{width: "120px"}}>
                                        <strong>{team ? "Full " + team + " Roster" : "Not available"}</strong>
                                    </button>
                                </Link>
                                <Link to={"/" + team + "/" + this.props.info['PlayerID']} style={{ textDecoration: 'none' }}>
                                    <button style={{width: "120px"}}>
                                        <strong>Full Stats</strong>
                                    </button>
                                </Link>
                            </Fragment>);
        }

        let birthCity = null;
        if(this.props.info['BirthCity']){
            birthCity = this.props.info['BirthCity'] + ", " + this.props.info['BirthState'];
        }

        return (
            <div className={cardStyle} onClick={this.rotateHandler}> 
                <div className={contentStyle}>
                    <div className="CardFront">
                        <img src={this.props.info['PhotoUrl']} alt="Avatar"></img>
                        <div>
                            <h2>{this.props.info['DraftKingsName']}</h2>
                        </div>
                    </div>
                    <div className="CardBack">
                        <div className="NamePos">
                            <div className="Name">
                                <p>NAME</p>
                                <p><strong>{this.props.info['DraftKingsName']}</strong></p>
                            </div>
                            <div className="vDivider"></div>
                            <div className="Pos">
                                <p>POSITION</p>
                                <p><strong>{this.props.info['Position']}</strong></p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="PhyInfo">
                            <div className="Name">
                                <p>HEIGHT</p>
                                <p><strong>{(this.props.info['Height']*0.0254).toFixed(2)}</strong> m</p>
                                <p>WEIGHT</p>
                                <p><strong>{(this.props.info['Weight']*0.453592).toFixed(2)}</strong> kg</p>
                            </div>
                            <div className="vDivider"></div>
                            <div className="Pos">
                                <p>BORN</p>
                                <p><strong>{birthDate}</strong></p>
                                <p>{birthCity}</p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <div className="StatsInfo">
                            <div>
                                <p>PPG</p>
                                <p><strong>{ppg}</strong></p>
                            </div>                           
                            <div>
                                <p>APG</p>
                                <p><strong>{apg}</strong></p>
                            </div>                           
                            <div>
                                <p>PPG</p>
                                <p><strong>{rpg}</strong></p>
                            </div>                           
                        </div>
                        <div className="StatsInfo">
                            <div>
                                <p>BPG</p>
                                <p><strong>{bpg}</strong></p>
                            </div>                           
                            <div>
                                <p>SPG</p>
                                <p><strong>{spg}</strong></p>
                            </div>                           
                            <div>
                                <p>Games Played</p>
                                <p><strong>{games}</strong></p>
                            </div>                           
                        </div>
                        <div className="divider"></div>
                        <div className="TeamInfo">
                            {bottonSection}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
import React, { Component } from 'react';
import './Player.css'

class Player extends Component {

    state = {
        isRotated: false
    }

    rotateHandler = () => {
        this.setState( (prevState) => ({isRotated: !prevState.isRotated}) );
    }

    render() {

        console.log(this.props.info);

        let contentStyle = "CardContent";
        let cardStyle = "PlayerCard";

        if(this.state.isRotated){
            contentStyle = "CardContent Rotate";
            cardStyle = "PlayerCardShow"
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
                                <p><strong>{this.props.info['DepthChartPosition']}</strong></p>
                            </div>
                        </div>
                        <div className="divider"></div>
                        <p>Architect Engineer</p>
                        <p>We love that guy</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
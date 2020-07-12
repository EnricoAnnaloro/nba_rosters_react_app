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

        let contentStyle = "CardContent";
        let cardStyle = "PlayerCard";

        if(this.state.isRotated){
            contentStyle = "CardContent Rotate";
            cardStyle = "PlayerCardShow"
        }

        console.log(this.props);

        return (
            <div className={cardStyle} onClick={this.rotateHandler}> 
                <div className={contentStyle}>
                    <div className="CardFront">
                        <img src={this.props.info['PhotoUrl']} alt="Avatar"></img>
                    </div>
                    <div className="CardBack">
                        <h1>John Doe</h1>
                        <p>Architect Engineer</p>
                        <p>We love that guy</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;
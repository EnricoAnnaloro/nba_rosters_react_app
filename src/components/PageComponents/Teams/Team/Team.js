import React, {Fragment} from 'react';

import './Team.css'

const Roster = ( props ) => {

    return (
        <Fragment>
            <div className="Team">
                <div className="TeamLogo">
                    <img src={props.team['WikipediaLogoUrl']} alt="xxx"></img>
                </div>
                <div className="TeamName">
                    <p>{props.team['Name']}</p>
                </div>
                <div className="TeamSeed">
                    <p>seed: {props.seed}</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Roster;

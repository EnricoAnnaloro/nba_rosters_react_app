import React, {Fragment} from 'react';

import LAimage from '../../../../assets/images/LA.png'
import './Team.css'

const Roster = ( props ) => {
    return (
        <Fragment>
            <div className="Team">
                <div className="TeamLogo">
                    <img src={LAimage}></img>
                </div>
                <div className="TeamName">
                    <p>TeamName</p>
                </div>
                <div className="TeamSeed">
                    <p>TeamSeed</p>
                </div>
            </div>
        </Fragment>
    );
}

export default Roster;

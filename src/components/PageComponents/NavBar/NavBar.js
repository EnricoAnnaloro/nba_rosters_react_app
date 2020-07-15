import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return (
        <nav className="NavBar">
            <div>
                <Link to="/" style={{ textDecoration: 'none' }}>
                <i className="fas fa-home"></i>
                </Link>
            </div>
            <div>
                <p className="Title"><span>N B A</span>ROSTERS</p>
            </div>
            <div>
                <Link to="/search" style={{ textDecoration: 'none' }}>
                    <i className="fas fa-search"></i>
                </Link>
            </div>
        </nav>
    );
}

export default NavBar;

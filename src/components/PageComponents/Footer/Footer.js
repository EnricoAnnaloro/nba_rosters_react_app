import React from 'react';
import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <ul>
              <li>
                <a href="https://enricoannaloro.com">Developer Website</a>
              </li>
              <li>
                <a href="https://github.com/EnricoAnnaloro"><i className="fab fa-github-square"></i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/enrico-annaloro/"><i className="fab fa-linkedin"></i></a>
              </li>
              <li>
                <a href="mailto:enrico.annaloro@gmail.com"><i className="fas fa-at"></i></a>
              </li>
            </ul>
          </div>
    );
}

export default Footer;

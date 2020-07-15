import React, { useState, useEffect } from 'react';
import './ScrollToTop.css'
import { useWindowScroll } from 'react-use';

const ScrollToTop = () => {

    const { y: pageYOffset } = useWindowScroll();
    const [visible, setVisibility] = useState(false);

    useEffect(() => {
        if (pageYOffset > 400) {
            setVisibility(true);
        } else {
            setVisibility(false)
        }
    }, [pageYOffset]);

    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"});
    }

    if(!visible){
        return false;
    }

    return (
        <div className="ScrollToTop">
            <i className="fas fa-arrow-up" onClick={scrollToTop}></i>
            <p>Back to Top</p>
        </div>
    );
}

export default ScrollToTop;

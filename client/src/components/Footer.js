import React from 'react';
import './Footer.css';
import ScrollTop from './ScrollTop';
import CreatorFooter from './CreatorFooter';

const Footer = () => {
    return (
        <div className='footer'>
            <ScrollTop />
            <CreatorFooter />
        </div>
    )
}

export default Footer;
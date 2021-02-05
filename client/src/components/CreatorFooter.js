import React from 'react';
import './CreatorFooter.css';
import { Icon } from '@iconify/react';
import instagramFill from '@iconify-icons/akar-icons/instagram-fill';
import linkedinFill from '@iconify-icons/akar-icons/linkedin-fill';
import twitterFill from '@iconify-icons/akar-icons/twitter-fill';
import facebookFill from '@iconify-icons/akar-icons/facebook-fill';
import githubFill from '@iconify-icons/akar-icons/github-fill';




function CreatorFooter() {
    return (
        <div className='creatorFooter'>
            <div className='creatorFooter__social'>
                <a className='creatorFooter__socialIcons' href='https://www.linkedin.com/in/christopheralee22/'><Icon icon={linkedinFill} /></a>
                <a className='creatorFooter__socialIcons' href='https://twitter.com/chrisl222'><Icon icon={twitterFill} /></a>
                <a className='creatorFooter__socialIcons' href='https://www.instagram.com/chrisalee222/'><Icon icon={instagramFill} /></a>
                <a className='creatorFooter__socialIcons' href='https://www.facebook.com/chrisalee222/'><Icon icon={facebookFill} /></a>
                <a className='creatorFooter__socialIcons' href='https://github.com/chrisalee'><Icon icon={githubFill} /></a>
            </div>
            <div className='creatorFooter__projects'>
                <a className='creatorFooter__projectsTags' href='https://utube-clone-222.web.app/'>YouTube Clone</a>
                <a className='creatorFooter__projectsTags' href='https://challenge-20d6d.web.app/'>Amazon Clone</a>
                <a className='creatorFooter__projectsTags' href='https://covid-tracker-45a19.web.app/'>Covid Tracker</a>
                <a className='creatorFooter__projectsTags' href='https://facebook-messenger-clone-b8330.web.app/'>Messenger Clone</a>
            </div>
            <small> created by Christopher Lee</small>
            
        </div>
    )
}

export default CreatorFooter

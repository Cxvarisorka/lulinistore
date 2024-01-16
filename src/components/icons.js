import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// Social media icons

const instagramIcon = <FontAwesomeIcon icon={faInstagram}/>;
const facebookIcon = <FontAwesomeIcon icon={faFacebook}/>;
const youtubeIcon = <FontAwesomeIcon icon={faYoutube}/>;
const githubIcon = <FontAwesomeIcon icon={faGithub}/>;

function SocialIcons(){
    const socialMediaIcons = [{icon:instagramIcon, link:'https://www.instagram.com/lulinitransport/'},{icon:facebookIcon, link:'https://www.facebook.com/Luka.Tskhvaradze'},{icon:youtubeIcon, link:'https://www.youtube.com/@LuliniTransport'},{icon:githubIcon, link:'https://github.com/Cxvarisorka'}]

    return (
        <ul className="social-links">
            {socialMediaIcons.map((elem,i) => {
                return <li key={i}><a href={elem.link} target='blank_'>{elem.icon}</a></li>
            })}
        </ul>
    )
}

export default SocialIcons;
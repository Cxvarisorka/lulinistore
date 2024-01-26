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
    const socialMediaIcons = [{icon:instagramIcon, link:'https://www.instagram.com/lulinitransport/', ariaLabel: 'Instagram link'},{icon:facebookIcon, link:'https://www.facebook.com/Luka.Tskhvaradze', ariaLabel: 'Facebook link'},{icon:youtubeIcon, link:'https://www.youtube.com/@LuliniTransport', ariaLabel: 'Youtube link'},{icon:githubIcon, link:'https://github.com/Cxvarisorka', ariaLabel: 'Github link'}]

    return (
        <ul className="social-links">
            {socialMediaIcons.map((elem,i) => {
                return <li key={i}><a href={elem.link} target='blank_' aria-label={elem.ariaLabel}>{elem.icon}</a></li>
            })}
        </ul>
    )
}

export default SocialIcons;
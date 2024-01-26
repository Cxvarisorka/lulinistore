import React, { useState,memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Contact.css';

import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";

const phoneIcon = <FontAwesomeIcon icon={faPhone}/>;
const mailIcon = <FontAwesomeIcon icon={faEnvelope}/>;
const locationIcon = <FontAwesomeIcon icon={faLocationDot}/>;
const timeIcon = <FontAwesomeIcon icon={faClock}/>;


function ContactForm(){
    return (
        <form id="contact-form" action="https://formsubmit.co/14b3cc54bd5808d388a19d560256e654" method="POST">
            {/* Configuration */}
            <input type="text" name="_honey" style={{display:'none'}} />
            <input type="hidden" name="_captcha" value="false" /> 
          

            <div>
                <h2>Do you want to get in touch?</h2>
                <p>Let us know how we can help you.</p>
            </div>

            <input type="text" placeholder="Name" name="name" id="name"/>
            <input type="email" placeholder="Email" name="email" id="email"/>
            <textarea placeholder="Message" id="message" name="message"></textarea>
            <button aria-label="Send message">Send</button>
        </form>
    )
}

function ContactInfoDivs({icon,title,text}){
    return (
        <div className="info-divs">
            <p className="icon">{icon}</p>
            <h2>{title}</h2>
            <p className="info-text-div">{text}</p>
        </div>
    )
}

function ContactInfo(){
    const infoObjs = [
        {icon:phoneIcon,title:'Phone Number',text:'Call us: +(995) 555-277-335'},
        {icon:mailIcon,title:'Email',text:'lulini2023@gmail.com'},
        {icon:locationIcon,title:'Location',text:'Georgia'},
        {icon:timeIcon,title:'Open Hours',text:'We are always open.'}
    ]
    return (
        <div className="contact-info">
            <h2>We’re here to help you!</h2>
            <p>Have a question, comment, or brilliant idea you'd like to share? Send us a little note below - we love to hear from you and will always reply!</p>
            <div className="info-divs-main">
                {infoObjs.map((el,i) => <ContactInfoDivs key={i} icon={el.icon} title={el.title} text={el.text}/>)}
            </div>
        </div>
    )
}

function Contact(){
    return (
        <div className="contact">
            <div className="main-contact">
                <ContactInfo />
                <ContactForm />
            </div>
        </div>
    );
}

export default memo(Contact);
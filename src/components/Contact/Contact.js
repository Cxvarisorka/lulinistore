import React, { useState } from "react";

function ContactForm(){
    return (
        <div>
            <p>Luka</p>
        </div>
    )
}

function ContactInfo(){
    return (
        <form action="https://formsubmit.co/14b3cc54bd5808d388a19d560256e654" method="POST">
            {/* Configuration */}
            <input type="text" name="_honey" style={{display:'none'}} />
            <input type="hidden" name="_captcha" value="false" /> 
          

            <div>
                <p>Do you want to get in touch?</p>
                <p>Let us know how we can help you.</p>
            </div>

            <input type="text" placeholder="Name" name="name" id="name"/>
            <input type="email" placeholder="Email" name="email" id="email"/>
            <textarea placeholder="Message" id="message" name="message"></textarea>
            <button>Send</button>
        </form>
    )
}

function Contact(){
    return (
        <div>
            <ContactInfo />
            <ContactForm />
        </div>
    );
}

export default Contact;
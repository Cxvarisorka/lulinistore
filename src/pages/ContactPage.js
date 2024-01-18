import React from "react";
import Contact from "../components/Contact/Contact.js";
import PageHero from "../components/PageHero/PageHero.js";
import Reveal from "../components/reveal.js";

function ContactPage(){
    return (
        <Reveal>
           <div>
                <PageHero title={'Contact'} from={{name:'Home',href:'/'}} to={{name:'Contact',href:'/contact'}}></PageHero>
                <Contact></Contact>
            </div> 
        </Reveal>
    )
}

export default ContactPage;
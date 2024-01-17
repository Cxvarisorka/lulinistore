import React from "react";
import Contact from "../components/Contact/Contact.js";
import PageHero from "../components/PageHero/PageHero.js";

import {motion} from 'framer-motion';

function ContactPage(){
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
        >
            <PageHero title={'Contact'} from={{name:'Home',href:'/'}} to={{name:'Contact',href:'/contact'}}></PageHero>
            <Contact></Contact>
        </motion.div>
        
    )
}

export default ContactPage;
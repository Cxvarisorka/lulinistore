import React from "react";
import PageHero from "../components/PageHero/PageHero.js";
import './AboutPage.css';

import about1 from '../imgs/Black and White Minimaiist Fashion Instagram Post.png';
import about2 from '../imgs/Black and Grey Minimalist New Fashion Style Instagram Post.png';

import {motion} from 'framer-motion';

function AboutPost({ heading, subHeading, text, img, imgPosition }) {
    const flexDirection = imgPosition === 'left' ? 'row' : 'row-reverse';
  
    return (
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}} 

            className="main-about"
        >
            <div style={{ display: 'flex', flexDirection }}>
                <div>
                    <h1 id="heading">{heading}</h1>
                    <h2 id="sub-heading">{subHeading}</h2>
                    <p id="about-info">{text}</p>
                </div>
                <img src={img} alt="Post" />
            </div>
        </motion.div>
      
    );
}

function AboutPage(){
    return (
        <div>
            <PageHero title='About' from={{name:'Home',href:'/'}} to={{name:'About',href:'/about'}}></PageHero>
            
            <AboutPost heading={'About Us'} text={"Our company is dedicated to creating unique and comfortable clothing for men and women. Since our establishment in 2010, Fashion's activity has extended from developing designer clothes to training new designers and stylists at our school, participation of our trainees at the world's leading fashion shows and writing articles about fashion."} subHeading={'We guarantee the highest quality of the products we sell.'} img={about1} imgPosition={'right'}></AboutPost>
            <AboutPost heading={'Our Story'} text={"Our store is more than just another average online retailer. We sell not only top quality products, but give our customers a positive online shopping experience."} subHeading={'Catering to your requirements, handling your needs with care.'} img={about2} imgPosition={'left'}></AboutPost>
        </div>
    )
}

export default AboutPage;
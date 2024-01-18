import React, {memo} from "react";

import './Hero.css';

import {motion} from 'framer-motion';

import heroImg from '../../imgs/hero.png';
import { Link } from "react-router-dom";
import Reveal from "../reveal.js";

function Hero(){
    return (
        <div className="main-hero" style={{backgroundImage: `url(${heroImg})`}}>
                <div className="hero">
                    <p>LuliniStore 2023/24</p>
                    <h2>NEW<br></br>COLLECTION</h2>
                    
                    <div className="hero-btns">
                        <Link to="/catalog" className="btn-a">Shop women</Link>
                        <Link to="/catalog" className="btn-a">Shop men</Link> 
                    </div>
                </div>
        </div>
    )
}

export default memo(Hero);
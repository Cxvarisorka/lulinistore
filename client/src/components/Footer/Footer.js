import React, { memo } from "react";
import SocialIcons from "../icons.js";

import './Footer.css';

function Footer(){
    return (
        <footer>
            <div className="main-top-footer">
                <div className="top-footer">
                    <div>
                        <p>Get our latest news and special sales</p>
                        <p>You may unsubscribe at any moment. For that purpose, please find our contact info in the legal notice.</p>
                    </div>
                    <form>
                        <input type="email" required name="email" placeholder="Email"/>
                        <button aria-label="Submit email">Submit</button>
                    </form>
                </div>
            </div>
            <div className="hr-block"></div>
            <div className="bottom-footer">
                <p><span>LULINISTORE</span> | © 2023 By Luka Tskhvaradze</p>
                <SocialIcons></SocialIcons>
            </div>
        </footer>
    )
}

export default memo(Footer);
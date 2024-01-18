import React, {memo} from "react";

import { Link } from "react-router-dom";

import './CollectionHero.css';

import collectionHero from '../../imgs/man.png';

function CollectionHero(){
    return (
        <div className="main-collection-hero" style={{backgroundImage: `url(${collectionHero})`}}>
            <div>
                <p>Be Trendy</p>
                <h2>NEW<br></br>COLLECTION</h2>
                <div>
                    <Link to="/catalog">Shop men</Link>
                    <Link to="/catalog">Shop women</Link>
                </div>
            </div>
        </div>
    )
}

export default memo(CollectionHero);
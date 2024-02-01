import React, {memo} from "react";
import './PageHero.css';
import { Link } from "react-router-dom";

function PageHero({title,from,to}){
    return (
        <div className="page-hero">
            <h2>{title}</h2>
            <p>{<Link to={from.href}>{from.name}</Link>} {'>'} {<Link to={to.href}>{to.name}</Link>}</p>
        </div>
    )
}

export default memo(PageHero);
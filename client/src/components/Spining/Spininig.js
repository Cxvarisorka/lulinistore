import React,{memo} from "react";

import './Spining.css';

function Spining(){
    return (
        <div className="loader"></div>
    )
}

export default memo(Spining);
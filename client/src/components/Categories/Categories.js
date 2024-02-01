import React,{memo} from "react";
import { Link } from "react-router-dom";
import './Cageories.css';

import jewImg from '../../imgs/jewelry.png'
import menImg from '../../imgs/menfashion.png'
import womenImg from '../../imgs/womans.png'
import useProducts from "../../Hooks/useProducts";


function CateDiv({category, imgSrc}){

    const date = new Date();

    return (
        <div className="img-block">
            <img src={imgSrc} height={500} width={580} alt={category + ' Image'}/>
            <div className="overlay"></div>
            <div className="img-info">
                <p>{category}</p>
                <h2>{`${date.getFullYear()}/${Number(date.getFullYear()) + 1}`}</h2>
                <Link to="/catalog" className="btn-a-categories" aria-label="Shop Now">Shop Now</Link>
            </div>
        </div>
    )
}

function Categories(){
    const {categoriesArr} = useProducts();
    const imgs = [jewImg, menImg, womenImg];

    return (
        <div className="main-categories">
            <div className="categories">
                {categoriesArr.map(function(elem,i){
                    return <CateDiv category={elem} key={i} imgSrc={imgs[i]}></CateDiv>
                })}
            </div>
        </div>
    )
}

export default memo(Categories);
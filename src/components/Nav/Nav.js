import React, { useState,useContext } from "react"
import { Link } from "react-router-dom";
import './Nav.css';

import { CartContext } from "../Store/CartContext.js";

// Images

import logo from "../../imgs/Black Red Fashion Stylist Logo (2).png" ;


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";


import SocialIcons from "../icons.js";

// Main nav icons

const profileIcon = <FontAwesomeIcon icon={faUser}/>;
const heartIcon = <FontAwesomeIcon icon={faHeart}/>;
const cartIcon = <FontAwesomeIcon icon={faCartShopping}/>;
const barsIcon = <FontAwesomeIcon icon={faBars}/>;
const trashIcon = <FontAwesomeIcon icon={faTrash}/>;

function LiItem({image,title,quantity,price,deleteItem}){

    if(title.length > 25){
        title = ([...title].filter((chr,i) => i < 25)).join('');
        title += '...';
    }

    return(
        <li>
            <img src={image} className="li-img" />
            <div>
                <p style={{fontSize: '1.1rem'}}>{title}</p>
                <p style={{fontSize: '1.05rem'}}>{quantity} X {price}$</p>
                <button onClick={deleteItem}>{trashIcon}</button>
            </div>
        </li>
    )
}

function Nav(){
    const { cartItems, clearCart, deleteItem } = useContext(CartContext);
    const [open,setOpen] = useState(false);

    let total = 0;

    let count = cartItems.length;

    for(const product of cartItems){
        if(product.quantity > 1){
            count += product.quantity - 1;
        }
    }

    for(let i = 0; i < cartItems.length; i++){
        total += (cartItems[i].price * cartItems[i].quantity);
    }

    const mainNavItems = [{name:'Home', link:'/'},{name:'Catalog', link:'/catalog'},{name:'About', link:'/about'},{name:'Contact', link:'/contact'}];
    const mainNavIcons = [{icon:profileIcon, link:'#'},{icon:heartIcon, link:'#'}];
    
    const [display, setDisplay] = useState('');

    const handleBarClick = function(){
        if(display) setDisplay('');
        if(!display) setDisplay('display');
    }

    return (
        <nav>
            <div className="main-nav">
                <div className="main-top-nav">
                    <div className="top-nav">
                        <p>Luka Tskhvaradze</p>
                        <SocialIcons></SocialIcons>
                    </div>
                </div>
                <div className="main-bottom-nav">
                    <div className="bottom-nav">
                        <Link to="/"><img src={logo}/></Link>
                        <ul className={`main-links ${display}`}>
                            {mainNavItems.map((elem,i) => {
                                return <li key={i}><Link to={elem.link}>{elem.name}</Link></li>
                            })}
                        </ul>
                        <ul className={`icon-links `}>
                            {mainNavIcons.map((elem,i) => {
                                return <li key={i}><Link to={elem.link}>{elem.icon}</Link></li>
                            })}
                            <div style={{position:'relative'}}>
                                {count > 0 ? <div id="red-circle"><p>{count}</p></div> : null}
                                <li key={2} style={{cursor:'pointer'}} onClick={() => setOpen(curValue => !curValue)}>{cartIcon}</li>
                            </div>
                        </ul>
                        <button onClick={handleBarClick} className="bar-btn">{barsIcon}</button>
                    </div>
                </div>
            </div>
            <div className={`cart ${open ? 'cart-display' : ''}`}>
                <ul>
                    {cartItems.length > 0 ? cartItems.map((el,i) => {
                        return <LiItem key={i} deleteItem={() => deleteItem(el)} i={i} image={el.image} quantity={el.quantity} title={el.title} price={el.price}></LiItem>
                    }) : <p>Cart is empty.</p>}
                </ul>
                <div id="cl-pr">
                    <p>Total Price: {total.toFixed(2)}$</p>
                    <p onClick={clearCart}>Clear cart.</p>
                </div>
                <div id="btn-cart">
                    <button>View my cart</button>
                    <button>Go to check out</button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
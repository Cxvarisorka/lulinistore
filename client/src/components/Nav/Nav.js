import React, { useState, useMemo } from "react";

import { Link } from "react-router-dom";

import "./Nav.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faHeart,
  faCartShopping,
  faBars,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import SocialIcons from "../icons.js";
import logo from "../../imgs/Black Red Fashion Stylist Logo (2).png";
import useCart from "../../Hooks/useCart.js";

const profileIcon = <FontAwesomeIcon icon={faUser} />;
const heartIcon = <FontAwesomeIcon icon={faHeart} />;
const cartIcon = <FontAwesomeIcon icon={faCartShopping} />;
const barsIcon = <FontAwesomeIcon icon={faBars} />;
const trashIcon = <FontAwesomeIcon icon={faTrash} />;

const LiItem = React.memo(({ image, title, quantity, price, deleteItem }) => {
  const truncatedTitle = useMemo(
    () => (title.length > 25 ? title.slice(0, 25) + "..." : title),
    [title]
  );

  return (
    <li>
      <img src={image} className="li-img" alt={title} />
      <div>
        <p style={{ fontSize: "1.1rem" }}>{truncatedTitle}</p>
        <p style={{ fontSize: "1.05rem" }}>
          {quantity} X {price}$
        </p>
        <button onClick={deleteItem} aria-label="Delete product">
          {trashIcon}
        </button>
      </div>
    </li>
  );
});

const Nav = () => {
  const { cartItems, clearCart, deleteItem } = useCart();
  const [openCart, setOpenCart] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const displayCount = cartItems.length > 0 ? true : false;

  const total = useMemo(
    () => cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cartItems]
  );

  const count = cartItems.reduce((cur, red) => cur + red.quantity, 0);

  const mainNavItems = useMemo(
    () => [
      { name: "Home", link: "/" },
      { name: "Catalog", link: "/catalog" },
      { name: "About", link: "/about" },
      { name: "Contact", link: "/contact" },
    ],
    []
  );

  const mainNavIcons = useMemo(
    () => [
      { icon: profileIcon, link: "/authentication", ariaLabel: "Registration" },
      { icon: heartIcon, link: "#", ariaLabel: "Wishlist" },
    ],
    []
  );

  const handleBarClick = () => {
    setOpenNav((prevOpen) => !prevOpen);
    if (openCart) {
      setOpenCart(false);
    }
  };

  const handleCartClick = () => {
    setOpenCart((prevOpen) => !prevOpen);
    if (openNav) {
      setOpenNav(false);
    }
  };

  return (
    <nav>
      <div className="main-nav">
        <div className="main-top-nav">
          <div className="top-nav">
            <p>Luka Tskhvaradze</p>
            <SocialIcons />
          </div>
        </div>
        <div className="main-bottom-nav">
          <div className="bottom-nav">
            <Link to="/" aria-label="Home Page">
              <img src={logo} alt="Logo" />
            </Link>
            <ul className={`main-links ${openNav ? "display" : ""}`}>
              {mainNavItems.map((elem, i) => (
                <li key={i}>
                  <Link onClick={handleBarClick} to={elem.link}>
                    {elem.name}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="icon-links">
              {mainNavIcons.map((elem, i) => (
                <li key={i}>
                  <Link aria-label={elem.ariaLabel} to={elem.link}>
                    {elem.icon}
                  </Link>
                </li>
              ))}
              <li id="cart-count">
                {displayCount > 0 ? <p id="red-circle">{count}</p> : null}
                <p style={{ cursor: "pointer" }} onClick={handleCartClick}>
                  {cartIcon}
                </p>
              </li>
            </ul>
            <button
              onClick={handleBarClick}
              aria-label="open navbar"
              className="bar-btn"
            >
              {barsIcon}
            </button>
          </div>
        </div>
      </div>
      <div className={`cart ${openCart ? "cart-display" : ""}`}>
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((el, i) => (
              <LiItem
                key={i}
                deleteItem={() => deleteItem(el, 1)}
                image={el.image}
                quantity={el.quantity}
                title={el.title}
                price={el.price}
              />
            ))
          ) : (
            <p>Cart is empty.</p>
          )}
        </ul>
        <div id="cl-pr">
          <p>Total Price: {total.toFixed(2)}$</p>
          <p onClick={clearCart}>Clear cart.</p>
        </div>
        <div id="btn-cart">
          <Link to="/cart" onClick={handleCartClick}>
            <button>View my cart</button>
          </Link>
          <button>Go to checkout</button>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

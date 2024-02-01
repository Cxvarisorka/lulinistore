import React from "react";

// Components

import LandingPage from "./LandingPage.js";
import CatalogPage from "./CatalogPage.js";
import AboutPage from "./AboutPage/AboutPage.js";
import ContactPage from "./ContactPage.js";
import Cart from "../components/Cart/Cart.js";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";
import Register from "../components/Register/Register.js";
import Login from "../components/Login/Login.js";
import AuthPage from "./AuthPage/AuthPage.js";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/authentication" element={<AuthPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

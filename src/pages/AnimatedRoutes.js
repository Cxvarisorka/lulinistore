import React from "react";

// Components

import LandingPage from "./LandingPage.js";
import CatalogPage from "./CatalogPage.js";
import AboutPage from "./AboutPage.js";
import ContactPage from "./ContactPage.js";

import { Route, Routes, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/about" element={<AboutPage />}></Route>
        <Route path="/contact" element={<ContactPage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;

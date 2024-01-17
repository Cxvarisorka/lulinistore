import React from "react";
import Hero from "../components/Hero/Hero.js";
import Categories from "../components/Categories/Categories.js";
import CollectionHero from "../components/CollectionHero/CollectionHero.js";

import { motion } from 'framer-motion';


function LandingPage() {
  return (
    <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
    >
      <Hero></Hero>
      <Categories></Categories>
      <CollectionHero></CollectionHero>
    </motion.div>
  );
}

export default LandingPage;
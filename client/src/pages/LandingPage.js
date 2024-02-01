import React from "react";
import Hero from "../components/Hero/Hero.js";
import Categories from "../components/Categories/Categories.js";
import CollectionHero from "../components/CollectionHero/CollectionHero.js";
import Reveal from "../components/reveal.js";

function LandingPage() {
  return (
    <Reveal>
      <div>
        <Hero></Hero>
        <Categories></Categories>
        <CollectionHero></CollectionHero>
      </div>
    </Reveal>
    
  );
}

export default LandingPage;
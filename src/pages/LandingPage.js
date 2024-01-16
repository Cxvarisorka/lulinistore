import React from "react";
import Hero from "../components/Hero/Hero.js";
import Categories from "../components/Categories/Categories.js";
import CollectionHero from "../components/CollectionHero/CollectionHero.js";

function LandingPage() {
  return (
    <div>
      <Hero></Hero>
      <Categories></Categories>
      <CollectionHero></CollectionHero>
    </div>
  );
}

export default LandingPage;
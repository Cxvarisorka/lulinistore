import React from "react";
import Store from "../components/Store/Store.js";
import PageHero from "../components/PageHero/PageHero.js";

import Reveal from "../components/reveal.js";

function CatalogPage(){
    return (
        <Reveal>
            <div>
                <PageHero title={'Catalog'} from={{name:'Home',href:'/'}} to={{name:'Catalog',href:'/catalog'}}></PageHero>
                <Store></Store>
            </div>
        </Reveal>
        
    )
}

export default CatalogPage;
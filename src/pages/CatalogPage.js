import React from "react";
import Store from "../components/Store/Store.js";
import PageHero from "../components/PageHero/PageHero.js";

function CatalogPage(){
    return (
        <div>
            <PageHero title={'Catalog'} from={{name:'Home',href:'/'}} to={{name:'Catalog',href:'/catalog'}}></PageHero>
            <Store></Store>
        </div>
    )
}

export default CatalogPage;